import axios from 'axios';

export const axiosInstance = axios.create({
      baseURL : "http://localhost:3000"  
})

 
// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add any auth tokens or modify request here
    console.log('Making request to:', config.url);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response;
  },
  (error) => {
    // Handle different types of errors
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case 400:
          error.message = data.message || 'Invalid request. Please check your URL.';
          break;
        case 404:
          error.message = 'Service not found. Please try again later.';
          break;
        case 409:
          error.message = data.message || 'URL already exists.';
          break;
        case 500:
          error.message = 'Server error. Please try again later.';
          break;
        default:
          error.message = data.message || `Request failed with status ${status}`;
      }
    } else if (error.request) {
      // Network error - no response received
      error.message = 'Network error. Please check your connection.';
    } else {
      // Something else happened
      error.message = error.message || 'An unexpected error occurred.';
    }
    
    console.error('Response error:', error);
    return Promise.reject(error);
  }
);
