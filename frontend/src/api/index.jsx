// Import the axios library to make HTTP requests
import axios from "axios";

// Create an instance of axios with custom configuration
const api = axios.create({
  // Set the base URL for all requests. This should match backend's base URL.
  baseURL: 'http://localhost:8800/api',


  headers: {
    // Specify the content type as JSON for the request body
    'Content-Type': 'application/json',
  },
});

// Export the configured axios instance to be used in other parts of your application
export default api;