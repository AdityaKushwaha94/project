// MongoDB Shell Script to Insert Sample Restaurant Data
// Run this in MongoDB shell: mongosh your_database_name < sample_restaurant_data.js

// First, let's create some sample users (restaurant owners)
const sampleUsers = [
  {
    _id: ObjectId(),
    auth0Id: "auth0|user1",
    email: "owner1@example.com",
    name: "John Smith",
    addressLine1: "123 Main St",
    city: "London",
    country: "UK"
  },
  {
    _id: ObjectId(),
    auth0Id: "auth0|user2",
    email: "owner2@example.com",
    name: "Maria Garcia",
    addressLine1: "456 Oak Ave",
    city: "Manchester",
    country: "UK"
  },
  {
    _id: ObjectId(),
    auth0Id: "auth0|user3",
    email: "owner3@example.com",
    name: "Ahmed Hassan",
    addressLine1: "789 Pine Rd",
    city: "Birmingham",
    country: "UK"
  },
  {
    _id: ObjectId(),
    auth0Id: "auth0|user4",
    email: "owner4@example.com",
    name: "Sophie Chen",
    addressLine1: "321 Elm St",
    city: "Edinburgh",
    country: "UK"
  },
  {
    _id: ObjectId(),
    auth0Id: "auth0|user5",
    email: "owner5@example.com",
    name: "Raj Patel",
    addressLine1: "654 Maple Dr",
    city: "Glasgow",
    country: "UK"
  }
];

// Insert users first
db.users.insertMany(sampleUsers);

