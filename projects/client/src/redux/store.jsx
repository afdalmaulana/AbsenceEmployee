import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./reducer/AuthReducer";
import HistoryReducer from "./reducer/HistoryReducer";

export const store = configureStore({
  reducer: {
    AuthReducer: AuthReducer,
    HistoryReducer: HistoryReducer,
  },
});
