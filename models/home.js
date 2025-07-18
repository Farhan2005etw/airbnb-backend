const mongoose = require("mongoose");


const homeSchema = mongoose.Schema({
  houseName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  photo: {
    type : String
  },
  description: {
    type: String
    }
});


// homeSchema.pre('findOneAndDelete', async function(next) {
//   console.log('Cam to Delete home with pre Hook')
//   const homeId = this.getQuery()._id;
//   await favourite.deleteMany({houseId : homeId});
//   next();
// })


module.exports = mongoose.model('Home', homeSchema)





