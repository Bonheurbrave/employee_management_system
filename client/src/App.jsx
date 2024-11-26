import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
// Pages
import Dashboard from './Pages/Dashboard';
import EmployeeList from "./Pages/EmployeeList";
import EmployeeForm from "./Pages/EmployeeForm";
import DepartmentList from "./Pages/DepartmentList";
import LeaveRequests from './Pages/LeaveRequestForm'
import Profile from './Pages/ProfilePage'
import Login from "./Pages/LoginPage";
import Register from "./Pages/RegisterPage";
import NotFound from "./Pages/NotFound";
import AttendancePage from "./Pages/Attendance";

const App = () => {
  return (
    
      <div className="flex">
        {/* <Sidebar /> */}
        <div className="flex-1">
          <Navbar />
          <div className="p-4">
            <Routes>
              {/* Dashboard */}
              {/* <Route path="/" element={<Dashboard />} /> */}

              {/* Employee Management */}
              <Route path="/employees" element={<EmployeeList />} />
              <Route path="/employees/add" element={<EmployeeForm />} />
              <Route path="/employees/edit/:id" element={<EmployeeForm />} />

              {/* Department Management */}
              <Route path="/departments" element={<DepartmentList />} />

              {/* Leave Requests */}
              <Route path="/leave-requests" element={<LeaveRequests />} />

              {/* Attendance Tracking */}
              <Route path="/attendance" element={<AttendancePage />} />

              {/* Profile Management */}
              <Route path="/profile" element={<Profile />} />

              {/* Authentication */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Error Pages */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    
  );
};

export default App;
