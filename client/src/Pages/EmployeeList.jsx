import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  useEffect(() => {
    axios.get("http://localhost:5000/api/employees")
      .then((response) => {
        setEmployees(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the employees!", error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    // This should make a delete request to your API
    console.log(id)
    axios.delete(`http://localhost:5000/api/employees/${id}`)
      .then((response) => {
        setEmployees(employees.filter(employee => employee.employee_id !== id));
      })
      .catch((error) => {
        console.error("Error deleting employee", error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleaddnewemployee = () => {
    navigate("/employees/add")
  }
  

  return (
    <div className=" py-20 bg-white flex justify-center items-center">
      <div className="w-full max-w-7xl px-6">
        <div className="flex justify-between mb-10">
          <h1 className=" text-2xl  text-green-500 font-bold all relative">All Employees</h1>
          <button className=" bg-green-500 py-2 rounded-md px-4 hover:bg-green-600 ease-in-out duration-300" onClick={handleaddnewemployee}>add new employee</button>
          
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees.map((employee) => (
            <motion.div
              key={employee.employee_id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-center mb-4">
                <div className=" flex justify-between">
                <h2 className="text-xl font-bold capitalize text-blue-600 ">{employee.name}</h2>
                <Link to={`/employees/edit/${employee._id}`}><AiOutlineEdit /></Link>
                </div>
                
                <p className="text-gray-600">---------{employee.position}------------</p>
              </div>
              <p className="text-sm text-gray-500 mb-2">Email: {employee.email}</p>
              <p className="text-sm text-gray-500 mb-2">Department: {employee.department}</p>
              <p className="text-sm text-gray-500 mb-2">Phone: {employee.phone}</p>
              <p className="text-sm text-gray-500 mb-4">Address: {employee.address}</p>

              <div className=" flex justify-between">

                <button
                  onClick={() => handleDelete(employee._id)}
                  className="text-red-600 hover:bg-red-600 hover:text-white transition-colors duration-300 flex items-center justify-center space-x-2 w-full py-2 rounded-lg border-2 border-red-600"
                >
                  <AiOutlineDelete />
                  <span>Delete</span>
                </button>

                
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
