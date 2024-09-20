import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import authService from "../../appwrite/authService";
import { useState } from "react";
import { logger } from "../../data/logger";

const LogoutBtn = () => {
  const [isLoading, setIsLoading] = useState(false); //State to manage loading status
  const dispatch = useDispatch();

  const handleLogout = async () => {
    setIsLoading(true); //Start loading when logout starts
    try {
      await authService.logout(); //Logout from the auth service
      dispatch(logout()); //Dispatch the Redux logout action
    } catch (error) {
      logger.error("Logout Failed:", { message: error.message });
      alert("Logout failed. Please try again.");
    } finally {
      setIsLoading(false); //Stop loading regardless of success or failure
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isLoading} //Disable button during logout process
      className={`inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full
        ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {isLoading ? "Logging out..." : "Logout"}
    </button>
  );
};

export default LogoutBtn;
