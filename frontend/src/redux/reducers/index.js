import { combineReducers } from "redux"; // Importing the function to combine multiple reducers.
import authReducer from "./authReducer"; // Importing the authReducer which handles the authentication-related state.

const rootReducer = combineReducers({
  // Combining all individual reducers into one root reducer.
  authReducer, // Adding the authReducer to handle the authentication part of the state.
});

export default rootReducer; // Exporting the combined rootReducer, which will be used by the Redux store.
