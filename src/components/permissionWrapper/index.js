import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getUserPermission } from "../../utils/helpers/Permission";

export default function PermissionWrapper({ component }) {
  const location = useLocation();
  const [hasPermission, setHasPermission] = useState(false);

  // const checkPermission = async () => {
  //   try {
  //     if (getUserPermission()) {

  //       return true;
  //     }
  //     return false;
  //   } catch (error) {
  //    console.log(error)

  //   }
  // };
  //get permission from hook when user changes location
  useEffect(() => {
    getUserPermission()
      .then((result) => setHasPermission(result))
      .catch(() => setHasPermission(false));

    // if (location.pathname == "/nav") {
    //   setHasPermission(true);
    // } else {
    //   setHasPermission(false);
    // }
  }, [location]);

  if (hasPermission) {
    return component;
  }

  return null;
}
