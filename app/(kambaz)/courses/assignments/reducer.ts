import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { assignments as seedAssignments } from "../../database";

type Assignment = (typeof seedAssignments)[number];
type AssignmentDraft = Omit<Assignment, "_id">;

const initialState: { assignments: Assignment[] } = {
  assignments: seedAssignments,
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (
      state,
      { payload: assignment }: PayloadAction<AssignmentDraft>,
    ) => {
      const newAssignment: Assignment = {
        ...assignment,
        _id: new Date().getTime().toString(),
      };
      state.assignments = [...state.assignments, newAssignment];
    },
    deleteAssignment: (
      state,
      { payload: assignmentId }: PayloadAction<string>,
    ) => {
      state.assignments = state.assignments.filter(
        (assignment) => assignment._id !== assignmentId,
      );
    },
    updateAssignment: (
      state,
      { payload: assignment }: PayloadAction<Assignment>,
    ) => {
      state.assignments = state.assignments.map((a) =>
        a._id === assignment._id ? assignment : a,
      );
    },
  },
});

export const { addAssignment, deleteAssignment, updateAssignment } =
  assignmentsSlice.actions;
export default assignmentsSlice.reducer;
