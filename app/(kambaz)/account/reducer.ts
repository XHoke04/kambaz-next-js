import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { users } from "../database";

type User = (typeof users)[number];

const initialState = {
  currentUser: null as User | null,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = accountSlice.actions;
export default accountSlice.reducer;
