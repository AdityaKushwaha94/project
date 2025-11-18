import { useGetMyOrders } from "@/api/OrderApi";
import OrderStatusDetail from "@/components/OrderStatusDetail";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Phone } from "lucide-react";
import { Order } from "@/types";

const getStatusColor = (status: string) => {
  switch (status) {
    case "placed":
      return "bg-yellow-100 text-yellow-800";
    case "paid":
      return "bg-blue-100 text-blue-800";
    case "confirmed":
      return "bg-green-100 text-green-800";
    case "preparing":
      return "bg-orange-100 text-orange-800";
    case "outForDelivery":
      return "bg-purple-100 text-purple-800";
    case "delivered":
      return "bg-green-100 text-green-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "placed":
      return "Order Placed";
    case "paid":
      return "Payment Confirmed";
    case "confirmed":
      return "Order Confirmed";
    case "preparing":
      return "Preparing Your Food";
    case "outForDelivery":
      return "Out for Delivery";
    case "delivered":
      return "Delivered";
    case "cancelled":
      return "Cancelled";
    default:
      return status;
  }
};

const OrderCard = ({ order }: { order: Order }) => {
  const isActiveOrder = !["delivered", "cancelled"].includes(order.status);
  
  return (
    <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{order.restaurant.restaurantName}</h2>
            <p className="text-gray-600 flex items-center gap-2 mt-1">
              <MapPin className="h-4 w-4" />
              {order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
            </p>
          </div>
          <Badge className={`${getStatusColor(order.status)} font-semibold px-4 py-2`}>
            {getStatusText(order.status)}
          </Badge>
        </div>
        
        {isActiveOrder && order.remainingDeliveryTime !== undefined && (
          <div className="mt-4 p-3 bg-white/50 rounded-lg">
            <p className="text-sm text-gray-600">
              Estimated delivery: {order.remainingDeliveryTime} minutes
            </p>
          </div>
        )}
      </div>
      {/* Content */}
      <div className="p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <OrderStatusDetail order={order} />
          <AspectRatio ratio={16 / 10}>
            <img
              src={order.restaurant.imageUrl}
              alt={order.restaurant.restaurantName}
              className="rounded-xl object-cover h-full w-full"
            />
          </AspectRatio>
        </div>
        
        {/* Order Info */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Order placed: {new Date(order.orderTime).toLocaleString()}
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Support: +44 20 1234 5678
            </div>
            <div className="flex items-center gap-2">
              Order ID: #{order._id.slice(-8)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrderStatusPage = () => {
  const { orders, isLoading } = useGetMyOrders();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Orders Yet</h3>
          <p className="text-gray-600 mb-6">Start ordering from your favorite restaurants!</p>
          <button 
            onClick={() => window.location.href = '/'}
            className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
          >
            Browse Restaurants
          </button>
        </div>
      </div>
    );
  }

  const activeOrders = orders.filter(order => !["delivered", "cancelled"].includes(order.status));
  const pastOrders = orders.filter(order => ["delivered", "cancelled"].includes(order.status));

  return (
    <div className="space-y-8 max-w-4xl mx-auto px-4 py-8">
      {activeOrders.length > 0 && (
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Active Orders</h1>
          <div className="space-y-6">
            {activeOrders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        </div>
      )}
      
      {pastOrders.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Order History</h2>
          <div className="space-y-6">
            {pastOrders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderStatusPage;
