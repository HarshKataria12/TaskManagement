import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Textarea, Input } from '../components/utils/Input';
import useFetch from '../hooks/useFetch';
import MainLayout from '../layouts/MainLayout';
import validateManyFields from '../validations';

const Task = () => {
  const { taskId } = useParams();
  const mode = taskId ? 'update' : 'add';

  // Get today's date in "YYYY-MM-DD" format
  const today = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'todo',
    createdAt: today,
    dueDate: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [fetchData] = useFetch();
  const authState = useSelector((state) => state.authReducer);
  const navigate = useNavigate();

  const formatDate = (date, format = "input") => {
    if (!date) return "";
  
    const parsedDate = new Date(date);
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const day = String(parsedDate.getDate()).padStart(2, "0");
  
    return format === "input" ? `${year}-${month}-${day}` : `${day}-${month}-${year}`;
  };
  
  
  useEffect(() => {
    if (mode === 'update') {
      const config = {
        url: `/tasks/${taskId}`,
        method: 'get',
        headers: { Authorization: authState.token },
      };
      

      fetchData(config).then((data) => {
        setFormData({
          title: data.task.title,
          description: data.task.description,
          priority: data.task.priority || 'medium',
          status: data.task.status || 'todo',
          createdAt: data.task.createdAt || today,
          dueDate: data.task.dueDate || '',
        });
      });
    }
  }, [mode, taskId, authState, fetchData, today]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateManyFields('task', formData);
    if (errors.length > 0) {
      setFormErrors(errors.reduce((acc, err) => ({ ...acc, [err.field]: err.err }), {}));
      return;
    }

    const config = {
      url: mode === 'add' ? '/tasks' : `/tasks/${taskId}`,
      method: mode === 'add' ? 'post' : 'put',
      data: formData,
      headers: { Authorization: authState.token },
    };

    fetchData(config).then(() => navigate('/'));
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">{mode === 'add' ? 'Add New Task' : 'Edit Task'}</h2>
        <form onSubmit={handleSubmit}>
          {/* Task Title Field */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Task Title <span className="text-red-500">*</span>
            </label>
            <Input
              id="title"
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
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <Textarea
              id="description"
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
            <label htmlFor="priority" className="block text-sm font-medium mb-1">Priority</label>
            <select
              id="priority"
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
            <label htmlFor="status" className="block text-sm font-medium mb-1">Status</label>
            <select
              id="status"
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
            <label htmlFor="dueDate" className="block text-sm font-medium mb-1">Due Date</label>
            <Input
              id="dueDate"
              type="date"
              name="dueDate"
              value={formData.dueDate ? formatDate(formData.dueDate, "input") : ""}
              onChange={handleChange}
              min={today}
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
