import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, getApiError } from "../lib/api";

export const loadRequests = createAsyncThunk("requests/load", async (_, { rejectWithValue }) => {
  try { const result = await api.incoming(); return result.data || []; } catch (error) { return rejectWithValue(getApiError(error)); }
});
export const reviewRequest = createAsyncThunk("requests/review", async ({ requestId, status }, { rejectWithValue }) => {
  try { await api.reviewRequest(status, requestId); return { requestId, status }; } catch (error) { return rejectWithValue(getApiError(error)); }
});

const requestsSlice = createSlice({
  name: "requests",
  initialState: { items: [], status: "idle", actionId: "", error: "", notice: "" },
  reducers: { clearRequestNotice(state) { state.notice = ""; } },
  extraReducers: (builder) => {
    builder
      .addCase(loadRequests.pending, (state) => { state.status = "loading"; state.error = ""; })
      .addCase(loadRequests.fulfilled, (state, action) => { state.status = "succeeded"; state.items = action.payload; })
      .addCase(loadRequests.rejected, (state, action) => { state.status = "failed"; state.error = action.payload || action.error.message; })
      .addCase(reviewRequest.pending, (state, action) => { state.actionId = action.meta.arg.requestId; state.error = ""; })
      .addCase(reviewRequest.fulfilled, (state, action) => { state.actionId = ""; state.items = state.items.filter((item) => item._id !== action.payload.requestId); if (action.payload.status === "accepted") state.notice = "You’re connected! Find them in your connections."; })
      .addCase(reviewRequest.rejected, (state, action) => { state.actionId = ""; state.error = action.payload || action.error.message; });
  },
});

export const { clearRequestNotice } = requestsSlice.actions;
export default requestsSlice.reducer;
