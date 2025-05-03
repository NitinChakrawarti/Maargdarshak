import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const Publicroute = ({ children }) => {
  const { data, role } = useSelector((state) => state.auth);

  if (data && role === "user") {
    return <Navigate to="/user" />;
  }

  if (data && role === "mentor") {
    return <Navigate to="/mentor" />;
  }

  return children;
};

export const Protectedroute = ({ children }) => {
  const { data, role } = useSelector((state) => state.auth);
  const path = window.location.pathname;

  if (!data) {
    return <Navigate to="/" />;
  }

  if (role === "user" && path.startsWith("/mentor")) {
    return <Navigate to="/user" />;
  }

  if (role === "mentor" && path.startsWith("/user")) {
    return <Navigate to="/mentor" />;
  }

  return children;
};

export default { Publicroute, Protectedroute };
