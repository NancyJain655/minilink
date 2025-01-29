
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { registerUser } from '../../apis/auth';
import { toast } from "react-toastify"; // Import the toast object
import styles from "./Register.module.css"; // Import the CSS Module

const Register = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [activeButton, setActiveButton] = useState(
    location.pathname === "/login" ? "login" : "signup"
  );

  // Sync state with URL changes
  useEffect(() => {
    if (location.pathname === "/login") {
      setActiveButton("login");
    } else if (location.pathname === "/register") {
      setActiveButton("signup");
    }
  }, [location.pathname]);

  const handleLoginNavigation = () => {
    setActiveButton("login");
    navigate("/login");
  };

  const handleSignupNavigation = () => {
    setActiveButton("signup");
    navigate("/register");
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const { name, email, mobileNumber, password, confirmPassword } = e.target.elements;
  
    if (password.value !== confirmPassword.value) {
      toast.error('Passwords do not match');
      return;
    }
  
    try {
      const response = await registerUser({
        name: name.value,
        email: email.value,
        mobileNumber: mobileNumber.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
      });

      
      console.log(response.msg)
      toast.success(response.msg); // Show success message from backend
      localStorage.setItem('token', response.token);
  
      setTimeout(() => {
        navigate('/login');
      }, 1500); // Delay navigation to show success toast
    } catch (error) {
      // Display error message from the backend or fallback message
      console.log(error);
      toast.error(error); // Use `error.message` to get the thrown error message
    }
  };
  

  return (
    <div className={styles.container}>
      <div className={styles["top-buttons"]}>
        <button
          onClick={handleSignupNavigation}
          className={`${styles["top-button"]} ${activeButton === "signup" ? "" : styles["inactive-button"]}`}
        >
          SignUp
        </button>
        <button
          onClick={handleLoginNavigation}
          className={`${styles["top-button"]} ${activeButton === "login" ? "" : styles["inactive-button"]}`}
        >
          Login
        </button>
      </div>

      {/* Left Section */}
      <div className={styles["left-section"]}>
        <h1 className={styles.logo}>
          <img src="cuvette.png" alt="Cuvette Logo" />
        </h1>
      </div>

      {/* Right Section */}
      <div className={styles["right-section"]}>
        <div className={styles["form-container"]}>
          <h2>Join us Today!</h2>
          <form onSubmit={handleRegisterSubmit}>
            <input name="name" type="text" placeholder="Name" required />
            <input name="email" type="email" placeholder="Email id" required />
            <input name="mobileNumber" type="tel" placeholder="Mobile no." pattern="[0-9]{10}" required />
            <input name="password" type="password" placeholder="Password" required />
            <input name="confirmPassword" type="password" placeholder="Confirm Password" required />
            <button type="submit">Register</button>
          </form>
          {error && <p>{error}</p>}
          <p>
            Already have an account?{" "}
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={handleLoginNavigation}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

