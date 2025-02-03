import api from "../../api" // Importing the API instance for making HTTP requests
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, SAVE_PROFILE } from "./actionTypes" // Action types to update the state
import { toast } from "react-toastify"; // Toast notifications to provide feedback to users

// Action to handle the login request
export const postLoginData = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST }); // Dispatch LOGIN_REQUEST to set loading state
    const { data } = await api.post('/auth/login', { email, password }); // Sending login data to the server
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data, // On successful login, save the returned data to the store
    });
    localStorage.setItem('token', data.token); // Save the token in local storage for future requests
    toast.success(data.msg); // Show a success toast notification with the message from the server
  } catch (error) {
    // If an error occurs, handle it
    const msg = error.response?.data?.msg || error.message; // Check if there's a specific message from the server, else fallback to the error message
    dispatch({
      type: LOGIN_FAILURE,
      payload: { msg }, // Dispatch failure action with the error message
    });
    toast.error(msg); // Show an error toast notification with the error message
  }
}

// Action to save the profile data after login or token verification
export const saveProfile = (token) => async (dispatch) => {
  try {
    const { data } = await api.get('/profile', { 
      headers: { Authorization: token } // Passing the token to authenticate the request
    });
    dispatch({
      type: SAVE_PROFILE,
      payload: { user: data.user, token }, // Save the user profile and token in the store
    });
  } catch (error) {
    // If fetching the profile fails, you could log the error here or show a notification
    // console.log(error); // (Optional) Uncomment for debugging purposes
  }
}

// Action to log the user out
export const logout = () => (dispatch) => {
  localStorage.removeItem('token'); // Remove the token from local storage upon logout
  dispatch({ type: LOGOUT }); // Dispatch LOGOUT action to update the state and clear user data
  document.location.href = '/'; // Redirect the user to the homepage (or login page)
}
