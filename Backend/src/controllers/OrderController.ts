import Stripe from "stripe";
import { Request, Response } from "express";
import Restaurant, { MenuItemType } from "../models/restaurant";
import Order from "../models/order";

const STRIPE = new Stripe(process.env.STRIPE_API_KEY as string);
const FRONTEND_URL = process.env.FRONTEND_URL as string;
const STRIPE_ENDPOINT_SECRET = process.env.STRIPE_WEBHOOK_SECRET as string;

const getMyOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({ user: req.userId })
      .populate("restaurant")
      .populate("user")
      .sort({ createdAt: -1 }); // Most recent first

    // Calculate remaining delivery time for active orders
    const ordersWithTimer = orders.map(order => {
      const orderObj = order.toObject();
      
      if (order.status !== 'delivered' && order.status !== 'cancelled') {
        const orderTime = new Date(order.orderTime);
        const estimatedDeliveryTime = new Date(orderTime.getTime() + order.estimatedDeliveryTime * 60000);
        const now = new Date();
        const remainingMinutes = Math.max(0, Math.floor((estimatedDeliveryTime.getTime() - now.getTime()) / 60000));
        
        (orderObj as any).remainingDeliveryTime = remainingMinutes;
        (orderObj as any).estimatedDeliveryDateTime = estimatedDeliveryTime;
      }
      
      return orderObj;
    });

    res.json(ordersWithTimer);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

const getOrderById = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({ _id: orderId, user: req.userId })
      .populate("restaurant")
      .populate("user");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const orderObj = order.toObject();
    
    // Calculate remaining delivery time for active orders
    if (order.status !== 'delivered' && order.status !== 'cancelled') {
      const orderTime = new Date(order.orderTime);
      const estimatedDeliveryTime = new Date(orderTime.getTime() + order.estimatedDeliveryTime * 60000);
      const now = new Date();
      const remainingMinutes = Math.max(0, Math.floor((estimatedDeliveryTime.getTime() - now.getTime()) / 60000));
      
      (orderObj as any).remainingDeliveryTime = remainingMinutes;
      (orderObj as any).estimatedDeliveryDateTime = estimatedDeliveryTime;
    }

    res.json(orderObj);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

type CheckoutSessionRequest = {
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    email: string;
    name: string;
    addressLine1: string;
    city: string;
  };
  restaurantId: string;
};

const stripeWebhookHandler = async (req: Request, res: Response) => {
  let event;

  try {
    const sig = req.headers["stripe-signature"];
    event = STRIPE.webhooks.constructEvent(
      req.body,
      sig as string,
      STRIPE_ENDPOINT_SECRET
    );
  } catch (error: any) {
    console.log(error);
    return res.status(400).send(`Webhook error: ${error.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const order = await Order.findById(event.data.object.metadata?.orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.totalAmount = event.data.object.amount_total;
    order.status = "paid";
    order.paymentIntentId = event.data.object.payment_intent as string;
    
    await order.save();
  }

  res.status(200).send();
};

const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    const checkoutSessionRequest: CheckoutSessionRequest = req.body;

    const restaurant = await Restaurant.findById(
      checkoutSessionRequest.restaurantId
    );

    if (!restaurant) {
      throw new Error("Restaurant not found");
    }

    // Calculate estimated delivery time
    const orderTime = new Date();
    const estimatedDeliveryTime = restaurant.estimatedDeliveryTime;
    const estimatedDeliveryDateTime = new Date(orderTime.getTime() + estimatedDeliveryTime * 60000);

    const newOrder = new Order({
      restaurant: restaurant,
      user: req.userId,
      status: "placed",
      deliveryDetails: checkoutSessionRequest.deliveryDetails,
      cartItems: checkoutSessionRequest.cartItems.map(item => ({
        ...item,
        price: restaurant.menuItems.find(mi => mi._id.toString() === item.menuItemId)?.price || 0
      })),
      orderTime: orderTime,
      estimatedDeliveryTime: estimatedDeliveryTime,
      estimatedDeliveryDateTime: estimatedDeliveryDateTime,
      tracking: {
        placedAt: orderTime
      }
    });

    const lineItems = createLineItems(
      checkoutSessionRequest,
      restaurant.menuItems
    );

    const session = await createSession(
      lineItems,
      newOrder._id.toString(),
      restaurant.deliveryPrice,
      restaurant._id.toString()
    );

    if (!session.url) {
      return res.status(500).json({ message: "Error creating stripe session" });
    }

    await newOrder.save();
    res.json({ url: session.url });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: error.raw?.message || error.message });
  }
};

const createLineItems = (
  checkoutSessionRequest: CheckoutSessionRequest,
  menuItems: MenuItemType[]
) => {
  const lineItems = checkoutSessionRequest.cartItems.map((cartItem) => {
    const menuItem = menuItems.find(
      (item) => item._id.toString() === cartItem.menuItemId.toString()
    );

    if (!menuItem) {
      throw new Error(`Menu item not found: ${cartItem.menuItemId}`);
    }

    const line_item: Stripe.Checkout.SessionCreateParams.LineItem = {
      price_data: {
        currency: "gbp",
        unit_amount: menuItem.price,
        product_data: {
          name: menuItem.name,
        },
      },
      quantity: parseInt(cartItem.quantity),
    };

    return line_item;
  });

  return lineItems;
};

const createSession = async (
  lineItems: Stripe.Checkout.SessionCreateParams.LineItem[],
  orderId: string,
  deliveryPrice: number,
  restaurantId: string
) => {
  const sessionData = await STRIPE.checkout.sessions.create({
    line_items: lineItems,
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: "Delivery",
          type: "fixed_amount",
          fixed_amount: {
            amount: deliveryPrice,
            currency: "gbp",
          },
        },
      },
    ],
    mode: "payment",
    metadata: {
      orderId,
      restaurantId,
    },
    success_url: `${FRONTEND_URL}/order-status?success=true`,
    cancel_url: `${FRONTEND_URL}/detail/${restaurantId}?cancelled=true`,
  });

  return sessionData;
};

export default {
  getMyOrders,
  getOrderById,
  createCheckoutSession,
  stripeWebhookHandler,
};
