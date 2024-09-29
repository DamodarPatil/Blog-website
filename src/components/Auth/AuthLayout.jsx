import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthLayout = ({ children, authentication = true }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    if (!signal.aborted) {
      if (
        (authentication && authStatus !== authentication) ||
        (!authentication && authStatus !== authentication)
      ) {
        navigate(authentication ? "/login" : "/");
      }
      setLoading(false);
    }

    return () => {
      controller.abort();
    };
  }, [authStatus, navigate, authentication]);

  return loading ? <h1>Loading...</h1> : <>{children}</>;
};

AuthLayout.propTypes = {
  children: PropTypes.node,
  authentication: PropTypes.bool,
};

export default AuthLayout;
