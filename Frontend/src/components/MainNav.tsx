import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import UsernameMenu from "./UsernameMenu";
import { Link } from "react-router-dom";

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <div className="flex space-x-6 items-center">
      {isAuthenticated ? (
        <>
          <Link 
            to="/order-status" 
            className="font-semibold text-gray-700 hover:text-green-600 transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-green-600 after:transition-all after:duration-200 hover:after:w-full"
          >
            Order Status
          </Link>
          <UsernameMenu />
        </>
      ) : (
        <Button
          variant="outline"
          className="font-semibold text-green-600 border-green-200 hover:bg-green-50 hover:border-green-300 rounded-xl px-6 py-2 transition-all duration-200"
          onClick={async () => await loginWithRedirect()}
        >
          Log In
        </Button>
      )}
    </div>
  );
};

export default MainNav;
