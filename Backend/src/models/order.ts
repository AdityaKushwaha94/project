import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  deliveryDetails: {
    email: { type: String, required: true },
    name: { type: String, required: true },
    addressLine1: { type: String, required: true },
    city: { type: String, required: true },
  },
  cartItems: [
    {
      menuItemId: { type: String, required: true },
      quantity: { type: Number, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
    },
  ],
  totalAmount: Number,
  status: {
    type: String,
    enum: ["placed", "paid", "confirmed", "preparing", "outForDelivery", "delivered", "cancelled"],
    default: "placed"
  },
  estimatedDeliveryTime: { type: Number, default: 30 }, // in minutes
  actualDeliveryTime: { type: Number }, // in minutes
  orderTime: { type: Date, default: Date.now },
  estimatedDeliveryDateTime: { type: Date },
  actualDeliveryDateTime: { type: Date },
  paymentIntentId: { type: String },
  tracking: {
    placedAt: { type: Date, default: Date.now },
    confirmedAt: { type: Date },
    preparingAt: { type: Date },
    outForDeliveryAt: { type: Date },
    deliveredAt: { type: Date }
  }
}, {
  timestamps: true
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
