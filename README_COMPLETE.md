# Food Delivery App - Complete Setup Guide

This guide will help you set up and run the complete food delivery application with all features.

## ✅ What's Been Implemented

### Backend Features:
1. **User Authentication** - Google OAuth via Auth0
2. **Restaurant Management** - CRUD operations for restaurants  
3. **Order Management** - Place, track, and manage orders
4. **Payment Integration** - Stripe payment gateway
5. **Delivery Tracking** - 30-minute delivery timer with real-time updates
6. **Database** - MongoDB with proper schemas and relationships

### Frontend Features:
1. **Modern UI Design** - Professional, clean interface
2. **Restaurant Browsing** - Search and filter restaurants
3. **Order Tracking** - Real-time delivery timer and status updates
4. **User Profile** - Google authentication and profile management
5. **Payment Flow** - Stripe checkout integration
6. **Responsive Design** - Works on all devices

## 🚀 Quick Start

### 1. Start Backend Server
```bash
cd Backend
npm run dev
```
This will start:
- Express server on `localhost:7000`
- Stripe webhook listener
- MongoDB connection

### 2. Start Frontend Server  
```bash
cd Frontend
npm run dev
```
This will start the React app on `localhost:5173`

### 3. Test the Application

#### Browse Restaurants:
- Visit `http://localhost:5173`
- Search for restaurants in "London", "Manchester", or "Birmingham"
- Sample restaurants are pre-loaded

#### Order Flow:
1. Click on a restaurant
2. Add items to cart
3. Login with Google (via Auth0)
4. Fill delivery details
5. Complete payment with Stripe (test mode)
6. Track order with 30-minute delivery timer

#### Order Tracking:
- Visit `/order-status` to see all your orders
- Watch the delivery timer count down
- Orders automatically progress through states:
  - Placed → Paid → Confirmed → Preparing → Out for Delivery → Delivered

## 🗄️ Database

The app includes sample data:
- 6 restaurants across 3 cities
- Various cuisines (Italian, Indian, Japanese, etc.)
- Menu items with realistic prices
- User accounts linked to Google Auth

## 🔧 Configuration

All environment variables are set up:
- **Frontend**: Auth0 config, API URLs
- **Backend**: MongoDB, Stripe, Cloudinary, Auth0

## 🧪 Test Data

Sample restaurants available:
- **London**: Bella Italia, Burger Palace
- **Manchester**: Spice Garden, Mediterranean Delight  
- **Birmingham**: Tokyo Express, Pizza Corner

## 📱 Features Included

✅ Restaurant search and filtering
✅ Add to cart functionality  
✅ User authentication (Google)
✅ Stripe payment processing
✅ Order tracking with timer
✅ Responsive design
✅ Professional UI/UX
✅ Real-time order updates
✅ Delivery time estimation

## 🎯 How to Test

1. **Browse**: Go to homepage, search for "London"
2. **Order**: Click restaurant, add items, checkout
3. **Pay**: Use Stripe test card: 4242 4242 4242 4242
4. **Track**: Visit order status page to see timer
5. **Profile**: Update your profile information

The app is fully functional and ready for demonstration!