import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Task from './pages/Task';
import TaskDetail from './pages/TaskDetail';
import Team from './pages/Team';


function Layout() {
  const user = ""; // Replace with actual authentication logic (e.g., from a context or state)
  const location = useLocation();

  return user ? (
    <div className="w-full h-screen flex flex-col md:flex-row">
      {/* Sidebar for large screens */}
      <div className="w-1/5 h-screen bg-white sticky top-0 hidden md:block">
        {/* <Sidebar /> Uncomment and add Sidebar component */}
      </div>

      {/* Mobile sidebar for smaller screens */}
      {/* <MobileSidebar /> Uncomment and add MobileSidebar component */}

      <div className="flex-1 overflow-y-auto">
        {/* <Navbar /> Uncomment and add Navbar component */}
        <div className="p-4 2xl:px-18">
          <Outlet /> {/* Renders child routes */}
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace /> /* Redirect to login if not authenticated */
  );
}


function App() {
  return (
    <main className="min-h-screen w-full bg-[#ADD8E6]"> {/* Changed background color */}
    <Router>
      <Routes>
        {/* Protected Routes (e.g., wrapped with Layout) */}
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/tasks" element={<Task />} />
          <Route path="/tasks/:status" element={<Tasks />} /> {/* Simplify the tasks routes */}
          <Route path="/tasks/:id" element={<TaskDetail />} />
          <Route path="/team" element={<Team />} />
        </Route>

        {/* Public Route */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  </main>
  );
}

export default App;