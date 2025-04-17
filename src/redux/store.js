import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import linksReducer from "./slices/linksSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    links: linksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: import.meta.env.NODE_ENV !== "production",
});

export default store;
