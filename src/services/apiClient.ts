// src/services/apiClient.ts

import axios from 'axios';

// Create an instance of axios with default settings
const apiClient = axios.create({
  baseURL: 'https://gorest.co.in/public/v2/', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token or other headers
apiClient.interceptors.request.use(
  (config) => {
    // Modify request config here
    const token = localStorage.getItem('token'); // Example: getting token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request error here
    return Promise.reject(error);
  }
);

// Response interceptor to handle responses and errors
apiClient.interceptors.response.use(
  (response) => {
    // Modify response data here if needed
    return response;
  },
  (error) => {
    // Handle response error here
    if (error.response && error.response.status === 401) {
      // Example: handle unauthorized errors
      console.error('Unauthorized, logging out...');
      localStorage.removeItem('token');
      // Redirect to login page or handle error accordingly
    }
    return Promise.reject(error);
  }
);

export default apiClient;
