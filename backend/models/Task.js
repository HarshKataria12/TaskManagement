const mongoose = require("mongoose"); // Importing mongoose to define the schema

// Defining the Task schema
const taskSchema = new mongoose.Schema({
  // The user associated with the task (links to the User model)
  user: {
    type: mongoose.Schema.Types.ObjectId, // This is an ObjectId referring to the User model
    ref: "User", // This is a reference to the User model
    required: true, // Every task must be associated with a user
  },
  
  // The title of the task
  title: {
    type: String, // The title will be a string
    required: true, // Title is a required field
  },
  
  // The description of the task
  description: {
    type: String, // The description will be a string
    required: true, // Description is also required
  },

  // Priority of the task (can be high, medium, or low)
  priority: {
    type: String, // This will be a string representing priority
    enum: ["high", "medium", "low"], // Only these three values are allowed
    default: "medium", // Default priority will be "medium" if not specified
  },

  // Status of the task (can be todo, inprogress, or complete)
  status: {
    type: String, // Status is a string
    enum: ["todo", "inprogress", "complete"], // Only these three status values are allowed
    default: "todo", // Default status is "todo"
  },

  // The due date for the task
  dueDate: {
    type: Date, // Due date is stored as a Date
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields to the task
});

// Create a mongoose model based on the task schema
const Task = mongoose.model("Task", taskSchema);

// Export the Task model to be used in other parts of the application
module.exports = Task;
