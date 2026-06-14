// apiClient.js
import axios from "axios";
import { auth } from "@/lib/firebase";



const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000, // Request timeout in milliseconds
  headers: {
    "Content-Type": "application/json", // Default content type
    // Add any other default headers, e.g., 'Authorization' header if needed
  },
});

// Optional: Add request or response interceptors
// For example, to attach a token to every outgoing request
apiClient.interceptors.request.use(
  async (config) => {
    // Get token from local storage or state
    const firebaseUser = auth.currentUser;
    if (firebaseUser) {
      const token = await firebaseUser.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Optional: Add a response interceptor for handling errors globally or refreshing tokens
apiClient.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response;
  },
  (error) => {
    // Handle errors globally, e.g., log out user if 401 Unauthorized
    if (error.response && error.response.status === 401) {
      // Logic for handling unauthorized errors
    }
    return Promise.reject(error);
  },
);

export default apiClient;
