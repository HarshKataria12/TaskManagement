import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, SAVE_PROFILE } from "../actions/actionTypes";

// Setting up the initial state. This is where we define how things should look when the app first loads.
const initialState = {
  loading: false, // Is something loading? We use this to show loading spinners, etc.
  user: {}, // Here we store the user data once they’ve logged in.
  isLoggedIn: false, // Tracks whether the user is logged in or not.
  token: "", // Stores the token that lets us authenticate future requests.
  successMsg: "", // Any success messages we want to show (like a login success message).
  errorMsg: "", // Any error messages we need to show (like login failure).
};

// The reducer is the brain of managing authentication-related state. It listens for specific actions and updates the state accordingly.
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { 
        loading: true, // We’re waiting for the login request to finish, so we show a loading state.
        user: {}, // No user yet, they’re trying to log in.
        isLoggedIn: false, // They’re not logged in yet.
        token: "", // No token yet.
        successMsg: "", // No success message yet.
        errorMsg: "", // No error message yet.
      };

    case LOGIN_SUCCESS:
      return { 
        loading: false, // Login request finished, so we stop showing the loading spinner.
        user: action.payload.user, // Now that the login is successful, we save the user info.
        isLoggedIn: true, // The user is successfully logged in!
        token: action.payload.token, // We save the authentication token to use in future requests.
        successMsg: action.payload.msg, // Display a success message from the server (like "Welcome back!").
        errorMsg: "", // No error here, since the login was successful.
      };

    case LOGIN_FAILURE:
      return { 
        loading: false, // No longer loading.
        user: {}, // No user data because the login failed.
        isLoggedIn: false, // Still not logged in.
        token: "", // No token since login failed.
        successMsg: "", // No success message.
        errorMsg: action.payload.msg, // Show the error message from the server (like "Invalid email or password").
      };

    case LOGOUT:
      return { 
        loading: false, // No more loading.
        user: {}, // Remove user info since they logged out.
        isLoggedIn: false, // They’re logged out.
        token: "", // No token since the session is over.
        successMsg: "", // No success message for logout.
        errorMsg: "", // No error message for logout.
      };

    case SAVE_PROFILE:
      return { 
        loading: false, // Done loading after saving the profile.
        user: action.payload.user, // Store the profile data of the logged-in user.
        isLoggedIn: true, // User is logged in.
        token: action.payload.token, // Save the token for future authentication.
        successMsg: "", // No specific success message.
        errorMsg: "", // No error message.
      };

    // If none of the above cases match, just return the current state (unchanged).
    default:
      return state;
  }
}

export default authReducer;
