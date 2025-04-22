import { create } from 'zustand';

const useOffsetHeightStore = create((set) => ({
  height: 0,
  setHeight: (offsetHeight) => set({ height: offsetHeight }),
}));

export default useOffsetHeightStore;
