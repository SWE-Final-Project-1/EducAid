import create from "zustand";
import { combine } from "zustand/middleware";

export const useUploadStore = create(
  combine(
    {
      selectedStudent: null,
      selectedAssignment: null,
      isOpen: false,
    },
    set => ({
      updateSelectedStudent: student => set({ selectedStudent: student }),
      updateSelectedAssignment: assignment =>
        set({ selectedAssignment: assignment }),
      updateIsOpen: isOpen => set({ isOpen: isOpen }),
      toggleIsOpen: () => set(state => ({ isOpen: !state.isOpen })),
      set,
    })
  )
);
