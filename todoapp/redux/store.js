import { configureStore } from "@reduxjs/toolkit";
import { authSlcie, messageSlice } from "./reducer";

const store = configureStore({
  reducer: {
    auth: authSlcie.reducer,
    message: messageSlice.reducer,
  },
});

export default store;
