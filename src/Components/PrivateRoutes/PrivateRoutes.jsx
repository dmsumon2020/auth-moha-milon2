import React, { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../ContextProvider/ContextProvider";

const PrivateRoutes = ({ children }) => {
  const { user, loader } = useContext(AuthContext);

  if (loader) {
    return <span className="loading loading-spinner text-error"></span>;
  }

  if (user) {
    return children; // if user is logged in, render the children
  }

  return <Navigate to={"/login"}></Navigate>;
};

export default PrivateRoutes;
<h2>Private Route</h2>;
