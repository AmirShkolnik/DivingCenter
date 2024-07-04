import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export const useRedirect = (userAuthStatus) => {
  const history = useHistory();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          await axios.post("/dj-rest-auth/token/refresh/");
          // if user is logged in, the code below will run
          if (userAuthStatus === "loggedOut") {
            history.push("/");
          }
        } else {
          // if user is not logged in, the code below will run
          if (userAuthStatus === "loggedIn") {
            history.push("/signin");
          }
        }
      } catch (err) {
        // if token refresh fails, assume user is not logged in
        if (userAuthStatus === "loggedIn") {
          history.push("/signin");
        }
      }
    };

    handleMount();
  }, [history, userAuthStatus]);
};