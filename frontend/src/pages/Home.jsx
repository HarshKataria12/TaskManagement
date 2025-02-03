import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Tasks from '../components/Tasks';
import MainLayout from '../layouts/MainLayout';

const Home = () => {
  const authState = useSelector((state) => state.authReducer);
  const { isLoggedIn, user } = authState;

  useEffect(() => {
    document.title = isLoggedIn ? `${user?.name}'s Tasks` : 'Task Manager';
  }, [isLoggedIn, user?.name]); // Prevents crashes when user is null

  return (
    <>
      {!isLoggedIn ? (
        // Landing Page for Non-Logged-In Users
        <div className="flex flex-col md:flex-row min-h-screen">
          {/* Left Section */}
          <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8 md:p-12">
            <div className="max-w-lg space-y-8 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                Welcome to
                <span className="block bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                  Task Wave
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600">
                Ride the wave of productivity with our intuitive task management solution.
                Organize, prioritize, and conquer your daily tasks effortlessly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link
                  to="/signup"
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition duration-300 shadow-lg hover:shadow-xl"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-50 transition duration-300 shadow-lg hover:shadow-xl"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>

          {/* Right Section (No Shadow) */}
          <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-8 md:p-12">
            <img
              src="/flat-hand-drawn-time-management-illustration/4930161.jpg"
              alt="Task Management Illustration"
              className="w-full h-auto max-w-md rounded-lg"
            />
          </div>
        </div>
      ) : (
        // Dashboard for Logged-In Users (Using MainLayout)
        <MainLayout>
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6 border-b border-b-gray-200 pb-4">
              Welcome, {user?.name}!
            </h1>
            <Tasks />
          </div>
        </MainLayout>
      )}
    </>
  );
};

export default Home;
