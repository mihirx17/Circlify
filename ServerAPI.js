const express = require('express');
const router = express.Router();
const Employee_Details = require('./userdetails');
const LoginInformation = require('./login');
const Register = require('./register');



router.get('/employees', (req, res) => {
    Employee_Details.find().lean() // Retrieve all employees from the database
        .then((employees) => res.json(employees))
        .catch((error) => {
            console.error(`[${new Date().toISOString()}] Error: ${error.message}`);
            res.status(500).json({ error: error.message });
        });
});

router.post('/addemployee', (req, res) => {
    // Use 'new Employee_Details()' to create an instance of the Employee model
    const newEmployee = new Employee_Details({
        name: req.body.name,
        age: req.body.age,
        psnumber: req.body.psnumber,
        position: req.body.position, // Added position
        department: req.body.department, // Added department
        salary: req.body.salary // Added salary
    });

    newEmployee.save() // Save the new employee to the database
        .then(() => res.json({ message: 'Employee added successfully' }))
        .catch((error) => {
            console.error(`[${new Date().toISOString()}] Error: ${error.message}`);
            res.status(400).json({ error: error.message });
        });
});

 router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Find a user by email in the database
    Register.findOne({ email: email }).lean()
        .then(user => {
            if (!user) {
                // If no user is found with the given email
                return res.json({ message: 'User not found' });
            }

            if (user.password !== password) {
                // If the password does not match the stored password
                return res.json({ message: 'Incorrect password' });
            }

            // If the user is found and the password matches
            return res.json({ message: 'Login successful' });
        })
        .catch((error) => {
            console.error(`[${new Date().toISOString()}] Error: ${error.message}`);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});
router.post('/register', (req, res) => {
    const { username, email, password, birthdate, phone } = req.body;
    Register.findOne({  email: email }).lean().then(user => {
        if (user) {
            return res.json({ message: 'User already exists' });
        }
        const newUser = new Register({
            username: username,
            email: email,
            password: password,
            birthdate: birthdate,
            phone: phone
        });
        newUser.save()
            .then(() => res.json({ message: 'User registered successfully' }))
            .catch((error) => {
                console.error(`[${new Date().toISOString()}] Error: ${error.message}`);
                res.status(400).json({ error: error.message });
            });
    });
});




module.exports = router; // Export the router