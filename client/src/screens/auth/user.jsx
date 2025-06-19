import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../layout/auth/layout";
import { useDispatch, useSelector } from "react-redux";
import { LogOutFunc, VerifyToken } from "../../api";
import { setUser } from "../../redux/features/userSlice";
import { setAuth } from "../../redux/features/authSlice";
import { useClerk, useUser } from "@clerk/clerk-react";
import ProfileComponent from "../../components/user/userProfile";

const User = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth);
  const { signOut } = useClerk();
  const { user } = useUser();
  const handleLogout = async () => {
    await signOut();
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

      <ProfileComponent user={user} />

    </>
  );
};

export default User;
