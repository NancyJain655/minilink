/*import React, { useState , useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import { loginUser } from '../apis/auth'; 
import styles from "./Login.module.css"; // Import the CSS Module


const Login = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize the navigation hook
     const location = useLocation(); // Get the current location
      const [activeButton, setActiveButton] = useState(
        location.pathname === "/login" ? "login" : "signup"
      );
    
      useEffect(() => {
        // Sync state with URL changes
        if (location.pathname === "/login") {
          setActiveButton("login");
        } else if (location.pathname === "/register") {
          setActiveButton("signup");
        }
      }, [location.pathname]);

  const handleLoginNavigation = () => {
    setActiveButton("login");
    navigate("/login"); // Navigate to the Login page
  };
  const handleSignupNavigation = () => {
    setActiveButton("signup");
    navigate("/register"); // Stay on the Register page (this is optional, since you're already on it)
  };
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    if (!email.value || !password.value) {
        setError("Email and password are required");
        return;
      }

    try {
      const response = await loginUser({
        email: email.value,
        password: password.value,
      });

      localStorage.setItem('token', response.token);
      navigate("/dashboard");
    } catch (error) {
        setError(error?.response?.data?.msg || 'Something went wrong during login'); // Extract the message here as well
    }
  };
  return (
    <div className={styles.container}>
        <div className={styles["top-buttons"]}>
              <button
                  onClick={handleSignupNavigation}
                  className={`${styles["top-button"]} ${
                    activeButton === "signup" ? "" : styles["inactive-button"]
                  }`}
                >
                  SignUp
                </button>
                <button
                  onClick={handleLoginNavigation}
                  className={`${styles["top-button"]} ${
                    activeButton === "login" ? "" : styles["inactive-button"]
                  }`}
                >
                  Login
                </button>
              </div>
        {/* Left Section with Background }
              <div className={styles["left-section"]}>
                <h1 className={styles.logo}>
                  <img src="cuvette.png" alt="Cuvette Logo" />
                </h1>
              </div>
     <div className={styles["right-section"]}>
             <div className={styles["form-container"]}>
        <h2>Login</h2>
        <form onSubmit={handleLoginSubmit}>
          <input name="email" type="email" placeholder="Email id" />
          <input name="password" type="password" placeholder="Password" />
          <button type="submit">Login</button>
        </form>
        {error && <p>{error}</p>}
        <p>Don't have an account? <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={handleSignupNavigation}
            >
              SignUp
            </span></p>
        </div>
      </div>
      </div>
    
   
  );
};

export default Login;*/
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify"; // Import the toast object
import { loginUser } from "../../apis/auth";
import styles from "./Login.module.css"; // Import the CSS Module

const Login = () => {
  const [error, setError] = useState("");
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

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;

    if (!email.value || !password.value) {
      toast.error("Email and password are required"); // Show error toast
      return;
    }

    try {
      const response = await loginUser({
        email: email.value,
        password: password.value,
      });
      toast.success(response.msg);
      // Save token to localStorage and navigate
      localStorage.setItem("token", response.token);
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500); // Delay of 1.5 seconds
      
    } catch (err) {
      const errorMessage = err || "Something went wrong during login";
     // setError(errorMessage);
      toast.error(errorMessage); // Show error toast
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles["top-buttons"]}>
        <button
          onClick={handleSignupNavigation}
          className={`${styles["top-button"]} ${
            activeButton === "signup" ? "" : styles["inactive-button"]
          }`}
        >
          SignUp
        </button>
        <button
          onClick={handleLoginNavigation}
          className={`${styles["top-button"]} ${
            activeButton === "login" ? "" : styles["inactive-button"]
          }`}
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
          <h2>Login</h2>
          <form onSubmit={handleLoginSubmit}>
            <input name="email" type="email" placeholder="Email id" />
            <input name="password" type="password" placeholder="Password" />
            <button type="submit">Login</button>
          </form>
          {error && <p className={styles.error}>{error}</p>} {/* Display error */}
          <p>
            Don't have an account?{" "}
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={handleSignupNavigation}
            >
              SignUp
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

