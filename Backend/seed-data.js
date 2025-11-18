// Simple Node.js script to seed database with sample data
const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => console.log("Connected to database!"))
  .catch(err => console.error("Database connection error:", err));

// Define schemas (simplified)
const userSchema = new mongoose.Schema({
  auth0Id: String,
  email: String,
  name: String,
  addressLine1: String,
  city: String,
  country: String
});

const menuItemSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    default: () => new mongoose.Types.ObjectId(),
  },
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

const restaurantSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  restaurantName: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  deliveryPrice: { type: Number, required: true },
  estimatedDeliveryTime: { type: Number, required: true },
  cuisines: [{ type: String, required: true }],
  menuItems: [menuItemSchema],
  imageUrl: { type: String, required: true },
  lastUpdated: { type: Date, required: true },
});

const User = mongoose.model("User", userSchema);
const Restaurant = mongoose.model("Restaurant", restaurantSchema);

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Restaurant.deleteMany({});
    console.log("Cleared existing data");

    // Create sample users
    const users = await User.insertMany([
      {
        _id: new mongoose.Types.ObjectId(),
        auth0Id: "auth0|user1",
        email: "owner1@example.com",
        name: "John Smith",
        addressLine1: "123 Main St",
        city: "London",
        country: "UK"
      },
      {
        _id: new mongoose.Types.ObjectId(),
        auth0Id: "auth0|user2",
        email: "owner2@example.com",
        name: "Maria Garcia",
        addressLine1: "456 Oak Ave",
        city: "Manchester",
        country: "UK"
      },
      {
        _id: new mongoose.Types.ObjectId(),
        auth0Id: "auth0|user3",
        email: "owner3@example.com",
        name: "Ahmed Hassan",
        addressLine1: "789 Pine Rd",
        city: "Birmingham",
        country: "UK"
      }
    ]);

    console.log("Inserted users:", users.length);

    // Create restaurants
    const restaurants = [
      {
        user: users[0]._id,
        restaurantName: "Bella Italia",
        city: "London",
        country: "UK",
        deliveryPrice: 299,
        estimatedDeliveryTime: 30,
        cuisines: ["Italian", "Pizza", "Pasta"],
        menuItems: [
          { name: "Margherita Pizza", price: 1299 },
          { name: "Spaghetti Carbonara", price: 1499 },
          { name: "Caesar Salad", price: 899 }
        ],
        imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800",
        lastUpdated: new Date()
      },
      {
        user: users[1]._id,
        restaurantName: "Spice Garden",
        city: "Manchester",
        country: "UK",
        deliveryPrice: 199,
        estimatedDeliveryTime: 25,
        cuisines: ["Indian", "Curry", "Vegetarian"],
        menuItems: [
          { name: "Chicken Tikka Masala", price: 1399 },
          { name: "Lamb Biryani", price: 1599 },
          { name: "Palak Paneer", price: 1199 }
        ],
        imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800",
        lastUpdated: new Date()
      },
      {
        user: users[2]._id,
        restaurantName: "Tokyo Express",
        city: "Birmingham",
        country: "UK",
        deliveryPrice: 349,
        estimatedDeliveryTime: 35,
        cuisines: ["Japanese", "Sushi", "Asian"],
        menuItems: [
          { name: "Salmon Sushi Roll", price: 1099 },
          { name: "Chicken Teriyaki", price: 1299 },
          { name: "Vegetable Ramen", price: 999 }
        ],
        imageUrl: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800",
        lastUpdated: new Date()
      },
      {
        user: users[0]._id,
        restaurantName: "Burger Palace",
        city: "London",
        country: "UK",
        deliveryPrice: 249,
        estimatedDeliveryTime: 20,
        cuisines: ["American", "Burgers", "Fast Food"],
        menuItems: [
          { name: "Classic Cheeseburger", price: 899 },
          { name: "Bacon Deluxe Burger", price: 1199 },
          { name: "Sweet Potato Fries", price: 549 }
        ],
        imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
        lastUpdated: new Date()
      },
      {
        user: users[1]._id,
        restaurantName: "Mediterranean Delight",
        city: "Manchester",
        country: "UK",
        deliveryPrice: 299,
        estimatedDeliveryTime: 28,
        cuisines: ["Mediterranean", "Greek", "Healthy"],
        menuItems: [
          { name: "Greek Gyros", price: 999 },
          { name: "Falafel Wrap", price: 849 },
          { name: "Hummus Platter", price: 699 }
        ],
        imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800",
        lastUpdated: new Date()
      },
      {
        user: users[2]._id,
        restaurantName: "Pizza Corner",
        city: "Birmingham",
        country: "UK",
        deliveryPrice: 249,
        estimatedDeliveryTime: 25,
        cuisines: ["Italian", "Pizza", "Comfort Food"],
        menuItems: [
          { name: "Pepperoni Pizza", price: 1399 },
          { name: "Quattro Stagioni", price: 1599 },
          { name: "Garlic Bread", price: 499 }
        ],
        imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800",
        lastUpdated: new Date()
      }
    ];

    const insertedRestaurants = await Restaurant.insertMany(restaurants);
    console.log("Inserted restaurants:", insertedRestaurants.length);

    console.log("Database seeded successfully!");
    console.log("Total users:", await User.countDocuments());
    console.log("Total restaurants:", await Restaurant.countDocuments());
    
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedData();