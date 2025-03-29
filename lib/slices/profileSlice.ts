import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProfileState, ProfileUser } from "@/types/profile";

const initialState: ProfileState = {
  user: null,
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<ProfileUser | null>) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetProfile: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setProfile, setLoading, setError, resetProfile } = profileSlice.actions;

export default profileSlice.reducer;

// Selector
export const selectProfile = (state: { profile: ProfileState }) => state.profile;