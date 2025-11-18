// Quick script to check what's in the database
const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => console.log("Connected to database!"))
  .catch(err => console.error("Database connection error:", err));

// Simple restaurant schema for checking
const restaurantSchema = new mongoose.Schema({}, { strict: false });
const Restaurant = mongoose.model("Restaurant", restaurantSchema);

const checkDatabase = async () => {
  try {
    console.log("\n=== DATABASE CHECK ===");
    
    // Count total restaurants
    const totalCount = await Restaurant.countDocuments();
    console.log(`Total restaurants in database: ${totalCount}`);
    
    if (totalCount === 0) {
      console.log("❌ No restaurants found in database!");
      return;
    }
    
    // Get all restaurants
    const restaurants = await Restaurant.find({}).lean();
    
    console.log("\n=== RESTAURANTS BY CITY ===");
    const cityCounts = {};
    restaurants.forEach(restaurant => {
      const city = restaurant.city;
      cityCounts[city] = (cityCounts[city] || 0) + 1;
    });
    
    Object.entries(cityCounts).forEach(([city, count]) => {
      console.log(`${city}: ${count} restaurants`);
    });
    
    console.log("\n=== SAMPLE RESTAURANTS ===");
    restaurants.slice(0, 3).forEach((restaurant, index) => {
      console.log(`${index + 1}. ${restaurant.restaurantName} (${restaurant.city})`);
      console.log(`   Cuisines: ${restaurant.cuisines?.join(', ') || 'None'}`);
    });
    
    // Test search for London
    console.log("\n=== TESTING LONDON SEARCH ===");
    const londonQuery = { city: new RegExp('london', 'i') };
    const londonRestaurants = await Restaurant.find(londonQuery).lean();
    console.log(`Restaurants in London: ${londonRestaurants.length}`);
    
    londonRestaurants.forEach(restaurant => {
      console.log(`- ${restaurant.restaurantName}`);
    });
    
  } catch (error) {
    console.error("Error checking database:", error);
  } finally {
    mongoose.connection.close();
  }
};

checkDatabase();