import { create } from "zustand";

type KycStore = {
  frontImage: string | null;
  backImage: string | null;
  setFrontImage: (uri: string | null) => void;
  setBackImage: (uri: string | null) => void;
};

export const useKycStore = create<KycStore>((set) => ({
  frontImage: null,
  backImage: null,
  setFrontImage: (uri) => set({ frontImage: uri }),
  setBackImage: (uri) => set({ backImage: uri }),
}));