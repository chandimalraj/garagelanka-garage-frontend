import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

export const useIsUserLoggedIn = () => {
  //   const [loggedIn, setLoggedIn] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken =
      typeof window !== "undefined" ? localStorage.getItem("jwtToken") : null;
    // const jwtToken = localStorage.getItem("jwtToken");
    const decoded = jwtDecode(jwtToken);
    const user = decoded?.user;
    if (jwtToken) {
      if (user.redirect) {
        navigate("/garages");
        //   setLoggedIn(false);
      } else {
        navigate("/app");
        //   setLoggedIn(true);
      }
    } else {
    }
  }, []);
};

export const useUserValid = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const jwtToken =
      typeof window !== "undefined" ? localStorage.getItem("jwtToken") : null;
    // const jwtToken = localStorage.getItem("jwtToken");
    const decoded = jwtDecode(jwtToken);
    const currentTime = Date.now() / 1000;
    console.log(decoded.exp < currentTime);
    if (decoded.exp < currentTime) {
      navigate("/");
    }
  }, []);
};

export const getServiceCenterId = () => {
  const jwtToken =
      typeof window !== "undefined" ? localStorage.getItem("jwtToken") : null;
    // const jwtToken = localStorage.getItem("jwtToken");
    const decoded = jwtDecode(jwtToken);
    return decoded?.user?.serviceCenter?._id
};
