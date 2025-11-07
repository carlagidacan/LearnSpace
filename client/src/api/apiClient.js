import axios from "axios";

// Prefer Vite env variable, fallback to local server
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach token from localStorage (if present)
export const setAuthToken = (token) => {
  if (token) {
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common["Authorization"];
  }
};

// Initialize from storage on load
try {
  const stored = localStorage.getItem("auth");
  if (stored) {
    const parsed = JSON.parse(stored);
    if (parsed && parsed.token) setAuthToken(parsed.token);
  }
} catch (e) {
  // ignore localStorage parse errors in environments without storage
}

// Response interceptor: unwrap data or throw normalized error
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const payload = {
      message: error?.response?.data?.message || error.message || "Network Error",
      status: error?.response?.status || 0,
      details: error?.response?.data || null,
    };
    return Promise.reject(payload);
  }
);

export default apiClient;
