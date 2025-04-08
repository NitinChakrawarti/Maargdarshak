import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "../screens/homepage"; 
import OurMentors from "../screens/mentors"; 
import About from "../screens/aboutpage";
import { Pagenotfound } from "../screens/pagenotfound";
import SignUp from "../screens/signup";
import User from "../screens/auth/user";
import { Protectedroute, Publicroute } from "./protection";
import MentorSignUp from "../screens/mentorSignup";
import Mentor from "../screens/auth/mentor";
import MentorChat from "../screens/mentor/mentorchat";

export const AllRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* ------------------------------ All public routes ------------------------------ */}
        <Route
          path="/"
          element={
            <Publicroute>
              <Home />
            </Publicroute>
          }
        />

        <Route
          path="/about"
          element={
            <Publicroute>
              <About />
            </Publicroute>
          }
        />

        <Route
          path="/mentors"
          element={
            <Publicroute>
              <OurMentors />
            </Publicroute>
          }
        />

        <Route
          path="/signup"
          element={
            <Publicroute>
              <SignUp />
            </Publicroute>
          }
        />

        {/* ------------------------------ mentor signup ------------------------------- */}
        <Route
          path="/mentor-signup"
          element={
            <Publicroute>
              <MentorSignUp />
            </Publicroute>
          }
        />

        {/* ------------------------------ 404 page ------------------------------ */}

        <Route
          path="*"
          element={
            <Publicroute>
              <Pagenotfound />
            </Publicroute>
          }
        />

        {/* ------------------------------ all protected routes ------------------------------ */}
        <Route
          path="/user"
          element={
            <Protectedroute>
              <User />
            </Protectedroute>
          }
        />

        <Route
          path="/mentor"
          element={
            <Protectedroute>
              <Mentor />
            </Protectedroute>
          }
        />

        <Route
          path="/mentor/chat"
          element={
            <Protectedroute>
              <MentorChat />
            </Protectedroute>
          }
        />

      </Routes>
    </Router>
  );
};
