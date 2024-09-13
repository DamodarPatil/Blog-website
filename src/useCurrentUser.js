import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logger } from "./data/logger";
import authService from "./appwrite/authService";
import { login, logout } from "./store/authSlice";

/**
 * Custom hook to fetch and manage the current user state.
 * Handles fetching user data, managing loading and error states,
 * and dispatching login/logout actions based on the user data.
 */

const useCurrentUser = () => {
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to manager error messages
  const dispatch = useDispatch(); // Redux dispatch function

  useEffect(() => {
    const controller = new AbortController(); // Create an AbortController to handle component unmounts
    const { signal } = controller;

    const fetchCurrentUser = async () => {
      try {
        const userData = await authService.getCurrentUser(); // Fetch current user data
        if (!signal.aborted) {
          if (userData) {
            dispatch(login({ userData })); // Dispatch login action with user data
          } else {
            dispatch(logout()); // Dispatch logout action if no user data
          }
        }
      } catch (error) {
        if (!signal.aborted) {
          logger.error("Failed to fetch current user:", {
            message: error.message,
          });

          setError("Unable to fetch user data. Please try again later.");

          dispatch(logout()); // Dispatch logout action on error
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false); // Set loading to false after fetching data
        }
      }
    };
    fetchCurrentUser();

    return () => {
      controller.abort(); // Abort the fetch request on component unmount
    };
  }, [dispatch]);

  return { loading, error }; // Return loading and error states
};

export default useCurrentUser;
