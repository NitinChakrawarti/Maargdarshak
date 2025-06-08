import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../layout/auth/layout";
import { useDispatch, useSelector } from "react-redux";
import { LogOutFunc, VerifyToken } from "../../api";
import { setUser } from "../../redux/features/userSlice";
import { setAuth } from "../../redux/features/authSlice";

const User = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth);
  const handleLogout = async () => {
    const logout = await LogOutFunc({ role: role });
    if (logout.status === 200) {

      dispatch(setAuth({ role: null, data: null }));
      dispatch(setUser({ user: null, isverified: false, savedItems: [] }));
      return navigate("/");
    }
    else {
      console.error("Logout failed:", logout.message);
    }
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
