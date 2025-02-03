import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Textarea, Input } from '../components/utils/Input'; // Input components for task fields
import useFetch from '../hooks/useFetch'; // Custom hook to handle API requests
import MainLayout from '../layouts/MainLayout'; // Layout wrapper to ensure consistent styling
import validateManyFields from '../validations'; // Function to validate form data

const Task = () => {
  const { taskId } = useParams(); // Get taskId from URL params (used for editing)
  const mode = taskId ? 'update' : 'add'; // Set mode based on taskId, either "add" or "update"
  
  // Initial state for form fields
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'todo',
    createdAt: new Date().toISOString().split('T')[0],
    dueDate: '',
  });
  const [formErrors, setFormErrors] = useState({}); // Store validation errors
  const [fetchData] = useFetch(); // Fetch data hook to interact with API
  const authState = useSelector((state) => state.authReducer); // Get authentication state from Redux
  const navigate = useNavigate(); // Navigation function to redirect after form submission

  // UseEffect to load existing task data for editing (only in "update" mode)
  useEffect(() => {
    if (mode === 'update') {
      const config = {
        url: `/tasks/${taskId}`,
        method: 'get',
        headers: { Authorization: authState.token },
      };
      fetchData(config).then((data) => {
        // Populate form with existing task data
        setFormData({
          title: data.task.title,
          description: data.task.description,
          priority: data.task.priority || 'medium',
          status: data.task.status || 'todo',
          createdAt: data.task.createdAt || new Date().toISOString().split('T')[0],
          dueDate: data.task.dueDate || '',
        });
      });
    }
  }, [mode, taskId, authState, fetchData]);

  // Handle form field changes and update state accordingly
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission, including validation and API request
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate the form data before submitting
    const errors = validateManyFields('task', formData);
    if (errors.length > 0) {
      setFormErrors(errors.reduce((acc, err) => ({ ...acc, [err.field]: err.err }), {}));
      return;
    }

    // Configure API request for adding or updating the task
    const config = {
      url: mode === 'add' ? '/tasks' : `/tasks/${taskId}`,
      method: mode === 'add' ? 'post' : 'put',
      data: formData,
      headers: { Authorization: authState.token },
    };

    // Send the request and navigate back to the task list on success
    fetchData(config).then(() => navigate('/'));
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">{mode === 'add' ? 'Add New Task' : 'Edit Task'}</h2>
        <form onSubmit={handleSubmit}>
          {/* Task Title Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Task Title</label>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title"
            />
            {formErrors.title && (
              <p className="text-red-500 text-sm mt-1">{formErrors.title}</p>
            )}
          </div>

          {/* Task Description Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Description</label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter task description"
            />
            {formErrors.description && (
              <p className="text-red-500 text-sm mt-1">{formErrors.description}</p>
            )}
          </div>

          {/* Priority Selection Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition duration-200"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          {/* Status Selection Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition duration-200"
            >
              <option value="todo">Todo</option>
              <option value="inprogress">In Progress</option>
              <option value="complete">Complete</option>
            </select>
          </div>

          {/* Due Date Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Due Date</label>
            <Input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
            />
            {formErrors.dueDate && (
              <p className="text-red-500 text-sm mt-1">{formErrors.dueDate}</p>
            )}
          </div>

          {/* Buttons for Submit and Cancel */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              {mode === 'add' ? 'Add Task' : 'Update Task'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default Task;
