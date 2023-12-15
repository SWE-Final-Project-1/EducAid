import create from "zustand";
import { combine } from "zustand/middleware";

export const useUploadStore = create(
  combine(
    {
      selectedStudent: null,
      selectedAssignment: null,
      isOpen: false,
      feedbackOpen: false,
      feedback: null
    },
    set => ({
      updateSelectedStudent: student => set({ selectedStudent: student }),
      updateSelectedAssignment: assignment =>
        set({ selectedAssignment: assignment }),
      updateFeedback: feedback => set({ feedback: feedback }),
      updateIsOpen: isOpen => set({ isOpen: isOpen }),
      updateFeedbackOpen: val => set({ feedbackOpen: val }),
      toggleIsOpen: () => set(state => ({ isOpen: !state.isOpen })),
      set,
    })
  )
);
