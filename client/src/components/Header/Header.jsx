
/*import React, { useEffect, useState } from 'react';
import styles from './Header.module.css';
import Drawer from '../drawer/Drawer';

const Header = () => {
  const [greeting, setGreeting] = useState('');
  const [day, setDay] = useState('');
  const [userName, setUserName] = useState(''); // For storing user's name
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false); // Logout modal state

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return '⛅️  Good morning';
    } else if (currentHour < 17) {
      return '☀️  Good afternoon';
    }else if (currentHour < 20) {
        return '☀️  Good evening';
    }
     else {
      return '🌘  Good night';
    }
  };

  const getCurrentDate = () => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };

  useEffect(() => {
    setGreeting(getGreeting());
    setDay(getCurrentDate());

    // Retrieve user details from local storage
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.name) {
      setUserName(user.name);
    }
  }, []);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const toggleLogoutModal = () => {
    setIsLogoutModalOpen(!isLogoutModalOpen);
  };

  const handleLogout = () => {
    // Clear user data and redirect to login
    localStorage.removeItem('user');
    localStorage.removeItem('token'); // Remove the token
    window.location.href = '/login';
  };

  return (
    <div className={styles.header}>
      <div className={styles.greeting}>
        <div>{greeting}, {userName || 'Guest'}</div>
        <p>{day}</p>
      </div>
      <div className={styles.headerFunc}>
        <button onClick={toggleDrawer}>+ Create New</button>
        <div className={styles['search-wrapper']}>
          <input type="text" placeholder="Search by remarks" />
          <img src="/Frame.png" alt="Search Icon" />
        </div>
        <div className={styles.avatar} onClick={toggleLogoutModal}>
          {userName ? userName.slice(0, 2).toUpperCase() : 'NA'}
          {isLogoutModalOpen && (
            <div className={styles.logoutModal}>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
        <Drawer toggleDrawer={toggleDrawer} isOpen={isDrawerOpen} />
      </div>
    </div>
  );
};

export default Header;*/
import React, { useEffect, useState } from 'react';
import styles from './Header.module.css';
import Drawer from '../drawer/Drawer';

const Header = () => {
  const [greeting, setGreeting] = useState('');
  const [day, setDay] = useState('');
  const [userName, setUserName] = useState(''); // For storing user's name
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false); // Logout modal state

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return '⛅️  Good morning';
    } else if (currentHour < 17) {
      return '☀️  Good afternoon';
    } else if (currentHour < 20) {
      return '☀️  Good evening';
    } else {
      return '🌘  Good night';
    }
  };

  const getCurrentDate = () => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };

  useEffect(() => {
    setGreeting(getGreeting());
    setDay(getCurrentDate());

    // Retrieve user details from local storage
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.name) {
      setUserName(user.name);
    }

    const handleUserUpdated = () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user?.name) {
        setUserName(user.name); // Update user name in state
      }
    };

    // Listen for the custom event to re-render the Header
    window.addEventListener('userUpdated', handleUserUpdated);

    return () => {
      // Cleanup event listener
      window.removeEventListener('userUpdated', handleUserUpdated);
    };
  }, []);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const toggleLogoutModal = () => {
    setIsLogoutModalOpen(!isLogoutModalOpen);
  };

  const handleLogout = () => {
    // Clear user data and redirect to login
    localStorage.removeItem('user');
    localStorage.removeItem('token'); // Remove the token
    window.location.href = '/login';
  };

  return (
    <div className={styles.header}>
      <div className={styles.greeting}>
        <div>{greeting}, {userName || 'Guest'}</div>
        <p>{day}</p>
      </div>
      <div className={styles.headerFunc}>
        <button onClick={toggleDrawer}>+ Create New</button>
        <div className={styles['search-wrapper']}>
          <input type="text" placeholder="Search by remarks" />
          <img src="/Frame.png" alt="Search Icon" />
        </div>
        <div className={styles.avatar} onClick={toggleLogoutModal}>
          {userName ? userName.slice(0, 2).toUpperCase() : 'NA'}
          {isLogoutModalOpen && (
            <div className={styles.logoutModal}>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
        <Drawer toggleDrawer={toggleDrawer} isOpen={isDrawerOpen} />
      </div>
    </div>
  );
};

export default Header;



