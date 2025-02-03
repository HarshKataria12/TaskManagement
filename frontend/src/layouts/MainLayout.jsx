import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar'; // Import the Navbar component

const MainLayout = ({ children }) => {
  // Get the login status from the Redux store
  const { isLoggedIn } = useSelector(state => state.authReducer);

  return (
    <div className='relative bg-gray-50 min-h-screen w-screen overflow-x-hidden'>
      {/* Render Navbar only if the user is logged in */}
      {isLoggedIn && <Navbar />}
      
      {/* If the user is logged in, add extra padding to the top to avoid overlap with Navbar */}
      <div className={isLoggedIn ? 'pt-16' : ''}> 
        {/* Render the child components (content) passed to this layout */}
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
