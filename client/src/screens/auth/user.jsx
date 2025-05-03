import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../layout/auth/layout";
import { useDispatch, useSelector } from "react-redux";
import { VerifyToken } from "../../api";
import { setUser } from "../../redux/features/userSlice";

const User = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    document.cookie =
      "userToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/");
  };

  return (
    <>
      <Layout>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      </Layout>
    </>
  );
};

export default User;
