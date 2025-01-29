/*import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import styles from "./Analytics.module.css";

const Analytics = () => {
  return (
    <div className={styles.analytics}>
    
      <Sidebar />
      
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

export default Analytics;*/
import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import styles from "./Analytics.module.css";

const Analytics = () => {
  // Sample data for the table
  const data = [
    {
      timestamp: "Jan 14, 2025 16:30",
      originalLink: "https://www.travelwiththejoneses",
      shortLink: "https://cuvette.io/Bn41aC0Inxj",
      ipAddress: "192.158.1.38",
      userDevice: "Android",
    },
    {
      timestamp: "Jan 14, 2025 6:30",
      originalLink: "https://www.travelwiththejoneses",
      shortLink: "https://cuvette.io/Bn41aC0Inxj",
      ipAddress: "192.158.1.38",
      userDevice: "Chrome",
    },
    {
      timestamp: "Jan 14, 2025 8:30",
      originalLink: "https://www.travelwiththejoneses",
      shortLink: "https://cuvette.io/Bn41aC0Inxj",
      ipAddress: "192.158.1.38",
      userDevice: "iOS",
    },
  ];

  return (
    <div className={styles.analytics}>
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className={styles.main}>
        <Header />
        <div className={styles.pages}>
          {/* Table */}
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Timestamp<img src="./sorticon.png" alt="sorting" className={styles.sortIcon}/></th>
                <th>Original Link</th>
                <th>Short Link</th>
                <th>IP Address</th>
                <th>User Device</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  <td>{row.timestamp}</td>
                  <td>{row.originalLink}</td>
                  <td>
                    
                      {row.shortLink}
                   
                  </td>
                  <td>{row.ipAddress}</td>
                  <td>{row.userDevice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
