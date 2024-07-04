import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export const useRedirect = (userAuthStatus) => {
  const history = useHistory();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const expiry = localStorage.getItem('tokenExpiry');
        if (token && expiry && new Date().getTime() < parseInt(expiry)) {
          // Token is still valid
          if (userAuthStatus === "loggedOut") {
            history.push("/");
          }
        } else if (token) {
          // Token exists but might be expired, try to refresh
          await axios.post("/dj-rest-auth/token/refresh/");
          if (userAuthStatus === "loggedOut") {
            history.push("/");
          }
        } else {
          // No token, user is not logged in
          if (userAuthStatus === "loggedIn") {
            history.push("/signin");
          }
        }
      } catch (err) {
        // Token refresh failed, user is not logged in
        if (userAuthStatus === "loggedIn") {
          history.push("/signin");
        }
      }
    };

    handleMount();
  }, [history, userAuthStatus]);
};