import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // Set a timeout of 10 seconds
  withCredentials: true, // Include credentials for cross-origin requests
});

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url || "";
    const message = error.response?.data?.message || error.message;

    console.error("❌ API Error:", { status, url, message });

    if (status === 401) {
      // Cookie is already expired/invalid on the server side.
      // Dispatch event so AuthContext / protected routes can react.
      window.dispatchEvent(new CustomEvent("auth:logout", { detail: { url } }));
    }

    if (status === 403) {
      window.dispatchEvent(new CustomEvent("auth:forbidden"));
    }

    return Promise.reject(error);
  },
);

// -------------- API BASE ----------------------- //
export const API_BASE = API_BASE_URL.replace(/\/api\/?$/, "");

// ----------- Auth API ------------------ //
export const authAPI = {
  login: (data) => api.post("/auth/login", data),
  getProfile: () => api.get("/auth/me"),
};

export const publishAPI = {
  create: (formData) => api.post("/documents", formData),
};

export default api;