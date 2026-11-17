import axios from "axios";
import { API_BASE_URL } from "./constants";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export function getApiError(error) {
  const data = error?.response?.data;
  const message = typeof data === "string" ? data : data?.message || data?.error;
  return (message || error?.message || "Something went wrong. Please try again.").replace(/^Error[^:]*:\s*/i, "");
}

export const api = {
  signup: (data) => apiClient.post("/signup", data).then(({ data: result }) => result),
  login: (data) => apiClient.post("/login", data).then(({ data: result }) => result),
  logout: () => apiClient.post("/logout").then(({ data: result }) => result),
  profile: () => apiClient.get("/profile/view").then(({ data }) => data),
  updateProfile: (data) => apiClient.patch("/profile/edit", data).then(({ data: result }) => result),
  feed: () => apiClient.get("/user/feed").then(({ data }) => data),
  incoming: () => apiClient.get("/user/requests/received").then(({ data }) => data),
  connections: () => apiClient.get("/user/connections").then(({ data }) => data),
  sendRequest: (status, userId) => apiClient.post(`/request/send/${status}/${userId}`).then(({ data }) => data),
  reviewRequest: (status, requestId) => apiClient.post(`/request/review/${status}/${requestId}`).then(({ data }) => data),
};
