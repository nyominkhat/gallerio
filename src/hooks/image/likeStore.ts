import { create } from "zustand";

interface LikeStoreSlice {
  likedImages: string[];
  addLike: (imageId: string) => void;
  removeLike: (imageId: string) => void;
}

const useLikeStore = create<LikeStoreSlice>((set) => ({
  likedImages: [],
  addLike: (imageId) => {
    set((state) => ({ likedImages: [...state.likedImages, imageId] }));
  },
  removeLike: (imageId) => {
    set((state) => ({
      likedImages: state.likedImages.filter((id) => id !== imageId),
    }));
  },
}));

export default useLikeStore;
