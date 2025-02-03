import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import MainLayout from '../layouts/MainLayout';

const Login = () => {
  // Get the location state, which can contain a redirectUrl for post-login redirection
  const { state } = useLocation();
  const redirectUrl = state?.redirectUrl || null; // If redirectUrl exists in the state, use it, otherwise set it to null

  // Set the document title to "Login" when this component is loaded
  useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <MainLayout>
      {/* Pass the redirectUrl as a prop to the LoginForm */}
      <LoginForm redirectUrl={redirectUrl} />
    </MainLayout>
  );
};

export default Login;