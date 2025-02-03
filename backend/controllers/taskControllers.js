const Task = require("../models/Task"); // Import the Task model for interacting with task-related data in the database
const { validateObjectId } = require("../utils/validation"); // Utility function to validate ObjectId format for task IDs
const { NotFoundError, BadRequestError } = require("../utils/errors"); // Custom error classes for handling "not found" and "bad request" errors

// Controller for retrieving all tasks associated with the authenticated user
exports.getTasks = async (req, res, next) => {
  try {
    // Fetch all tasks for the current user from the database
    const tasks = await Task.find({ user: req.user.id });
    const message = tasks.length > 0 
      ? "Tasks found successfully.." 
      : "No tasks found"; // If tasks exist, return a success message, otherwise return a "no tasks" message

    // Respond with the list of tasks, a status, a message, and the count of tasks
    res.status(200).json({ 
      tasks, 
      status: true, 
      msg: message,
      count: tasks.length // Include the number of tasks found
    });
  } catch (err) {
    next(err); // Pass any errors to the error-handling middleware
  }
};

// Controller for retrieving a single task by its ID
exports.getTask = async (req, res, next) => {
  try {
    // Validate that the task ID in the request parameters is in the correct format
    if (!validateObjectId(req.params.taskId)) {
      throw new BadRequestError("Invalid task ID format"); // Throw a "bad request" error if the ID is invalid
    }

    // Find the task by its ID and ensure it belongs to the current user
    const task = await Task.findOne({ 
      user: req.user.id, 
      _id: req.params.taskId 
    });

    if (!task) {
      throw new NotFoundError("Task not found"); // Throw a "not found" error if the task doesn't exist or doesn't belong to the user
    }

    // Respond with the task details, a success status, and a message
    res.status(200).json({ 
      task, 
      status: true, 
      msg: "Task retrieved successfully" 
    });
  } catch (err) {
    next(err); // Pass any errors to the error-handling middleware
  }
};

// Controller for creating a new task
exports.postTask = async (req, res, next) => {
  try {
    // Destructure required fields from the request body, with defaults for priority and status
    const { title, description, priority = 'medium', status = 'todo', dueDate } = req.body;
    
    // Ensure the title and description are provided
    if (!title || !description) {
      throw new BadRequestError("Title and description are required"); // Throw an error if any required fields are missing
    }

    // Create a new task and save it to the database
    const task = await Task.create({
      user: req.user.id,
      title: title.trim(),
      description: description.trim(),
      priority,
      status,
      dueDate,
    });

    // Respond with the newly created task, a success status, and a success message
    res.status(201).json({ 
      task, 
      status: true, 
      msg: "Task created successfully" 
    });
  } catch (err) {
    next(err); // Pass any errors to the error-handling middleware
  }
};

// Controller for updating a task's status
exports.putTask = async (req, res, next) => {
  try {
    // Destructure the new status from the request body
    const { status } = req.body;
    
    // Ensure the status is provided
    if (!status) {
      throw new BadRequestError("Status is required"); // Throw an error if status is missing
    }

    // Validate the task ID format in the request parameters
    if (!validateObjectId(req.params.taskId)) {
      throw new BadRequestError("Invalid task ID format"); // Throw an error if the ID is invalid
    }

    // Find the task by ID and update its status
    const task = await Task.findOneAndUpdate(
      { _id: req.params.taskId, user: req.user.id },
      { status },
      { new: true, runValidators: true } // Return the updated task and validate the new status
    );

    if (!task) {
      throw new NotFoundError("Task not found or unauthorized"); // Throw an error if the task is not found or doesn't belong to the user
    }

    // Respond with the updated task, a success status, and a success message
    res.status(200).json({ 
      task, 
      status: true, 
      msg: "Task updated successfully" 
    });
  } catch (err) {
    next(err); // Pass any errors to the error-handling middleware
  }
};

// Controller for deleting a task
exports.deleteTask = async (req, res, next) => {
  try {
    // Validate the task ID format in the request parameters
    if (!validateObjectId(req.params.taskId)) {
      throw new BadRequestError("Invalid task ID format"); // Throw an error if the ID is invalid
    }

    // Delete the task by ID, ensuring it belongs to the logged-in user
    const task = await Task.findOneAndDelete({ 
      _id: req.params.taskId, 
      user: req.user.id 
    });

    if (!task) {
      throw new NotFoundError("Task not found or unauthorized"); // Throw an error if the task is not found or doesn't belong to the user
    }

    // Respond with a success status and a message confirming deletion
    res.status(200).json({ 
      status: true, 
      msg: "Task deleted successfully" 
    });
  } catch (err) {
    next(err); // Pass any errors to the error-handling middleware
  }
};
