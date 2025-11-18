import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";
import { ChefHat } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/90 border-b border-green-100/50 shadow-sm">
      <div className="container mx-auto flex justify-between items-center px-4 py-4">
        <Link
          to="/"
          className="flex items-center space-x-3 text-2xl font-bold tracking-tight text-gray-900 hover:text-green-600 transition-colors duration-200"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
            <ChefHat className="h-6 w-6 text-white" />
          </div>
          <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Foodieo
          </span>
        </Link>
        
        <div className="md:hidden">
          <MobileNav />
        </div>
        
        <div className="hidden md:block">
          <MainNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
