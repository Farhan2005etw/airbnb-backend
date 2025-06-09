const mongoose = require("mongoose");


const bookingsSchema = mongoose.Schema({

    homeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Home'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }
});


module.exports = mongoose.model('Bookings', bookingsSchema)