import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/authService";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components/index";
// import { Outlet } from "react-router-dom";

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true; // Flag to track if the component is mounted

    const fetchCurrentUser = async () => {
      try {
        const userData = await authService.getCurrentUser();
        if (isMounted) {
          if (userData) {
            dispatch(login({ userData }));
          } else {
            dispatch(logout());
          }
        }
      } catch (error) {
        console.error("Failed to fetch current user:", {
          message: error.message,
        });
        if (isMounted) {
          dispatch(logout());
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCurrentUser();

    return () => {
      isMounted = false; // Cleanup function to set the flag to false
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
