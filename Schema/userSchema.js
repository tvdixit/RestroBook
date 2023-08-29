const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        // required: true,
    },
    email: {
        type: String,
        // required: true,
    },
    phone_no :{
        type: String,
        // required:true
    },
    address :{
        type: String,
        // required:true
    },
    password: {
        type: String,
        // required: true,
    },
    confirm_password: {
        type: String,
        // required: true,
    },
    otp: {
        type: String,
    },
    
},{timestamps: true },);

module.exports =mongoose.model('User', UserSchema)