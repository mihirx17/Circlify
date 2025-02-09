const mongoose=require('mongoose');
const loginSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});
const logininformation = mongoose.model('login_logs', loginSchema);
module.exports = logininformation;
