import { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { userContext } from "../contexts/UserContext";

export const Callback = () => {
  useEffect(() => {
    if (
      window.opener &&
      (window.opener.location.pathname === "/login" ||
        window.opener.location.pathname === "/signup")
    ) {
      window.opener.location.replace("/dashboard");
    } else {
      window.location.replace("/dashboard");
    }

    if (window.opener) {
      window.close();
    }
  });
  return (
    <div className="w-screen h-screen bg-app_bg_deepest text-white flex items-center justify-center">
      Please Wait ...{" "}
    </div>
  );
};
