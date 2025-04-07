import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const getuserToken = () => {
  const cookies = document.cookie.split("; ");
  const authCookie = cookies.find((cookie) => cookie.startsWith("userToken="));
  return authCookie ? authCookie.split("=")[1] : "";
};

const getmentorToken = () => {
  const cookies = document.cookie.split("; ");
  const authCookie = cookies.find((cookie) => cookie.startsWith("mentorToken="));
  return authCookie ? authCookie.split("=")[1] : "";
};

export const Publicroute = ({ children }) => {
  const [userToken, setUserToken] = useState(getuserToken());
  const [mentorToken, setMentorToken] = useState(getmentorToken());

  useEffect(() => {
    setUserToken(getuserToken());
    setMentorToken(getmentorToken());
  }, []);

  if (userToken) {
    return <Navigate to="/user" />;
  }
  if (mentorToken) {
    return <Navigate to="/mentor" />;
  }
  return children;
};

export const Protectedroute = ({ children }) => {
  const [userToken, setUserToken] = useState(getuserToken());
  const [mentorToken, setMentorToken] = useState(getmentorToken());

  useEffect(() => {
    setUserToken(getuserToken());
    setMentorToken(getmentorToken());
  }, []);

  if (!userToken && !mentorToken) {
    return <Navigate to="/" />;
  }
  
  if (userToken && window.location.pathname === '/mentor') {
    return <Navigate to="/user" />;
  }
  
  if (mentorToken && window.location.pathname === '/user') {
    return <Navigate to="/mentor" />;
  }
  
  return children;
};

export default { Publicroute, Protectedroute };
