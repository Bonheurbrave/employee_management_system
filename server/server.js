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
    phone:{type:String , required:true , unique:true},
    address:{type:String }
});

const attendanceSchema = new mongoose.Schema({
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ['Present', 'Absent', 'On Leave'], required: true },
});

const leaveRequestSchema = new mongoose.Schema({
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    reason: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
});

// Models
const Admin = mongoose.model('Admin', adminSchema);
const Employee = mongoose.model('Employee', employeeSchema);
const Attendance = mongoose.model('Attendance', attendanceSchema);
const LeaveRequest = mongoose.model('LeaveRequest', leaveRequestSchema);

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
    const { username,email,  password } = req.body;

    const existingAdmin = await Admin.findOne({ username });
    const existingEmail = await Admin.findOne({ email });
    if (existingAdmin || existingEmail) return res.status(400).json({ message: 'Admin already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ username, email , password: hashedPassword });
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
app.post('/api/employees', authenticate, async (req, res) => {
    res.send(req.body)
    const { name, email, position, department } = req.body;
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) return res.status(400).json({ message: 'Employee already exists' });

    const employee = new Employee({ name, email, position, department });
    await employee.save();
    res.status(201).json(employee);
});

// List all employees
app.get('/api/employees', authenticate, async (req, res) => {
    const employees = await Employee.find();
    res.json(employees);
});

// Edit employee details
app.put('/api/employees/:id', authenticate, async (req, res) => {
    const { name, email, position, department } = req.body;

    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    employee.name = name || employee.name;
    employee.email = email || employee.email;
    employee.position = position || employee.position;
    employee.department = department || employee.department;
    await employee.save();

    res.json(employee);
});

// Record attendance
app.post('/api/attendance', authenticate, async (req, res) => {
    const { employeeId, date, status } = req.body;

    const attendance = new Attendance({ employeeId, date, status });
    await attendance.save();

    res.status(201).json(attendance);
});

// Submit leave request
app.post('/api/leaves', authenticate, async (req, res) => {
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

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
