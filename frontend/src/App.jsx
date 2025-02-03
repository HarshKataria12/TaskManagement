import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Task from "./pages/Task";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { saveProfile } from "./redux/actions/authActions";
import NotFound from "./pages/NotFound";

function App() {

  // Accessing the authentication state from the Redux store
  const authState = useSelector(state => state.authReducer);
  const dispatch = useDispatch();

  // Effect hook to load the user profile when a token is present in localStorage
  useEffect(() => {
    // Get the token from localStorage
    const token = localStorage.getItem("token");

    // If no token exists, no need to load the profile
    if (!token) return;

    // Dispatch action to save user profile in the Redux store
    dispatch(saveProfile(token));
  }, [authState.isLoggedIn, dispatch]); // Dependency array includes `authState.isLoggedIn` to trigger re-fetching when the login status changes

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public route: Home page */}
          <Route path="/" element={<Home />} />
          
          {/* Route to Signup page; if user is logged in, redirect to home */}
          <Route path="/signup" element={authState.isLoggedIn ? <Navigate to="/" /> : <Signup />} />
          
          {/* Route to Login page */}
          <Route path="/login" element={<Login />} />
          
          {/* Protected route for adding new tasks; if not logged in, redirect to login page */}
          <Route 
            path="/tasks/add" 
            element={authState.isLoggedIn ? <Task /> : <Navigate to="/login" state={{ redirectUrl: "/tasks/add" }} />} 
          />
          
          {/* Protected route for editing tasks; if not logged in, redirect to login page */}
          <Route 
            path="/tasks/:taskId" 
            element={authState.isLoggedIn ? <Task /> : <Navigate to="/login" state={{ redirectUrl: window.location.pathname }} />} 
          />
          
          {/* Catch-all route for undefined paths, displaying Not Found page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
