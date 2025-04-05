import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const getAuthToken = () => {
  const cookies = document.cookie.split("; ");
  const authCookie = cookies.find((cookie) => cookie.startsWith("authToken="));
  return authCookie ? authCookie.split("=")[1] : "";
};

export const Publicroute = ({ children }) => {
  const [token, setToken] = useState(getAuthToken());

  useEffect(() => {
    setToken(getAuthToken());
  }, []);

  if (token) {
    return <Navigate to="/user" />;
  }
  return children;
};

export const Protectedroute = ({ children }) => {
  const [token, setToken] = useState(getAuthToken());

  useEffect(() => {
    setToken(getAuthToken());
  }, []);

  if (!token) {
    return <Navigate to="/" />;
  }
  return children;
};

export default { Publicroute, Protectedroute };
