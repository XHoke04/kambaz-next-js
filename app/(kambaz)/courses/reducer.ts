import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { courses } from "../database";

type Course = (typeof courses)[number];

const initialState: { courses: Course[] } = {
  courses,
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addNewCourse: (state, { payload: course }: PayloadAction<Course>) => {
      const newCourse = {
        ...course,
        _id: new Date().getTime().toString(),
      };
      state.courses = [...state.courses, newCourse];
    },
    deleteCourse: (state, { payload: courseId }: PayloadAction<string>) => {
      state.courses = state.courses.filter((course) => course._id !== courseId);
    },
    updateCourse: (state, { payload: course }: PayloadAction<Course>) => {
      state.courses = state.courses.map((c) =>
        c._id === course._id ? course : c,
      );
    },
    setCourses: (state, { payload: nextCourses }: PayloadAction<Course[]>) => {
      state.courses = nextCourses;
    },
  },
});

export const { addNewCourse, deleteCourse, updateCourse, setCourses } =
  coursesSlice.actions;
export default coursesSlice.reducer;
