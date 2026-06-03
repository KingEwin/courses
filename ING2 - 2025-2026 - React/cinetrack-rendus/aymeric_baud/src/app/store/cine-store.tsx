"use client";

import { createContext, useContext, useReducer, Dispatch } from "react";
import { CineItem } from "../models/cine-item";
import { Status } from "../types/status";
import { cineItems } from "../data/cine-items";

type Action =
  | { type: "ADD_ITEM"; payload: CineItem }
  | { type: "DELETE_ITEM"; payload: number }
  | { type: "UPDATE_STATUS"; payload: { id: number; status: Status } };

function cineReducer(state: CineItem[], action: Action): CineItem[] {
  switch (action.type) {
    case "ADD_ITEM":
      return [...state, action.payload];
    case "DELETE_ITEM":
      return state.filter((item) => item.id !== action.payload);
    case "UPDATE_STATUS":
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, status: action.payload.status, updatedAt: new Date() }
          : item,
      );
    default:
      return state;
  }
}

interface CineContextType {
  items: CineItem[];
  dispatch: Dispatch<Action>;
}

const CineContext = createContext<CineContextType | null>(null);

export function CineProvider({ children }: { children: React.ReactNode }) {
  const [items, dispatch] = useReducer(cineReducer, cineItems);
  return (
    <CineContext.Provider value={{ items, dispatch }}>
      {children}
    </CineContext.Provider>
  );
}

export function useCineStore() {
  const ctx = useContext(CineContext);
  if (!ctx) throw new Error("useCineStore must be used within CineProvider");
  return ctx;
}