const Restaurant = require('./Restaurant');

const seedRestaurants = [
  {
    name: "North of Brooklyn Pizzeria",
    city: "Brooklyn",
    cuisines: ["Italian", "Contemporary"],
    restaurant_id: "1001"
  },
  {
    name: "JP Sushi",
    city: "Toronto",
    cuisines: ["Japanese", "Sushi"],
    restaurant_id: "1002"
  },
  {
    name: "The Burger's Priest",
    city: "Toronto",
    cuisines: ["American", "Delicatessen"],
    restaurant_id: "1003"
  },
  {
    name: "Korean Grill House",
    city: "Toronto",
    cuisines: ["Korean", "BBQ"],
    restaurant_id: "1004"
  }
];

const seedDB = async () => {
  const restaurantCount = await Restaurant.countDocuments();
  if (restaurantCount === 0) {
    await Restaurant.insertMany(seedRestaurants);
    console.log('Database seeded!');
  }
};

module.exports = seedDB;