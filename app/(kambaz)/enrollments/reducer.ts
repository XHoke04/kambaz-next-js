import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Enrollment = {
  _id: string;
  user: string;
  course: string;
};

const initialState: { enrollments: Enrollment[] } = {
  enrollments: [],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (
      state,
      { payload: enrollments }: PayloadAction<Enrollment[]>,
    ) => {
      state.enrollments = enrollments;
    },
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

export const { setEnrollments, enroll, unenroll } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
