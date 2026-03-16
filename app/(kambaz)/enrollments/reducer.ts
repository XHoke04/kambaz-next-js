import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { enrollments as seedEnrollments } from "../database";

type Enrollment = (typeof seedEnrollments)[number];

const initialState: { enrollments: Enrollment[] } = {
  enrollments: seedEnrollments,
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enroll: (
      state,
      {
        payload,
      }: PayloadAction<{
        user: string;
        course: string;
      }>,
    ) => {
      const alreadyEnrolled = state.enrollments.some(
        (enrollment) =>
          enrollment.user === payload.user && enrollment.course === payload.course,
      );
      if (alreadyEnrolled) return;
      state.enrollments = [
        ...state.enrollments,
        {
          _id: new Date().getTime().toString(),
          user: payload.user,
          course: payload.course,
        },
      ];
    },
    unenroll: (
      state,
      {
        payload,
      }: PayloadAction<{
        user: string;
        course: string;
      }>,
    ) => {
      state.enrollments = state.enrollments.filter(
        (enrollment) =>
          !(
            enrollment.user === payload.user &&
            enrollment.course === payload.course
          ),
      );
    },
  },
});

export const { enroll, unenroll } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
