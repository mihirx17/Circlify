const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    birthdate: { // Corrected the typo here
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
});

const Register = mongoose.model('Register', registerSchema);
module.exports = Register;
