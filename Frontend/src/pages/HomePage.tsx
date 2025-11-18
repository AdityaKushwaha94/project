import { ChefHat, Star, Truck, Zap } from "lucide-react";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  const navigate = useNavigate();

  const handleSearchSubmit = (searchFormValues: SearchForm) => {
    navigate({
      pathname: `/search/${searchFormValues.searchQuery}`,
    });
  };

  const features = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning Fast Delivery",
      description: "Get your food delivered in under 30 minutes"
    },
    {
      icon: <ChefHat className="h-8 w-8" />,
      title: "Premium Quality",
      description: "Only the finest restaurants and freshest ingredients"
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "Top Rated",
      description: "4.9/5 stars from over 50,000 satisfied customers"
    }
  ];

  const stats = [
    { number: "50K+", label: "Happy Customers" },
    { number: "1000+", label: "Partner Restaurants" },
    { number: "99.9%", label: "Uptime" },
    { number: "< 30min", label: "Average Delivery" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
              <div className="space-y-4">
                <div className="inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700 animate-in fade-in slide-in-from-top duration-500 delay-200">
                  <Truck className="mr-2 h-4 w-4" />
                  Free delivery on orders over $30
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-tight">
                  Delicious food,
                  <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    {" "}delivered fast
                  </span>
                </h1>
                
                <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
                  Discover amazing restaurants in your neighborhood. Fresh ingredients, 
                  exceptional flavors, and lightning-fast delivery.
                </p>
              </div>

              <div className="glass-effect rounded-2xl p-6 shadow-soft border border-white/20">
                <SearchBar
                  placeHolder="Enter your delivery address..."
                  onSubmit={handleSearchSubmit}
                />
              </div>

              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                >
                  Explore Restaurants
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-green-200 text-green-700 hover:bg-green-50 px-8 py-3 rounded-xl font-semibold"
                >
                  Download App
                </Button>
              </div>
            </div>

            <div className="relative animate-in fade-in slide-in-from-right duration-700 delay-300">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-green-200 to-emerald-200 rounded-3xl blur-2xl opacity-30"></div>
                <div className="relative bg-white rounded-3xl p-8 shadow-medium">
                  <div className="grid grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map((item) => (
                      <div
                        key={item}
                        className="bg-gray-50 rounded-2xl p-4 text-center space-y-2 hover:bg-green-50 transition-colors duration-300"
                      >
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto">
                          <ChefHat className="h-6 w-6 text-green-600" />
                        </div>
                        <h4 className="font-semibold text-gray-900">Restaurant {item}</h4>
                        <div className="flex items-center justify-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-gray-600">4.{8 + item}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">Why Choose Foodieo?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the future of food delivery with our premium service
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center space-y-4 p-8 rounded-2xl hover:bg-green-50 transition-colors duration-300 group"
              >
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto text-green-600 group-hover:bg-green-200 transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center text-white"
              >
                <div className="text-4xl lg:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-green-100 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="text-4xl font-bold text-gray-900">
            Ready to order your next meal?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied customers and experience the best food delivery service
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white px-12 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              Order Now
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-gray-300 text-gray-700 hover:bg-gray-100 px-12 py-4 rounded-xl font-semibold text-lg"
            >
              Browse Restaurants
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
