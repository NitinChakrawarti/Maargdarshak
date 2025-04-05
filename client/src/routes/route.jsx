import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "../screens/landing/homepage";
import OurMentors from "../screens/landing/mentors.jsx"; // Add Our Mentors component
import About from "../screens/landing/aboutpage";
import { Pagenotfound } from "../screens/pagenotfound";
import SignUp from "../screens/landing/signup.jsx";
import User from "../screens/auth/user.jsx";
import { Protectedroute, Publicroute } from "./protection.jsx";
import MentorSignUp from "../screens/landing/mentorSignup.jsx";

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
      </Routes>
    </Router>
  );
};
