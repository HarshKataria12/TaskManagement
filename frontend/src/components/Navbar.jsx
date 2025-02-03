import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/authActions.js';

const Navbar = () => {
  // State for controlling the mobile menu open/close
  const [isOpen, setIsOpen] = useState(false);
  
  // Redux dispatch to dispatch actions and access authentication state
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.authReducer);

  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Logo and app name, links to the homepage */}
            <Link to="/" className="text-xl font-bold text-gray-800">
              Task Wave
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {/* If user is logged in, show Logout button, else show Login link */}
            {isLoggedIn ? (
              <button
                onClick={() => dispatch(logout())}  // Logout action dispatch
                className="text-white bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="text-gray-800 hover:text-blue-500">
                Login
              </Link>
            )}
          </div>
          <div className="md:hidden flex items-center">
            {/* Button for toggling the mobile menu */}
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 focus:outline-none">
              {/* Hamburger icon for mobile view */}
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu section */}
      {isOpen && (
        <div className="md:hidden bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* Show Logout button or Login link based on authentication state */}
            {isLoggedIn ? (
              <button
                onClick={() => dispatch(logout())}  // Logout action for mobile view
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-red-500 hover:bg-red-600 transition duration-300"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-gray-100">
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
