import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import api from "../api"; // API utility for making requests

const useFetch = () => {

  // State to manage the loading, data, success message, and error message
  const [state, setState] = useState({
    loading: false, // To track if a request is in progress
    data: null, // Store the response data once the request succeeds
    successMsg: "", // Success message to display (if any)
    errorMsg: "", // Error message to display (if any)
  });

  // The function that makes the API request
  const fetchData = useCallback(async (config, otherOptions) => {
    const { showSuccessToast = true, showErrorToast = true } = otherOptions || {};
    // Set loading to true when the request starts
    setState(state => ({ ...state, loading: true }));

    try {
      // Make the API request using the provided configuration
      const { data } = await api.request(config);

      // Update the state with the received data, clear the error message, and set the success message
      setState({
        loading: false,
        data,
        successMsg: data.msg || "success", // If no success message in the response, set a default one
        errorMsg: "" // Reset any error message
      });

      // Optionally show a success toast
      if (showSuccessToast) toast.success(data.msg);
      return Promise.resolve(data); // Resolve with the response data
    }
    catch (error) {
      // In case of an error, extract the message from the error response or fallback to a default message
      const msg = error.response?.data?.msg || error.message || "error";
      // Update the state with the error details
      setState({
        loading: false,
        data: null, // Reset data on error
        errorMsg: msg,
        successMsg: "" // Clear any success message
      });

      // show an error toast
      if (showErrorToast) toast.error(msg);
      return Promise.reject(); // Reject the promise, indicating an error
    }
  }, []); // The empty dependency array means this function is memoized and won't change unless necessary

  return [fetchData, state]; // Return both the fetchData function and the current state (loading, data, success, error)
}

export default useFetch;
