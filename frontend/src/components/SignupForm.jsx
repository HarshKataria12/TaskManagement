import React, { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import Input from './utils/Input'; // Reusable input component
import Loader from './utils/Loader'; // Loader component for showing a spinner while submitting
import validateManyFields from '../validations'; // Function to validate form fields
import useFetch from '../hooks/useFetch'; // Custom hook for handling API requests

const SignupForm = () => {
  // State to manage form inputs and validation errors
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [formErrors, setFormErrors] = useState({});
  
  // Custom hook for API requests and loading state
  const [fetchData, { loading }] = useFetch();
  
  // Hook to navigate the user after successful signup
  const navigate = useNavigate();

  // Handles form input changes and updates state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form fields
    const errors = validateManyFields("signup", formData);
    if (errors.length > 0) {
      // Convert error array into an object for easy display
      setFormErrors(errors.reduce((acc, err) => ({ ...acc, [err.field]: err.err }), {}));
      return;
    }

    // API configuration for signup request
    const config = { url: "/auth/signup", method: "post", data: formData };

    // Send signup request and redirect to login page on success
    fetchData(config).then(() => {
      navigate("/login");
    });
  };

  return (
    <div className="max-w-md mx-auto my-16 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Signup</h2>
      
      <form onSubmit={handleSubmit}>
        {/* Name Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
          {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Password</label>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
          {formErrors.password && <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>}
        </div>

        {/* Signup Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          {loading ? <Loader /> : "Signup"}
        </button>

        {/* Link to login page */}
        <p className="text-center mt-4">
          Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default SignupForm;