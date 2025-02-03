// Define a custom base error class to extend from
class CustomAPIError extends Error {
    constructor(message, statusCode) {
      super(message); // Call the parent constructor (Error) with the message
      this.statusCode = statusCode; // Assign a custom status code to the error
    }
  }
  
  // Define a custom error class for "BadRequest" errors (status code 400)
  class BadRequestError extends CustomAPIError {
    constructor(message = "Bad Request") {
      super(message, 400); // Pass the default message and status code 400 to the parent class
    }
  }
  
  // Define a custom error class for "NotFound" errors (status code 404)
  class NotFoundError extends CustomAPIError {
    constructor(message = "Not Found") {
      super(message, 404); // Pass the default message and status code 404 to the parent class
    }
  }
  
  // Export the custom error classes to use them in other parts of the application
  module.exports = {
    CustomAPIError,
    BadRequestError,
    NotFoundError,
  };
  