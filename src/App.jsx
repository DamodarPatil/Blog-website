import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/authService";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components/index";
import { logger } from "./data/logger";
// import { Outlet } from "react-router-dom";

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController(); // Create an AboutController instance
    const { signal } = controller;

    const fetchCurrentUser = async () => {
      try {
        const userData = await authService.getCurrentUser();
        if (!signal.aborted) {
          //Check if the operation was aborted
          if (userData) {
            dispatch(login({ userData }));
          } else {
            dispatch(logout());
          }
        }
      } catch (error) {
        if (!signal.aborted) {
          logger.error("Failed to fetch current user:", {
            message: error.message,
          });
          dispatch(logout());
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };
    fetchCurrentUser();

    return () => {
      controller.abort(); //Abort the fetch operation on component unmount
    };
  }, [dispatch]);

  return !loading ? (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      <div className="w-full">
        <Header />
        <main className="flex-grow p-4 md:p-8">
          {" "}
          {/* Added padding for better spacing */}
          TODO: {/* <Outlet/> */}
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <p className="text-xl font-semibold">Loading...</p>
    </div>
  );
};

export default App;
