import { Restaurant } from "@/types";
import { Link } from "react-router-dom";
import { AspectRatio } from "./ui/aspect-ratio";
import { Clock, MapPin, Star, Truck } from "lucide-react";

type Props = {
  restaurant: Restaurant;
};

const SearchResultCard = ({ restaurant }: Props) => {
  return (
    <Link
      to={`/detail/${restaurant._id}`}
      className="group bg-white rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden border border-gray-100 hover:border-green-200 transform hover:-translate-y-1"
    >
      <AspectRatio ratio={16 / 10} className="relative overflow-hidden">
        <img
          src={restaurant.imageUrl}
          alt={restaurant.restaurantName}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-semibold text-gray-700">4.5</span>
        </div>
      </AspectRatio>
      
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-200">
            {restaurant.restaurantName}
          </h3>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {restaurant.cuisines.slice(0, 3).map((cuisine, index) => (
              <span 
                key={index}
                className="inline-block bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium"
              >
                {cuisine}
              </span>
            ))}
            {restaurant.cuisines.length > 3 && (
              <span className="inline-block bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                +{restaurant.cuisines.length - 3} more
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-green-600" />
              <span className="font-medium">{restaurant.estimatedDeliveryTime} min</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Truck className="h-4 w-4 text-green-600" />
              <span className="font-medium">£{(restaurant.deliveryPrice / 100).toFixed(2)}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1 text-gray-500">
            <MapPin className="h-4 w-4" />
            <span className="text-xs">2.5 km</span>
          </div>
        </div>
        
        <div className="pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 uppercase font-medium tracking-wide">
              Opens at 11:00 AM
            </span>
            <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">
              Free Delivery
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultCard;
