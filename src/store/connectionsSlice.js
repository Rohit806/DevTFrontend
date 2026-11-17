import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, getApiError } from "../lib/api";

export const loadConnections = createAsyncThunk("connections/load", async (_, { rejectWithValue }) => {
  try { return await api.connections(); } catch (error) { return rejectWithValue(getApiError(error)); }
});

const connectionsSlice = createSlice({
  name: "connections",
  initialState: { items: [], status: "idle", error: "" },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadConnections.pending, (state) => { state.status = "loading"; state.error = ""; })
      .addCase(loadConnections.fulfilled, (state, action) => { state.status = "succeeded"; state.items = action.payload; })
      .addCase(loadConnections.rejected, (state, action) => { state.status = "failed"; state.error = action.payload || action.error.message; });
  },
});

export default connectionsSlice.reducer;
