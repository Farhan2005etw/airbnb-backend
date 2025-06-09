const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First Name is Required'] 
    },
     lastName: {
        type: String,       
    },
    email: {
        type: String,
        required: [true, 'Email is Required'],
        unique: true 
    },
    password: {
        type: String,
        required: [true, 'Password is Required'] 
    },
    userType: {
        type: String,
        enum: ['guest', 'host'],
        required: [true, 'User Type is Required'] 
    },
    favourites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Home'
    }],
    Bookings: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Home'
    }]
});



module.exports = mongoose.model('User', userSchema)





