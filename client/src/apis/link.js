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


export const getUrls = async (page = 1, limit = 8) => {
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

export const searchLinks = async (searchQuery, page = 1, limit = 8) => {
  try {
    const response = await axios.get(`/url`, {
      params: { search: searchQuery, page, limit },
    });
    return response.data.data.urls; // Assuming the API returns data in this format
  } catch (error) {
    console.error('Error fetching links:', error);
    throw error;
  }
};