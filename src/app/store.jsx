import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import { userApi } from "";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(userApi.middleware),
});
