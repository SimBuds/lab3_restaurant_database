const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: String,
  city: String,
  cuisines: [String],
  restaurant_id: String
}, { timestamps: true });

module.exports = mongoose.model('Restaurant', restaurantSchema);