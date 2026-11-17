import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, getApiError } from "../lib/api";

export const restoreSession = createAsyncThunk("auth/restoreSession", async (_, { rejectWithValue }) => {
  try { return await api.profile(); } catch (error) { return rejectWithValue(getApiError(error)); }
});

export const signIn = createAsyncThunk("auth/signIn", async (credentials, { rejectWithValue }) => {
  try {
    await api.login(credentials);
    try { return await api.profile(); }
    catch (error) {
      const message = getApiError(error);
      if (/token is not valid/i.test(message)) return rejectWithValue("Your credentials were accepted, but the session cookie was not sent. Check the backend cookie and frontend proxy settings.");
      return rejectWithValue(message);
    }
  } catch (error) { return rejectWithValue(getApiError(error)); }
});

export const signUp = createAsyncThunk("auth/signUp", async ({ skills, ...data }, { rejectWithValue }) => {
  try {
    await api.signup(data);
    await api.login({ emailId: data.emailId, password: data.password });
    if (skills?.length) await api.updateProfile({ skills });
    return await api.profile();
  } catch (error) { return rejectWithValue(getApiError(error)); }
});

export const signOut = createAsyncThunk("auth/signOut", async (_, { rejectWithValue }) => {
  try { return await api.logout(); } catch (error) { return rejectWithValue(getApiError(error)); }
});

export const updateProfile = createAsyncThunk("auth/updateProfile", async (data, { rejectWithValue }) => {
  try { return await api.updateProfile(data); } catch (error) { return rejectWithValue(getApiError(error)); }
});

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, sessionStatus: "loading", authStatus: "idle", profileStatus: "idle", error: "", profileError: "" },
  reducers: { clearAuthError(state) { state.error = ""; state.authStatus = "idle"; } },
  extraReducers: (builder) => {
    builder
      .addCase(restoreSession.pending, (state) => { state.sessionStatus = "loading"; })
      .addCase(restoreSession.fulfilled, (state, action) => { state.sessionStatus = "authenticated"; state.user = action.payload; })
      .addCase(restoreSession.rejected, (state) => { state.sessionStatus = "anonymous"; state.user = null; })
      .addCase(signIn.pending, (state) => { state.authStatus = "loading"; state.error = ""; })
      .addCase(signIn.fulfilled, (state, action) => { state.authStatus = "succeeded"; state.user = action.payload; })
      .addCase(signIn.rejected, (state, action) => { state.authStatus = "failed"; state.error = action.payload || action.error.message; })
      .addCase(signUp.pending, (state) => { state.authStatus = "loading"; state.error = ""; })
      .addCase(signUp.fulfilled, (state, action) => { state.authStatus = "succeeded"; state.user = action.payload; })
      .addCase(signUp.rejected, (state, action) => { state.authStatus = "failed"; state.error = action.payload || action.error.message; })
      .addCase(signOut.fulfilled, (state) => { state.user = null; state.sessionStatus = "anonymous"; state.authStatus = "idle"; state.error = ""; })
      .addCase(signOut.rejected, (state, action) => { state.user = null; state.sessionStatus = "anonymous"; state.error = action.payload || action.error.message; })
      .addCase(updateProfile.pending, (state) => { state.profileStatus = "loading"; state.profileError = ""; })
      .addCase(updateProfile.fulfilled, (state, action) => { state.profileStatus = "succeeded"; state.user = action.payload.data; })
      .addCase(updateProfile.rejected, (state, action) => { state.profileStatus = "failed"; state.profileError = action.payload || action.error.message; });
  },
});

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;
