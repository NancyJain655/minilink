import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import styles from "./Links.module.css";

const Links = () => {
  return (
    <div className={styles.link}>
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className={styles.main}>
        <Header />
        <div className={styles.pages}>
          <h2>Welcome to the link page</h2>
          <p>Here's where you can manage your data dynamically.</p>
        </div>
      </div>
    </div>
  );
};

export default Links;