import { ChefHat, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
                <ChefHat className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Foodieo
              </span>
            </Link>
            <p className="text-gray-400 leading-relaxed max-w-sm">
              Delicious food delivered fast to your doorstep. Fresh ingredients, 
              exceptional flavors, and lightning-fast delivery.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors duration-200 cursor-pointer">
                <Facebook className="h-5 w-5" />
              </div>
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors duration-200 cursor-pointer">
                <Instagram className="h-5 w-5" />
              </div>
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors duration-200 cursor-pointer">
                <Twitter className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-green-400 transition-colors duration-200">Home</Link></li>
              <li><Link to="/search" className="hover:text-green-400 transition-colors duration-200">Restaurants</Link></li>
              <li><Link to="/orders" className="hover:text-green-400 transition-colors duration-200">My Orders</Link></li>
              <li><Link to="/profile" className="hover:text-green-400 transition-colors duration-200">Profile</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Support</h3>
            <ul className="space-y-3">
              <li><Link to="/help" className="hover:text-green-400 transition-colors duration-200">Help Center</Link></li>
              <li><Link to="/contact" className="hover:text-green-400 transition-colors duration-200">Contact Us</Link></li>
              <li><Link to="/privacy" className="hover:text-green-400 transition-colors duration-200">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-green-400 transition-colors duration-200">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-green-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-green-400" />
                <span>support@foodieo.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-green-400" />
                <span>123 Food Street, City</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} Foodieo. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <span className="text-gray-400">Made with ❤️ for food lovers</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
