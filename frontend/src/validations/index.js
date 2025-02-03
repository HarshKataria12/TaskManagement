// Function to validate an email address using regular expressions
const isValidEmail = (email) => {
  return String(email)
    .toLowerCase() // Convert email to lowercase to ensure case-insensitive validation
    .match(
      // Regular expression to match valid email format
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

// Main validation function to validate individual form fields
export const validate = (group, name, value) => {
  
  // Validation for the "signup" form
  if (group === "signup") {
    switch (name) {
      case "name": {
        if (!value) return "This field is required"; // Name is required
        return null; // If no error, return null
      }
      case "email": {
        if (!value) return "This field is required"; // Email is required
        if (!isValidEmail(value)) return "Please enter valid email address"; // Validate email format
        return null; // If no error, return null
      }
      case "password": {
        if (!value) return "This field is required"; // Password is required
        if (value.length < 4) return "Password should be at least 4 chars long"; // Check password length
        return null; // If no error, return null
      }
      default: return null; // If no validation rules for this field, return null
    }
  }

  // Validation for the "login" form
  else if (group === "login") {
    switch (name) {
      case "email": {
        if (!value) return "This field is required"; // Email is required
        if (!isValidEmail(value)) return "Please enter valid email address"; // Validate email format
        return null; // If no error, return null
      }
      case "password": {
        if (!value) return "This field is required"; // Password is required
        return null; // If no error, return null
      }
      default: return null; // If no validation rules for this field, return null
    }
  }

  // Validation for the "task" form
  else if (group === "task") {
    switch (name) {
      case "description": {
        if (!value) return "This field is required"; // Description is required
        if (value.length > 100) return "Max. limit is 100 characters."; // Description cannot exceed 100 characters
        return null; // If no error, return null
      }
      default: return null; // If no validation rules for this field, return null
    }
  }

  // Return null if no validation group matches
  else {
    return null;
  }
}

// Function to validate multiple fields at once
const validateManyFields = (group, list) => {
  const errors = []; // Array to hold errors

  // Loop through each field in the list and validate it
  for (const field in list) {
    const err = validate(group, field, list[field]); // Validate the field
    if (err) errors.push({ field, err }); // If there is an error, add it to the errors array
  }

  return errors; // Return all the errors
}

export default validateManyFields; // Export the function for use in other parts of the app
