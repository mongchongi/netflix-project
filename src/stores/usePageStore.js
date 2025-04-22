import { create } from 'zustand';

const usePageStore = create((set) => ({
  page: 1,
  setPage: (currentPage) => set({ page: currentPage }),
  resetPage: () => set({ page: 1 }),
}));

export default usePageStore;
