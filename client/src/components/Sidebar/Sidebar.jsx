/*import React from 'react';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
       <img src="cuvette.png" alt="Cuvette Logo" />

        <div className={styles.menu}>

          <ul>
            <li>DASHBOARD</li>
            <li>LINKS</li>
            <li>ANALYTICS</li>
            <li>SETTINGS</li>
          </ul>

        </div>
    </aside>
  )
}

export default Sidebar*/
import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}><img src="cuvette.png" alt="Cuvette Logo" /></div>
      <div className={styles.middle}>
      <ul>
        <li>
        
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => (isActive ? styles.active : "")}
          > <img src="/dashboard.png" alt="dashboard Logo" />
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/links" 
            className={({ isActive }) => (isActive ? styles.active : "")}
          > <img src="/link.png" alt="link Logo" />
            Links
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/analytics" 
            className={({ isActive }) => (isActive ? styles.active : "")}
          > <img src="analytics.png" alt="analytic Logo" />
            Analytics
          </NavLink>
        </li>
        </ul>
        </div>
        <div className={styles.settings}>
            <ul>
        <li>
          <NavLink 
            to="/settings" 
            className={({ isActive }) => (isActive ? styles.active : "")}
          > <img src="setting.png" alt="setting Logo" />
            Settings
          </NavLink>
        </li>
      </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
