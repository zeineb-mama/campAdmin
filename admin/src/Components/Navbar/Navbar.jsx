import React, { useState } from 'react';
import './Navbar.css';
import navlogo from '../Assets/nav-logo.svg';
import navprofileIcon from '../Assets/nav-profile.svg';

const Navbar = ({ user, handleLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className='navbar'>
      <img src={navlogo} className='nav-logo' alt="Logo" />
      {user && (
        <>
          <div className='nav-profile-container'>
          <span className='nav-username'>{user.name}</span>
            <img
              src={navprofileIcon}
              className='nav-profile'
              alt="Profile Icon"
              onClick={toggleDropdown}
            />
            {dropdownOpen && (
              <div className='nav-dropdown'>
                <div className='nav-dropdown-item'>Profile</div>
                <div className='nav-dropdown-item' onClick={handleLogout}>Logout</div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
