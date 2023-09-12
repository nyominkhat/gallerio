import { create } from "zustand";

interface popupImageSlice {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useImageModal = create<popupImageSlice>((set) => ({
  isOpen: true,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useImageModal;
