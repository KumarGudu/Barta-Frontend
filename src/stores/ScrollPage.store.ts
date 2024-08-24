import { create } from "zustand";
import { produce } from "immer";

type CurrentPageState = {
  currentPage: number;
};

type CurrentPageAction = {
  setCurrentPage: (currentPage: number) => void;
};

const useCurrentPageStore = create<CurrentPageState & CurrentPageAction>(
  (set) => ({
    currentPage: 1,
    setCurrentPage: (currentPage: number) => {
      set(
        produce((state: CurrentPageState) => {
          state.currentPage = currentPage;
        })
      );
    },
  })
);

export default useCurrentPageStore;