// Now create restaurants with references to these users
const restaurants = [
  {
    user: sampleUsers[0]._id,
    restaurantName: "Bella Italia",
    city: "London",
    country: "UK",
    deliveryPrice: 299, // £2.99 in pence
    estimatedDeliveryTime: 30,
    cuisines: ["Italian", "Pizza", "Pasta"],
    menuItems: [
      {
        _id: ObjectId(),
        name: "Margherita Pizza",
        price: 1299 // £12.99 in pence
      },
      {
        _id: ObjectId(),
        name: "Spaghetti Carbonara",
        price: 1499
      },
      {
        _id: ObjectId(),
        name: "Caesar Salad",
        price: 899
      },
      {
        _id: ObjectId(),
        name: "Tiramisu",
        price: 699
      }
    ],
    imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800",
    lastUpdated: new Date()
  },
  {
    user: sampleUsers[1]._id,
    restaurantName: "Spice Garden",
    city: "Manchester",
    country: "UK",
    deliveryPrice: 199,
    estimatedDeliveryTime: 25,
    cuisines: ["Indian", "Curry", "Vegetarian"],
    menuItems: [
      {
        _id: ObjectId(),
        name: "Chicken Tikka Masala",
        price: 1399
      },
      {
        _id: ObjectId(),
        name: "Lamb Biryani",
        price: 1599
      },
      {
        _id: ObjectId(),
        name: "Palak Paneer",
        price: 1199
      },
      {
        _id: ObjectId(),
        name: "Garlic Naan",
        price: 399
      }
    ],
    imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800",
    lastUpdated: new Date()
  },
  {
    user: sampleUsers[2]._id,
    restaurantName: "Tokyo Express",
    city: "Birmingham",
    country: "UK",
    deliveryPrice: 349,
    estimatedDeliveryTime: 35,
    cuisines: ["Japanese", "Sushi", "Asian"],
    menuItems: [
      {
        _id: ObjectId(),
        name: "Salmon Sushi Roll",
        price: 1099
      },
      {
        _id: ObjectId(),
        name: "Chicken Teriyaki",
        price: 1299
      },
      {
        _id: ObjectId(),
        name: "Vegetable Ramen",
        price: 999
      },
      {
        _id: ObjectId(),
        name: "Miso Soup",
        price: 499
      }
    ],
    imageUrl: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800",
    lastUpdated: new Date()
  },
  {
    user: sampleUsers[3]._id,
    restaurantName: "Burger Palace",
    city: "Edinburgh",
    country: "UK",
    deliveryPrice: 249,
    estimatedDeliveryTime: 20,
    cuisines: ["American", "Burgers", "Fast Food"],
    menuItems: [
      {
        _id: ObjectId(),
        name: "Classic Cheeseburger",
        price: 899
      },
      {
        _id: ObjectId(),
        name: "Bacon Deluxe Burger",
        price: 1199
      },
      {
        _id: ObjectId(),
        name: "Sweet Potato Fries",
        price: 549
      },
      {
        _id: ObjectId(),
        name: "Chocolate Milkshake",
        price: 449
      }
    ],
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
    lastUpdated: new Date()
  },
  {
    user: sampleUsers[4]._id,
    restaurantName: "Mediterranean Delight",
    city: "Glasgow",
    country: "UK",
    deliveryPrice: 299,
    estimatedDeliveryTime: 28,
    cuisines: ["Mediterranean", "Greek", "Healthy"],
    menuItems: [
      {
        _id: ObjectId(),
        name: "Greek Gyros",
        price: 999
      },
      {
        _id: ObjectId(),
        name: "Falafel Wrap",
        price: 849
      },
      {
        _id: ObjectId(),
        name: "Hummus Platter",
        price: 699
      },
      {
        _id: ObjectId(),
        name: "Baklava",
        price: 599
      }
    ],
    imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800",
    lastUpdated: new Date()
  },
  {
    user: sampleUsers[0]._id,
    restaurantName: "Dragon Palace",
    city: "London",
    country: "UK",
    deliveryPrice: 399,
    estimatedDeliveryTime: 40,
    cuisines: ["Chinese", "Asian", "Noodles"],
    menuItems: [
      {
        _id: ObjectId(),
        name: "Sweet & Sour Chicken",
        price: 1299
      },
      {
        _id: ObjectId(),
        name: "Beef Black Bean",
        price: 1399
      },
      {
        _id: ObjectId(),
        name: "Vegetable Spring Rolls",
        price: 599
      },
      {
        _id: ObjectId(),
        name: "Fried Rice",
        price: 799
      }
    ],
    imageUrl: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=800",
    lastUpdated: new Date()
  },
  {
    user: sampleUsers[1]._id,
    restaurantName: "Le Petit Bistro",
    city: "Manchester",
    country: "UK",
    deliveryPrice: 449,
    estimatedDeliveryTime: 45,
    cuisines: ["French", "European", "Fine Dining"],
    menuItems: [
      {
        _id: ObjectId(),
        name: "Coq au Vin",
        price: 1899
      },
      {
        _id: ObjectId(),
        name: "Bouillabaisse",
        price: 2199
      },
      {
        _id: ObjectId(),
        name: "French Onion Soup",
        price: 899
      },
      {
        _id: ObjectId(),
        name: "Crème Brûlée",
        price: 799
      }
    ],
    imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
    lastUpdated: new Date()
  },
  {
    user: sampleUsers[2]._id,
    restaurantName: "Taco Fiesta",
    city: "Birmingham",
    country: "UK",
    deliveryPrice: 199,
    estimatedDeliveryTime: 22,
    cuisines: ["Mexican", "Tacos", "Spicy"],
    menuItems: [
      {
        _id: ObjectId(),
        name: "Chicken Tacos (3pc)",
        price: 999
      },
      {
        _id: ObjectId(),
        name: "Beef Burrito",
        price: 1199
      },
      {
        _id: ObjectId(),
        name: "Guacamole & Chips",
        price: 699
      },
      {
        _id: ObjectId(),
        name: "Churros",
        price: 549
      }
    ],
    imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800",
    lastUpdated: new Date()
  },
  {
    user: sampleUsers[3]._id,
    restaurantName: "Pizza Corner",
    city: "Edinburgh",
    country: "UK",
    deliveryPrice: 249,
    estimatedDeliveryTime: 25,
    cuisines: ["Italian", "Pizza", "Comfort Food"],
    menuItems: [
      {
        _id: ObjectId(),
        name: "Pepperoni Pizza",
        price: 1399
      },
      {
        _id: ObjectId(),
        name: "Quattro Stagioni",
        price: 1599
      },
      {
        _id: ObjectId(),
        name: "Garlic Bread",
        price: 499
      },
      {
        _id: ObjectId(),
        name: "Gelato",
        price: 599
      }
    ],
    imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800",
    lastUpdated: new Date()
  },
  {
    user: sampleUsers[4]._id,
    restaurantName: "Healthy Bowls",
    city: "Glasgow",
    country: "UK",
    deliveryPrice: 349,
    estimatedDeliveryTime: 30,
    cuisines: ["Healthy", "Salads", "Vegan"],
    menuItems: [
      {
        _id: ObjectId(),
        name: "Buddha Bowl",
        price: 1199
      },
      {
        _id: ObjectId(),
        name: "Quinoa Salad",
        price: 999
      },
      {
        _id: ObjectId(),
        name: "Acai Bowl",
        price: 899
      },
      {
        _id: ObjectId(),
        name: "Green Smoothie",
        price: 699
      }
    ],
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
    lastUpdated: new Date()
  }
];

// Insert all restaurants
db.restaurants.insertMany(restaurants);

print("Successfully inserted 5 users and 10 restaurants!");
print("Users inserted: " + sampleUsers.length);
print("Restaurants inserted: " + restaurants.length);