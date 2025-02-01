import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  
import styles from './Header.module.css';
import Drawer from '../drawer/Drawer';

const Header = ({search,setSearch}) => {
  const [greeting, setGreeting] = useState('');
  const [day, setDay] = useState('');
  const [userName, setUserName] = useState(''); 
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false); 
  const navigate = useNavigate(); 

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

 
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.name) {
      setUserName(user.name);
    }

    const handleUserUpdated = () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user?.name) {
        setUserName(user.name); 
      }
    };

    
    window.addEventListener('userUpdated', handleUserUpdated);

    return () => {
      
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
   
    localStorage.removeItem('user');
    localStorage.removeItem('token'); 
    window.location.href = '/login';
  };
  const handleSearchChange = async (e) => {
    if (location.pathname !== "/links") {
      navigate("/links");
    }
    
    const query = e.target.value;
    setSearch(query);
  
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
          <input
            type="text"
            placeholder="Search by remarks"
            value={search}  
            onChange={handleSearchChange}  
          />
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






