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
    if (currentUser !== undefined) {
      handleRedirect();
    }
  }, [currentUser, history, userAuthStatus]);
};