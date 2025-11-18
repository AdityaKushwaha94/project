export type User = {
  _id: string;
  email: string;
  name: string;
  picture?: string;
  addressLine1: string;
  city: string;
  country: string;
};

export type MenuItem = {
  _id: string;
  name: string;
  price: number;
};

export type Restaurant = {
  _id: string;
  user: string;
  restaurantName: string;
  city: string;
  country: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[];
  menuItems: MenuItem[];
  imageUrl: string;
  lastUpdated: string;
};

export type OrderStatus =
  | "placed"
  | "paid"
  | "confirmed"
  | "preparing"
  | "outForDelivery"
  | "delivered"
  | "cancelled";

export type OrderTracking = {
  placedAt: string;
  confirmedAt?: string;
  preparingAt?: string;
  outForDeliveryAt?: string;
  deliveredAt?: string;
};

export type Order = {
  _id: string;
  restaurant: Restaurant;
  user: User;
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
    price: number;
  }[];
  deliveryDetails: {
    name: string;
    addressLine1: string;
    city: string;
    email: string;
  };
  totalAmount: number;
  status: OrderStatus;
  estimatedDeliveryTime: number;
  remainingDeliveryTime?: number;
  estimatedDeliveryDateTime?: string;
  orderTime: string;
  tracking: OrderTracking;
  createdAt: string;
  updatedAt: string;
  paymentIntentId?: string;
};

export type RestaurantSearchResponse = {
  data: Restaurant[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};
