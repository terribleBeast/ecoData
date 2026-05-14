import { createSlice } from "@reduxjs/toolkit";
import type { IRootState } from "../../app/store";
export const userSlice = createSlice({
  name: "user",
  initialState: {
    login: null,
    isLogIn: false,
    name: null,
    id: null,
  },

  reducers: {
    toLogIn: (state, actions) => {
      console.log("to login", actions);
      state.login = actions.payload.email;
      state.isLogIn = true;
      state.id = actions.payload.id;
      state.name = actions.payload.name;
    },
    toLogOut: (state) => {
      state.login = null;
      state.isLogIn = false;
    },
  },
});

export const selectUserLogin = (state: IRootState) => state.user.login;
export const selectUserName = (state: IRootState) => state.user.name;
export const selectUserIsLogIn = (state: IRootState) => state.user.isLogIn;
export const { toLogIn, toLogOut } = userSlice.actions;

export default userSlice.reducer;
