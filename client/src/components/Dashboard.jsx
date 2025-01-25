import React, { useState } from 'react';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const [user] = useState({ name: 'Sujith' }); // Replace with actual user data
  const [totalClicks, setTotalClicks] = useState(0);

  return (
    <div className={styles.dashboard}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.greeting}>
          🌞 Good morning, {user.name}
          <span>{new Date().toLocaleDateString()}</span>
        </div>
        <div className={styles.navActions}>
          <button className={styles.createBtn}>+ Create new</button>
          <input
            type="text"
            placeholder="Search by remarks"
            className={styles.searchBar}
          />
          <div className={styles.userIcon}>
            {user.name.slice(0, 2).toUpperCase()}
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>cuvette</div>
        <button className={`${styles.navButton} ${styles.active}`}>Dashboard</button>
        <button className={styles.navButton}>Links</button>
        <button className={styles.navButton}>Analytics</button>
        <button className={styles.navButton}>Settings</button>
      </aside>

      {/* Main Content */}
      <main className={styles.main}>
        <h2>Total Clicks: {totalClicks}</h2>
        <div className={styles.cards}>
          <div className={styles.card}>
            <h3>Date-wise Clicks</h3>
            <p>All clicks will be displayed here...</p>
          </div>
          <div className={styles.card}>
            <h3>Device-wise Clicks</h3>
            <p>All device stats will be displayed here...</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
