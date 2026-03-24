import { create } from "zustand";

type KycStore = {
  frontImage: string | null;
  backImage: string | null;
  selfieImage: string | null;
  setFrontImage: (uri: string | null) => void;
  setBackImage: (uri: string | null) => void;
  setSelfieImage: (uri: string | null) => void;
};

export const useKycStore = create<KycStore>((set) => ({
  frontImage: null,
  backImage: null,
  selfieImage: null,
  setFrontImage: (uri) => set({ frontImage: uri }),
  setBackImage: (uri) => set({ backImage: uri }),
  setSelfieImage: (uri) => set({ selfieImage: uri }),
}));