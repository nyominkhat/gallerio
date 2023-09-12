import { create } from "zustand";

interface searchSlice {
  search: string;
  isClean: boolean;
  setData: (search: string) => void;
  clearSearch: () => void;
}

const useSearch = create<searchSlice>((set) => ({
  search: "",
  isClean: true,
  setData: (search: string) =>
    set({ search, isClean: search === "" ? true : false }),
  clearSearch: () => set({ search: "", isClean: true }),
}));

export default useSearch;
