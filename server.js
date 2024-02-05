const express = require('express');
const mongoose = require('mongoose');
const Restaurant = require('./Restaurant');
const seedDB = require('./seed');
const app = express();
const port = 3000;

app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/restaurant', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  seedDB();
}).catch(err => console.error('Could not connect to MongoDB', err));

// Route to get all restaurants
app.get('/restaurants', async (req, res) => {
  try {
    const sortBy = req.query.sortBy === 'DESC' ? -1 : 1;
    const restaurants = await Restaurant.find({}).sort({restaurant_id: sortBy});
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: "Error fetching restaurants", error: error.message });
  }
});

// Route to get restaurants by cuisine
app.get('/restaurants/cuisine/:cuisine', async (req, res) => {
  try {
    const restaurants = await Restaurant.find({ cuisines: req.params.cuisine });
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: `Error fetching restaurants with cuisine ${req.params.cuisine}`, error: error.message });
  }
});

app.get('/restaurants/Delicatessen', async (req, res) => {
    try {
      const restaurants = await Restaurant.find({
        cuisines: "Delicatessen",
        city: { $ne: "Brooklyn" }
      }, { _id: 0, cuisines: 1, name: 1, city: 1 }) // Exclude _id, include cuisines, name, and city
      .sort({ name: 1 }); // Sort by name in ascending order
  
      res.json(restaurants);
    } catch (error) {
      res.status(500).json({ message: "Error fetching Delicatessen restaurants not in Brooklyn", error: error.message });
    }
  });
  
// Error handling for unsupported routes
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
