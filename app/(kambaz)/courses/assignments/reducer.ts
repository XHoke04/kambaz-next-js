import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Assignment = {
  _id: string;
  title: string;
  description: string;
  points: number;
  dueDate: string;
  availableFrom: string;
  availableUntil: string;
  course: string;
};

export type AssignmentDraft = Omit<Assignment, "_id">;

const initialState: { assignments: Assignment[] } = {
  assignments: [],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (
      state,
      { payload: assignments }: PayloadAction<Assignment[]>,
    ) => {
      state.assignments = assignments;
    },
    addAssignment: (state, { payload: assignment }: PayloadAction<Assignment>) => {
      state.assignments = [...state.assignments, assignment];
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

export const { setAssignments, addAssignment, deleteAssignment, updateAssignment } =
  assignmentsSlice.actions;
export default assignmentsSlice.reducer;
