import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Tooltip from '../components/utils/Tooltip';

const Tasks = () => {
  const authState = useSelector((state) => state.authReducer);
  const [tasks, setTasks] = useState([]);
  const [fetchData] = useFetch();

  // Fetch tasks on component mount or when auth state changes
  useEffect(() => {
    if (authState.isLoggedIn) {
      const config = {
        url: '/tasks',
        method: 'get',
        headers: { Authorization: authState.token },
      };
      fetchData(config)
        .then((data) => {
          if (data?.tasks) {
            setTasks(data.tasks);
          }
        })
        .catch((error) => {
          console.error('Error fetching tasks:', error);
        });
    }
  }, [authState, fetchData]);

  // Handle task deletion
  const handleDelete = (id) => {
    const config = {
      url: `/tasks/${id}`,
      method: 'delete',
      headers: { Authorization: authState.token },
    };
    fetchData(config)
      .then(() => {
        setTasks((prev) => prev.filter((task) => task._id !== id));
      })
      .catch((error) => {
        console.error('Error deleting task:', error);
      });
  };

  // Handle status change
  const handleStatusChange = async (id, newStatus) => {
    const taskToUpdate = tasks.find((task) => task._id === id);
    if (!taskToUpdate) {
      console.error('Task not found');
      return;
    }

    const config = {
      url: `/tasks/${id}`,
      method: 'put',
      headers: { Authorization: authState.token },
      data: {
        title: taskToUpdate.title,
        description: taskToUpdate.description,
        status: newStatus,
      },
    };

    try {
      const response = await fetchData(config);
      if (response?.task) {
        setTasks((prev) =>
          prev.map((task) =>
            task._id === id ? { ...task, status: newStatus } : task
          )
        );
      }
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  // Get priority color based on task priority
  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get status color based on task status
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'todo':
        return 'bg-gray-100 text-gray-800';
      case 'inprogress':
        return 'bg-blue-100 text-blue-800';
      case 'complete':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Group tasks by status
  const groupedTasks = tasks.reduce((acc, task) => {
    const status = task.status?.toLowerCase() || 'todo';
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(task);
    return acc;
  }, {});

  const statusSections = [
    { id: 'todo', title: 'Todo' },
    { id: 'inprogress', title: 'In Progress' },
    { id: 'complete', title: 'Complete' },
  ];

  return (
    <div className="max-w-6xl mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
      {/* Header with "Your Tasks" and "Add Task" button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Tasks ({tasks.length})</h2>
        <Link
          to="/tasks/add"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          + Add New Task
        </Link>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">No tasks found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statusSections.map((section) => (
            <div key={section.id} className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              {groupedTasks[section.id]?.length > 0 ? (
                groupedTasks[section.id].map((task) => (
                  <div key={task._id} className="mb-4 p-4 border border-gray-200 rounded-lg bg-white">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-lg">{task.title || 'Untitled Task'}</h3>
                        <div className="mt-1">
                          <span className={`px-2 py-1 text-sm rounded-full ${getPriorityColor(task.priority)}`}>
                            {task.priority || 'No priority'}
                          </span>
                          <span className={`ml-2 px-2 py-1 text-sm rounded-full ${getStatusColor(task.status)}`}>
                            {task.status || 'No status'}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Tooltip text="Edit" position="top">
                          <Link
                            to={`/tasks/${task._id}`}
                            className="text-green-600 hover:text-green-700 transition duration-300"
                          >
                            <i className="fa-solid fa-pen"></i>
                          </Link>
                        </Tooltip>
                        <Tooltip text="Delete" position="top">
                          <button
                            onClick={() => handleDelete(task._id)}
                            className="text-red-500 hover:text-red-600 transition duration-300"
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </Tooltip>
                      </div>
                    </div>
                    <div className="mt-2 text-gray-700 whitespace-pre-wrap">
                      {task.description || 'No description'}
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      <span>Created: {task.createdAt ? new Date(task.createdAt).toLocaleDateString() : 'N/A'}</span>
                      {task.dueDate && (
                        <span className="ml-4">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                      )}
                    </div>
                    {/* Status Change Buttons */}
                    <div className="mt-4 flex gap-2">
                      {task.status !== 'todo' && (
                        <Tooltip text="Move to Todo" position="top">
                          <button
                            onClick={() => handleStatusChange(task._id, 'todo')}
                            className="bg-gray-500 text-white px-4 py-2 text-sm rounded-md hover:bg-gray-600 transition duration-300"
                          >
                            Todo
                          </button>
                        </Tooltip>
                      )}
                      {task.status !== 'inprogress' && (
                        <Tooltip text="Move to In Progress" position="top">
                          <button
                            onClick={() => handleStatusChange(task._id, 'inprogress')}
                            className="bg-blue-500 text-white px-4 py-2 text-sm rounded-md hover:bg-blue-600 transition duration-300"
                          >
                            In Progress
                          </button>
                        </Tooltip>
                      )}
                      {task.status !== 'complete' && (
                        <Tooltip text="Mark as Complete" position="top">
                          <button
                            onClick={() => handleStatusChange(task._id, 'complete')}
                            className="bg-green-500 text-white px-4 py-2 text-sm rounded-md hover:bg-green-600 transition duration-300"
                          >
                            Complete
                          </button>
                        </Tooltip>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center">No tasks in this section.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tasks;