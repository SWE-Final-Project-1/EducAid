import create from "zustand";
import { combine } from "zustand/middleware";

export const useCreatePreviewStore = create(
  combine(
    {
      assignmentName: "",
      assignmentType: null, // You may need to replace null with the initial value or use proper defaults
      prompt: "",
      dueDate: new Date(),
      submissionFormats: [],
      points: "-/-",
      rubricTableHtml: "", // New state for storing RubricTable HTML
    },
    (set) => ({
      updateAssignmentName: (name) => set({ assignmentName: name }),
      updateAssignmentType: (type) => set({ assignmentType: type }),
      updatePrompt: (prompt) => set({ prompt: prompt }),
      updateDueDate: (date) => set({ dueDate: date }),
      updateSubmissionFormats: (formats) => set({ submissionFormats: formats }),
      updatePoints: (points) => set({ points: points }),
      updateRubricTableHtml: (html) => set({ rubricTableHtml: html }),
      set,
    })
  )
);
