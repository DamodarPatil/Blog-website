import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logger } from "./data/logger";
import authService from "./appwrite/authService";
import { login, logout } from "./store/authSlice";

const useCurrentUser = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchCurrentUser = async () => {
      try {
        const userData = await authService.getCurrentUser();
        if (!signal.aborted) {
          if (userData) {
            dispatch(login());
          } else {
            dispatch(logout());
          }
        }
      } catch (error) {
        if (!signal.aborted) {
          logger.error("Failed to fetch current user:", {
            message: error.message,
          });

          setError("Unable to fetch user data. Please try again later.");

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
      controller.abort();
    };
  }, [dispatch]);

  return { loading, error };
};

export default useCurrentUser;
