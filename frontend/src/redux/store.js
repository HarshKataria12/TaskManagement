import { applyMiddleware, createStore, compose } from "redux"; // Importing essential Redux functions
import thunk from "redux-thunk"; // Importing redux-thunk middleware for handling asynchronous actions
import rootReducer from "./reducers"; // Importing the combined reducers that manage the state

const middleware = [thunk]; // Adding redux-thunk middleware to allow dispatching async actions (like API calls)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 
// This ensures that we can use Redux DevTools if available, or fall back to the standard compose function.

const store = createStore(rootReducer, 
  composeEnhancers(applyMiddleware(...middleware)) 
  // Creating the Redux store, applying middleware (like redux-thunk), 
  // and integrating Redux DevTools if available.
);

export default store; // Exporting the store so it can be used in the app
