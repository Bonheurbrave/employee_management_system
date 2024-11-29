const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require("cors")
// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors())

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Schemas
const adminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },

});

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    position: { type: String, required: true },
    department: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    address: { type: String }
});
// Models
const Admin = mongoose.model('Admin', adminSchema);
const Employee = mongoose.model('Employee', employeeSchema);
// Middleware for authentication
const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = await Admin.findById(decoded.id);
        if (!req.admin) throw new Error();
        next();
    } catch {
        res.status(401).json({ message: 'Invalid token' });
    }
};

// Routes

// Admin registration
app.post('/api/admin/register', async (req, res) => {
    const { username, email, password } = req.body;

    const existingAdmin = await Admin.findOne({ username });
    const existingEmail = await Admin.findOne({ email });
    if (existingAdmin || existingEmail) return res.status(400).json({ message: 'Admin already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ username, email, password: hashedPassword });
    await admin.save();

    res.status(201).json({ message: 'Admin registered successfully' });
});

// Admin login
app.post('/api/admin/login', async (req, res) => {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin || !(await bcrypt.compare(password, admin.password)))
        return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
});

// Add new employee
app.post('/api/employees', async (req, res) => {
    const { name, email, position, department, phone, address } = req.body;
    const existingEmployee = await Employee.findOne({ email });
    const existingPhone = await Employee.findOne({ phone })
    if (existingEmployee || existingPhone) return res.status(400).json({ message: 'Employee already exists' });
    const employee = new Employee({ name, email, position, department, phone, address });
    await employee.save();
    res.status(201).json(employee);
});

// List all employees
app.get('/api/employees', async (req, res) => {
    const employees = await Employee.find();
    res.json(employees);
});

app.delete("/api/employees/:id", async (req, res) => {
    const id = req.params.id;
    await Employee.deleteOne({ _id: id })
})




// Record attendance
app.post('/api/attendance', authenticate, async (req, res) => {
    const { employeeId, date, status } = req.body;
    const attendance = new Attendance({ employeeId, date, status });
    await attendance.save();
    res.status(201).json(attendance);
});

// Submit leave request
app.post('/api/leaves', async (req, res) => {
    const { employeeId, startDate, endDate, reason } = req.body;
    const leaveRequest = new LeaveRequest({ employeeId, startDate, endDate, reason });
    await leaveRequest.save();

    res.status(201).json(leaveRequest);
});

// Dashboard (summary stats)
app.get('/api/dashboard', authenticate, async (req, res) => {
    const employeeCount = await Employee.countDocuments();
    const leaveCount = await LeaveRequest.countDocuments({ status: 'Pending' });
    const attendanceCount = await Attendance.countDocuments({ status: 'Present' });

    res.json({ employeeCount, leaveCount, attendanceCount });
});

//edit the employee data

// Update employee endpoint
app.put("/employees/:id", async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
  
    try {
      const updatedEmployee = await Employee.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
      );
  
      if (!updatedEmployee) {
        return res.status(404).json({ message: "Employee not found" });
      }
  
      res.json({
        message: "Employee updated successfully",
        employee: updatedEmployee,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "An error occurred", error: err.message });
    }
  });



app.get("/employee/:id", async (req, res) => {
    const id = req.params.id;
    await Employee.findOne({ _id: id }).then((respo) => res.send(respo))
})



app.get('/api/admins', async (req, res) => {
    try {
      
      const admin = await Admin.findOne({});

      if (!admin) {
        return res.status(404).json({ error: 'Admin not found' });
      }

      admin.password = '********';
      res.json(admin);
    } catch (error) {
      console.error('Error fetching admin data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

  app.put('/api/admins/:id', async (req, res) => {
    console.log(req.params.id)
    try {
      const { id } = req.params;
      const { email, username } = req.body; // Add fields you want to update
  
      if (!email || !username) {
        return res.status(400).json({ error: 'Email and username are required' });
      }
  
      const updatedAdmin = await Admin.findOneAndUpdate(
        { _id: id},
        { $set: { email, username } },
        { returnDocument: 'after' }
      );
  
      if (!updatedAdmin.value) {
        return res.status(404).json({ error: 'Successfully done!' });
      }
  
      res.json({ message: 'Admin updated successfully', admin: updatedAdmin.value });
    } catch (error) {
      console.error('Error updating admin data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
