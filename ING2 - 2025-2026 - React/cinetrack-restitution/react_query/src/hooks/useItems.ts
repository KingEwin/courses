"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CineItem } from "../app/models/cine-item";
import { Status } from "../app/types/status";
import {
  createItem,
  deleteItemById,
  getItems,
  NewItemInput,
  patchItem,
  UpdateItemInput,
} from "../lib/api";

// Single source of truth for the cache key
export const itemsKey = ["items"] as const;

export function useItems() {
  return useQuery({
    queryKey: itemsKey,
    queryFn: getItems,
    staleTime: 30_000,
  });
}

export function useAddItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: NewItemInput) => createItem(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: itemsKey }),
  });
}

export function useUpdateItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateItemInput }) =>
      patchItem(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: itemsKey }),
  });
}

export function useDeleteItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteItemById(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: itemsKey }),
  });
}

// Optimistic update: the heart fills BEFORE the server replies.
// On error we rollback; on settle we invalidate to reconcile with the truth.
export function useToggleFavorite() {
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, isFavorite }: { id: number; isFavorite: boolean }) =>
      patchItem(id, { isFavorite }),

    onMutate: async ({ id, isFavorite }) => {
      // 1. Cancel in-flight refetches so they don't overwrite our optimistic state
      await qc.cancelQueries({ queryKey: itemsKey });

      // 2. Snapshot current value for potential rollback
      const previous = qc.getQueryData<CineItem[]>(itemsKey);

      // 3. Apply optimistic update — UI flips instantly
      qc.setQueryData<CineItem[]>(itemsKey, (old) =>
        old?.map((i) => (i.id === id ? { ...i, isFavorite } : i))
      );

      return { previous };
    },

    onError: (_err, _vars, ctx) => {
      // Rollback to the snapshot if the server call fails
      if (ctx?.previous) qc.setQueryData(itemsKey, ctx.previous);
    },

    onSettled: () => {
      // Reconcile with the server (success or failure)
      qc.invalidateQueries({ queryKey: itemsKey });
    },
  });

  return (id: number) => {
    const items = qc.getQueryData<CineItem[]>(itemsKey);
    const current = items?.find((i) => i.id === id);
    if (!current) return;
    mutation.mutate({ id, isFavorite: !current.isFavorite });
  };
}

export function useUpdateStatus() {
  const update = useUpdateItem();
  return (id: number, status: Status) => update.mutate({ id, data: { status } });
}
