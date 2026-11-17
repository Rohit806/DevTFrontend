import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, getApiError } from "../lib/api";

export const loadFeed = createAsyncThunk("feed/load", async (_, { rejectWithValue }) => {
  try { return await api.feed(); } catch (error) { return rejectWithValue(getApiError(error)); }
});
export const sendConnectionRequest = createAsyncThunk("feed/sendRequest", async ({ status, userId }, { rejectWithValue }) => {
  try { await api.sendRequest(status, userId); return { userId, status }; } catch (error) { return rejectWithValue(getApiError(error)); }
});

const feedSlice = createSlice({
  name: "feed",
  initialState: { people: [], status: "idle", actionStatus: "idle", error: "", notice: "" },
  reducers: { clearFeedNotice(state) { state.notice = ""; }, clearFeedError(state) { state.error = ""; } },
  extraReducers: (builder) => {
    builder
      .addCase(loadFeed.pending, (state) => { state.status = "loading"; state.error = ""; })
      .addCase(loadFeed.fulfilled, (state, action) => { state.status = "succeeded"; state.people = action.payload; })
      .addCase(loadFeed.rejected, (state, action) => { state.status = "failed"; state.error = action.payload || action.error.message; })
      .addCase(sendConnectionRequest.pending, (state) => { state.actionStatus = "loading"; state.error = ""; state.notice = ""; })
      .addCase(sendConnectionRequest.fulfilled, (state, action) => {
        const person = state.people[0];
        state.people = state.people.filter((item) => item._id !== action.payload.userId);
        state.actionStatus = "succeeded";
        if (action.payload.status === "interested" && person) state.notice = `You’re interested in ${person.firstName}.`;
      })
      .addCase(sendConnectionRequest.rejected, (state, action) => { state.actionStatus = "failed"; state.error = action.payload || action.error.message; });
  },
});

export const { clearFeedNotice, clearFeedError } = feedSlice.actions;
export default feedSlice.reducer;
