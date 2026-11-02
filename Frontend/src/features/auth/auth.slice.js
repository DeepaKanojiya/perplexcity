import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: true,
    err: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setErr: (state, action) => {
      state.err = action.payload;
    },
  },
});

export const { setUser, setLoading, setErr } = authSlice.actions
export default authSlice.reducer;
