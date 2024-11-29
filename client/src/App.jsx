import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import EmployeeList from "./Pages/EmployeeList";
import EmployeeForm from "./Pages/EmployeeForm";
import Login from "./Pages/LoginPage";
import NotFound from "./Pages/NotFound";
import UpdateEmployee from "./Pages/UpdateEmployee";
import ProfilePage from './Pages/ProfilePage'
import EditAdminProfile from "./Pages/EditAdminProfile";
import Homepage from "./Homepage";

const App = () => {
  
  return (
    <>
      {
        localStorage.getItem("authToken")?
        <div className="flex">
      {/* <Sidebar /> */}
      <div className="flex-1">
        <Navbar />
        <div className="p-4">
        <Routes>
        
            <Route path="/" element={<Homepage />} />
            <Route path="/employees" element={<EmployeeList />} />
            <Route path="/employees/add" element={<EmployeeForm />} />
            <Route path="/employees/edit/:id" element={<UpdateEmployee />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/edit/:id" element={<EditAdminProfile/>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
      </div>
      :
      <Login />
    }
    </>
      
    );
};

export default App;
