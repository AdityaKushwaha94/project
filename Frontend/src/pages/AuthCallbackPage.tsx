import { useCreateMyUser } from "@/api/MyUserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth0();
  const { createUser } = useCreateMyUser();

  const hasCreatedUser = useRef(false);

  useEffect(() => {
    if (user?.sub && user?.email && !hasCreatedUser.current) {
      createUser({ 
        auth0Id: user.sub, 
        email: user.email,
        name: user.name || user.email?.split('@')[0],
        picture: user.picture
      });
      hasCreatedUser.current = true;
    }
    navigate("/");
  }, [createUser, navigate, user]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Setting up your account...</p>
      </div>
    </div>
  );
};

export default AuthCallbackPage;
