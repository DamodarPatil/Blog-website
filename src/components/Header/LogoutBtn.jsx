import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import authService from "../../appwrite/authService";
import { useState } from "react";
import { logger } from "../../data/logger";

const LogoutBtn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      dispatch(logout());
    } catch (error) {
      logger.error("Logout Failed:", { message: error.message });
      alert("Logout failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isLoading}
      className={`inline-block px-6 py-2 duration-200 hover:bg-mutedGold rounded-full
        ${isLoading ? "opacity-50 cursor-not-allowed" : "bg-coral text-white"}`}
    >
      {isLoading ? "Logging out..." : "Logout"}
    </button>
  );
};

export default LogoutBtn;
