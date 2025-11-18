import { ChefHat, Clock, Star, Truck } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 min-h-[500px]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="heroPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#heroPattern)" />
        </svg>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center animate-pulse">
          <ChefHat className="h-8 w-8 text-white" />
        </div>
        <div className="absolute top-40 right-20 w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center animate-pulse delay-300">
          <Star className="h-7 w-7 text-yellow-300" />
        </div>
        <div className="absolute bottom-32 left-16 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center animate-pulse delay-500">
          <Clock className="h-6 w-6 text-white" />
        </div>
        <div className="absolute bottom-20 right-32 w-18 h-18 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center animate-pulse delay-700">
          <Truck className="h-8 w-8 text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-24 text-center text-white">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Food Delivery
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Made Simple
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-green-100 max-w-2xl mx-auto leading-relaxed">
            Discover amazing restaurants, order your favorite meals, and enjoy fast delivery right to your door.
          </p>

          <div className="flex flex-wrap justify-center gap-8 pt-8">
            <div className="text-center">
              <div className="text-3xl font-bold">30+</div>
              <div className="text-green-200 text-sm">Minutes Delivery</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">500+</div>
              <div className="text-green-200 text-sm">Restaurants</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">4.9★</div>
              <div className="text-green-200 text-sm">Customer Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-green-200 text-sm">Service</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-white"></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;
