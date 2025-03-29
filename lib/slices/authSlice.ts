// lib/slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  accountType: string;
}

interface AuthState {
  token: string | null;
  user: UserData | null;
  loading: boolean;
  isAuthenticated: boolean;
  signupData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    accountType: string;
  } | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
  loading: false,
  isAuthenticated: false,
  signupData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setUser: (state, action: PayloadAction<UserData | null>) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSignupData: (state, action: PayloadAction<AuthState["signupData"]>) => {
      state.signupData = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.signupData = null;
    },
  },
});

export const { setToken, setUser, setLoading, setSignupData, logout } = authSlice.actions;

// Selectors
export const selectCurrentToken = (state: { auth: AuthState }) => state.auth.token;
export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectAuthLoading = (state: { auth: AuthState }) => state.auth.loading;

export default authSlice.reducer;
export const HOME_ROUTE = "/chat";
export const LOGIN_ROUTE = "/login";