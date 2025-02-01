
/*import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <img src="cuvette.png" alt="Cuvette Logo" />
      </div>
      <div className={styles.middle}>
        <ul>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              <img src="/dashboard.png" alt="Dashboard Logo" />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/links"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              <img src="/link.png" alt="Link Logo" />
              Links
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/analytics"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              <img src="/analytics.png" alt="Analytics Logo" />
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
            >
              <img src="/setting.png" alt="Settings Logo" />
              Settings
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;*/
import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <img src="cuvette.png" alt="Cuvette Logo" />
      </div>
      <div className={styles.middle}>
        <ul>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              <img src="/dashboard.png" alt="Dashboard Logo" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/links"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              <img src="/link.png" alt="Link Logo" />
              <span>Links</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/analytics"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              <img src="/analytics.png" alt="Analytics Logo" />
              <span>Analytics</span>
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
            >
              <img src="/setting.png" alt="Settings Logo" />
              <span>Settings</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;


