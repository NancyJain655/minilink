import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import styles from "./Analytics.module.css";

const Analytics = () => {
  return (
    <div className={styles.analytics}>
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className={styles.main}>
        <Header />
        <div className={styles.pages}>
          <h2>Welcome to the analytics page</h2>
          <p>Here's where you can manage your data dynamically.</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;