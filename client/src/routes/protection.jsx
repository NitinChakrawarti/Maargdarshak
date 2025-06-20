import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const Publicroute = ({ children }) => {
  const { data, role } = useSelector((state) => state.auth);

  const location = useLocation();

  if (data && role === "user") {
    return <Navigate to="/user/home" state={{ from: location }} />;
  }

  if (data && role === "mentor") {
    return <Navigate to="/mentor/home" state={{ from: location }} />;
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
    return <Navigate to="/user/home" />;
  }

  if (role === "mentor" && path.startsWith("/user")) {
    return <Navigate to="/mentor/home" />;
  }

  return children;
};

export default { Publicroute, Protectedroute };













// // -------------------- PACKAGE IMPORT FILES -------------------- //
// import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { Navigate, useLocation } from "react-router-dom";


// export const ProtectedRoute = ({ children }) => {
//     const { user } = useSelector((state) => state.user);
//     const location = useLocation();

//     if (!user) {
//         return <Navigate to="/" state={{ from: location }} replace />;
//     }

//     if (user && user.role !== "admin") {
//         return children;
//     }
//     return <Navigate to="/admin" state={{ from: location }} replace />;
// }


// export const PublicRoute = ({ children }) => {
//     const { user } = useSelector((state) => state.user);
//     const location = useLocation();

//     if (user && user.role === "user") {
//         return <Navigate to="/user" state={{ from: location }} replace />;
//     }

//     if (user && user.role === "admin") {
//         return <Navigate to="/admin/home" state={{ from: location }} replace />;
//     }

//     return children;
// }

// export const AdminRoute = ({ children }) => {
//     const { user } = useSelector((state) => state.user);
//     const location = useLocation();

//     if (!user) {
//         return <Navigate to="/" state={{ from: location }} replace />;
//     }

//     if (user.role !== "admin") {
//         return <Navigate to="/unauthorized" state={{ from: location }} replace />;
//     }

//     return children;
// };
