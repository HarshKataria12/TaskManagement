import React, { useEffect } from 'react';
import SignupForm from '../components/SignupForm'; // Import the SignupForm component
import MainLayout from '../layouts/MainLayout'; // Import the MainLayout wrapper

const Signup = () => {
  // Set the document title to "Signup" when the component is loaded
  useEffect(() => {
    document.title = "Signup";
  }, []);

  return (
    <MainLayout>
      {/* Render the SignupForm component inside the MainLayout */}
      <SignupForm />
    </MainLayout>
  );
};

export default Signup;
