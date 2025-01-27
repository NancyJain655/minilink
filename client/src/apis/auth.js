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
    const response = await axios.post(`${baseUrl}/api/auth/login`, credentials, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.data;

    // Save token and user details to local storage
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user)); // Convert object to string

    return data; // Return data for further use if needed
  } catch (error) {
    throw error.response?.data?.msg || 'Something went wrong during login';
  }
};

export const updateUser = async (token, userData) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.put(
      `${baseUrl}/api/auth/update`,
      userData, // Include name, email, and mobileNumber in the body
      config
    );

    return response.data; // Return the response data to the caller
  } catch (error) {
    console.error("Error updating user:", error);
    throw error.response?.data?.msg || "An error occurred. Please try again.";
  }
};

export const deleteUser = async (token) => {
  try {
    const response = await axios.delete(`${baseUrl}/api/auth/delete`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Success response
  } catch (err) {
    throw new Error(err.response?.data?.msg || 'An error occurred while deleting the account');
  }
};
