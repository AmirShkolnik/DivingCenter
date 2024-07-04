import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export const useRedirect = (userAuthStatus) => {
  const history = useHistory();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          await axios.post("/dj-rest-auth/token/refresh/");
          // User is logged in
          if (userAuthStatus === "loggedOut") {
            history.push("/");
          }
        } else {
          // User is not logged in
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