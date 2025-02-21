import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "./utils/Input";
import Loader from "./utils/Loader";
import validateManyFields from "../validations";
import useFetch from "../hooks/useFetch";

const SignupForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [formErrors, setFormErrors] = useState({});
  const [fetchData, { loading }] = useFetch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    const errors = validateManyFields("signup", formData);
    if (errors.length > 0) {
      setFormErrors(errors.reduce((acc, err) => ({ ...acc, [err.field]: err.err }), {}));
      return;
    }

    const config = { url: "/auth/signup", method: "post", data: formData };

    try {
      await fetchData(config);
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error.message);
      setFormErrors({ general: error.message }); // ✅ Set general error message
    }
  };

  return (
    <div className="max-w-md mx-auto my-16 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Signup</h2>
      
      <form onSubmit={handleSubmit}>
        {/* Name Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <Input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" />
          {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" />
          {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Password</label>
          <Input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" />
          {formErrors.password && <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>}
        </div>

        {/* Show General Error Message */}
        {formErrors.general && <p className="text-red-500 text-sm mb-4">{formErrors.general}</p>}

        {/* Signup Button */}
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200">
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
