// lib/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import profileReducer from "./slices/profileSlice";
import researchReducer  from "./slices/researchSlice";
// Import other reducers as needed

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    research: researchReducer,
    // Add other reducers here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;