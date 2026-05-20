"use client";

import { useMutation } from "@tanstack/react-query";
import { registerUser, type RegisterPayload } from "../lib/api";

// No cache invalidation here: this mutation creates a session, not a query.
// The component chains signIn() via mutateAsync() once the user is created.
export function useRegister() {
  return useMutation({
    mutationFn: (payload: RegisterPayload) => registerUser(payload),
  });
}
