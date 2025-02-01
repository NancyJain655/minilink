import axios from 'axios';
import { toast } from "react-toastify"; // Import toast for notifications
const baseUrl = import.meta.env.VITE_BASEURL;

export const createShortenedLink = async (data) => {
  try {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    const response = await axios.post(`${baseUrl}/api/link/create`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Add the token here
      },
    });

    return response.data; // Return the backend response
  } catch (error) {
    console.error("Error creating short URL:", error);
    throw error.response?.data || { msg: "Server error" }; // Propagate the error for handling
  }
};


export const getUrls = async (page = 1, limit = 7) => {
  try {
    const token = localStorage.getItem("token"); // Assuming you're storing the token in localStorage
    const response = await axios.get(`${baseUrl}/api/link/geturl`, {
      params: { page, limit },
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
      withCredentials: true, // If your backend uses cookies
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching links:", error);
    throw error;
  }
};


export const editLink = async (id, updatedData) => {
  try {
    // Retrieve the token from localStorage or sessionStorage
    const token = localStorage.getItem("token"); // Adjust according to where you store it
    console.log("Token in frontend:", token); // Check if the token is being retrieved
    // Send the request with the Authorization header
    const response = await axios.put(
      `${baseUrl}/api/link/edit/${id}`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Link updated successfully!");
    return response.data;
  } catch (error) {
    console.error("Error updating link:", error);
    toast.error(
      error.response?.data?.msg || "An error occurred while updating the link."
    );
    throw error;
  }
};

export const deleteUrlById = async (id) => {
  const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage
  console.log("Token in frontend:", token); // Check if the token is being retrieved
  if (!token) {
    throw new Error("Authentication token is missing.");
  }

  try {
    const response = await axios.delete(`${baseUrl}/api/link/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Send the token in the Authorization header
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting URL:", error);
    throw error;
  }
};

export const searchUrl = async (search) => {
  
  try {
    const token = localStorage.getItem("token");
      const response = await axios.get(`${baseUrl}/api/link/search/${search}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the request
      },
      });
      if(response.data.status == "success"){
        console.log(response.data);
          return response.data;
         
      } else {
          toast.error(response.data.message);
          return [];
      }
  } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error);
      return [];
  }
}


export const getUserLinksWithAnalytics = async (token, page = 1, limit = 7) => {
  try {
    const response = await axios.get(`${baseUrl}/api/link/geturl`, {
      params: { page, limit },
      headers: {
        Authorization: `Bearer ${token}`,  // Ensure user authentication
      },
    });

    return response.data.data; // Returning URLs and analytics data, including pagination
  } catch (error) {
    console.error("Error fetching links:", error);
    return null;
  }
};

export const getDashboardAnalytics = async (token) => {
  try {
    const response = await axios.get(`${baseUrl}/api/link/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`, // Sending user token for authentication
      },
    });

    return response.data; // Return the analytics data
  } catch (error) {
    console.error("Error fetching dashboard analytics:", error);
    throw error; // Handle error gracefully
  }
};
