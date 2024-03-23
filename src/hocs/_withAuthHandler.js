import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export const withAccessHandler = (WrappedComponent) => {
  const AuthHandler = (props) => {
    // eslint-disable-next-line no-unused-vars
    const { isLoading, isAuthenticated } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
      if (
        // !isLoading && !isAuthenticated
        !window.sessionStorage.getItem("user")
      )
        return navigate("/login");
    }, [navigate]);

    return <WrappedComponent {...props} />;
  };

  return AuthHandler;
};
