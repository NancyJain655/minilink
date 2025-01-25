import axios from 'axios';
const baseUrl = import.meta.env.VITE_BASEURL

// Register a new user
export const registerUser = async (userData) => {
    try {
      const response = await axios.post(`${baseUrl}/api/auth/register`, userData);
      console.log('API Helper Response:', response.data); // Debugging line
      return response.data; // Return the actual response data
    } catch (error) {
      // Check if the error response exists and contains a message
      if (error.response && error.response.data && error.response.data.msg) {
        throw error.response?.data?.msg; // Throw the backend error message
      } else {
        throw 'Something went wrong during registration'; // Fallback error
      }
    }
  };
  

// Login user
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${baseUrl}/api/auth/login`, credentials,{
        headers: {
          "Content-Type": "application/json",
        },
    }
    );
    return response.data; // return the response data
  } catch (error) {
    throw error.response?.data?.msg || 'Something went wrong during login';
  }
};