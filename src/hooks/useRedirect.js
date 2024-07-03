import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";

export const useRedirect = (userAuthStatus) => {
  const history = useHistory();
  const currentUser = useCurrentUser();

  useEffect(() => {
    const handleRedirect = () => {
      if (currentUser === null && userAuthStatus === "loggedIn") {
        history.push("/signin");
      } else if (currentUser && userAuthStatus === "loggedOut") {
        history.push("/");
      }
    };

    // Only redirect if currentUser is not undefined
    if (currentUser !== undefined) {
      handleRedirect();
    }
  }, [currentUser, history, userAuthStatus]);
};