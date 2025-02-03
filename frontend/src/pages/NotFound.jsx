import React from 'react';
import MainLayout from '../layouts/MainLayout'; // Import the MainLayout to wrap the NotFound page

const NotFound = () => {
  return (
    <MainLayout>
      {/* Centered content for the 404 page */}
      <div className="text-center py-16">
        {/* Display a large "404" text to indicate the error */}
        <h1 className="text-9xl font-bold text-gray-800">404</h1>
        {/* Display a message explaining the page doesn't exist */}
        <p className="text-xl text-gray-600 mt-4">The page you are looking for doesn't exist.</p>
      </div>
    </MainLayout>
  );
};

export default NotFound;
