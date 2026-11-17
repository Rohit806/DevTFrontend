import { configureStore } from "@reduxjs/toolkit";
import auth from "./authSlice";
import feed from "./feedSlice";
import requests from "./requestsSlice";
import connections from "./connectionsSlice";
import theme from "./themeSlice";

export const store = configureStore({ reducer: { auth, feed, requests, connections, theme } });
