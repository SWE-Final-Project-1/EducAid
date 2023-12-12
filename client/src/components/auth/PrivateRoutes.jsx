import { userContext } from "@/contexts/UserContext";
import { useContext } from "react";
import { RotatingLines } from "react-loader-spinner";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const { user, userLoading } = useContext(userContext);
  if (userLoading) {
    return (
      <div className="w-screen bg-slate-50 h-screen flex items-center justify-center">
        <RotatingLines strokeWidth="grey" width="25" />
      </div>
    );
  }

  if (user?.id && !user?.hasOnboarded) {
    console.log(user.hasOnboarded)
    return <Navigate to={"/auth/onboard"} />;
  }

  return user?.id ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
