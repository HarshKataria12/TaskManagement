import React, { useState, useEffect } from 'react'; // Import useEffect for side effects
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate for routing
import Input from './utils/Input'; // Reusable Input component
import Loader from './utils/Loader'; // Reusable Loader component
import validateManyFields from '../validations'; // Validation utility
import { useDispatch, useSelector } from 'react-redux'; // Redux hooks for state management
import { postLoginData } from '../redux/actions/authActions'; // Action to handle login

const LoginForm = ({ redirectUrl }) => {
  // State to manage form data (email and password)
  const [formData, setFormData] = useState({ email: "", password: "" });

  // State to manage form validation errors
  const [formErrors, setFormErrors] = useState({});

  // Hook to navigate programmatically
  const navigate = useNavigate();

  // Hook to dispatch Redux actions
  const dispatch = useDispatch();

  // Get loading state and login status from Redux store
  const { loading, isLoggedIn } = useSelector((state) => state.authReducer);

  // Redirect user if they are already logged in
  useEffect(() => {
    if (isLoggedIn) navigate(redirectUrl || "/"); // Redirect to the provided URL or home page
  }, [isLoggedIn, navigate, redirectUrl]);

  // Handle input changes and update form data
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    const errors = validateManyFields("login", formData);
    if (errors.length > 0) {
      // Convert errors array to an object for easier access
      setFormErrors(errors.reduce((acc, err) => ({ ...acc, [err.field]: err.err }), {}));
      return; // Stop submission if there are errors
    }

    // Dispatch login action with email and password
    dispatch(postLoginData(formData.email, formData.password));
  };

  return (
    <div className="max-w-md mx-auto my-16 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      <form onSubmit={handleSubmit}>
        {/* Email Input Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          {/* Display email validation error if any */}
          {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
        </div>

        {/* Password Input Field */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Password</label>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
          {/* Display password validation error if any */}
          {formErrors.password && <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          {/* Show loader if loading, otherwise show "Login" text */}
          {loading ? <Loader /> : "Login"}
        </button>

        {/* Link to Signup Page */}
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">Signup</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;