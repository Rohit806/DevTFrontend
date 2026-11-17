import { createSlice } from "@reduxjs/toolkit";

function getInitialTheme() {
  try { return localStorage.getItem("devtinder-theme") === "dark" ? "dark" : "light"; }
  catch { return "light"; }
}

const themeSlice = createSlice({
  name: "theme",
  initialState: { mode: getInitialTheme() },
  reducers: {
    toggleTheme(state) { state.mode = state.mode === "light" ? "dark" : "light"; },
    setTheme(state, action) { state.mode = action.payload === "dark" ? "dark" : "light"; },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
