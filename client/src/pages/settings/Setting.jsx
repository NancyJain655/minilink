/*
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import styles from "./Setting.module.css";
import { updateUser } from "../../apis/auth"; // Import the function from auth.js
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Toastify CSS

const Setting = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        mobile: user.mobileNumber || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const userData = {
        name: formData.name,
        email: formData.email,
        mobileNumber: formData.mobile, // Include mobile number in the payload
      };
  
      const data = await updateUser(token, userData); // Call the function from auth.js
  
      // Update local storage with new user data
      const updatedUser = data.user;
      localStorage.setItem("user", JSON.stringify(updatedUser));
  
      toast.success(data.msg); // Show success toast
  
      if (data.redirectToLogin) {
        toast.info("Email updated. Please log in again.");
        localStorage.removeItem("token");
        setTimeout(() => {
          window.location.href = "/login";
        }, 3000);
      }
    } catch (err) {
      toast.error(err); // Show error toast
    }
  };
  

  const handleDelete = () => {
    toast.error("Account deletion is not implemented yet!");
    localStorage.removeItem("user");
  };

  return (
    <div className={styles["settings-page"]}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>

      <div className={styles["main-content"]}>
        <Header />

        <section className={styles["form-section"]}>
          <form>
            <div>
              <label>
                <span>Name</span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label>
                <span>Email ID</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label>
                <span>Mobile No.</span>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className={styles["button-group"]}>
              <button
                type="button"
                className={styles["save-button"]}
                onClick={handleSave}
              >
                Save Changes
              </button>
              <button
                type="button"
                className={styles["delete-button"]}
                onClick={handleDelete}
              >
                Delete Account
              </button>
            </div>
          </form>
        </section>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Setting;*/
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import styles from "./Setting.module.css";
import { updateUser, deleteUser } from "../../apis/auth"; // Import functions
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Toastify CSS

const Setting = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        mobile: user.mobileNumber || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const userData = {
        name: formData.name,
        email: formData.email,
        mobileNumber: formData.mobile, // Include mobile number in the payload
      };
  
      const data = await updateUser(token, userData); // Call the function from auth.js
  
      // Update local storage with new user data
      const updatedUser = data.user;
      localStorage.setItem("user", JSON.stringify(updatedUser));
  
      toast.success(data.msg); // Show success toast
  
      // Update header state by triggering a re-render
      window.dispatchEvent(new Event("userUpdated")); // Trigger custom event to re-render Header
  
      if (data.redirectToLogin) {
        toast.info("Email updated. Please log in again.");
        localStorage.removeItem("token");
        setTimeout(() => {
          window.location.href = "/login";
        }, 3000);
      }
    } catch (err) {
      toast.error(err.message || 'An error occurred');
    }
  };
  

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await deleteUser(token); // Call deleteUser function from auth.js

      toast.success(data.msg); // Show success toast
      localStorage.removeItem("user"); // Clear user data
      localStorage.removeItem("token"); // Remove the token

      setTimeout(() => {
        window.location.href = "/login"; // Redirect to login page
      }, 3000);
    } catch (err) {
      toast.error(err.message || 'An error occurred while deleting the account'); // Show error toast
    }
  };

  return (
    <div className={styles["settings-page"]}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>

      <div className={styles["main-content"]}>
        <Header />

        <section className={styles["form-section"]}>
          <form>
            <div>
              <label>
                <span>Name</span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label>
                <span>Email ID</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label>
                <span>Mobile No.</span>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className={styles["button-group"]}>
              <button
                type="button"
                className={styles["save-button"]}
                onClick={handleSave}
              >
                Save Changes
              </button>
              <button
                type="button"
                className={styles["delete-button"]}
                onClick={handleDelete}
              >
                Delete Account
              </button>
            </div>
          </form>
        </section>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Setting;



