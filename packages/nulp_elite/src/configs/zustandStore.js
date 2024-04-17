// import create from "zustand";
import { create } from "zustand";

// Zustand store
export const useStore = create((set) => ({
  data: "",
  setData: (data) => set({ data }),
}));
