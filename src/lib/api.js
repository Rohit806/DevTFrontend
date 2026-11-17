import { API_BASE_URL } from "./constants";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
  });
  const type = response.headers.get("content-type") || "";
  const payload = type.includes("application/json")
    ? await response.json()
    : await response.text();
  if (!response.ok) {
    const message =
      typeof payload === "string"
        ? payload
        : payload.message || payload.error || "Something went wrong";
    throw new Error(message.replace(/^Error[^:]*:\s*/i, ""));
  }
  return payload;
}

export const api = {
  signup: (data) =>
    request("/signup", { method: "POST", body: JSON.stringify(data) }),
  login: (data) =>
    request("/login", { method: "POST", body: JSON.stringify(data) }),
  logout: () => request("/logout", { method: "POST" }),
  profile: () => request("/profile/view"),
  updateProfile: (data) =>
    request("/profile/edit", { method: "PATCH", body: JSON.stringify(data) }),
  feed: () => request("/user/feed"),
  incoming: () => request("/user/requests/received"),
  connections: () => request("/user/connections"),
  sendRequest: (status, userId) =>
    request(`/request/send/${status}/${userId}`, { method: "POST" }),
  reviewRequest: (status, requestId) =>
    request(`/request/review/${status}/${requestId}`, { method: "POST" }),
};
