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
import MentorResources from "../screens/mentor/resources";
import Mentorblog from "../screens/mentor/blog";
import Learners from "../screens/mentor/learners";
import Addresources from "../screens/mentor/addresources";
import Explore from "../screens/user/explore";
import ResourceDetailView from "../components/resourceById";
import ResourcePage from "../screens/user/resourcePage";
import MentorProfile from "../screens/user/mentorProfile";

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
          path="/chat"
          element={
            <Protectedroute>
              <MentorChat />
            </Protectedroute>
          }
        />
        {/* ------------------------------ user dashboard routes ------------------------------ */}
        <Route path="/user">
          <Route
            path=""
            element={
              <Protectedroute>
                <User />
              </Protectedroute>
            }
          />
          <Route
            path="explore"
            element={
              <Protectedroute>
                <Explore />
              </Protectedroute>
            }
          />
          <Route path="resources">
            <Route
              path=""
              element={
                <Protectedroute>
                  <ResourcePage />
                </Protectedroute>
              }
            />
            <Route
              path=":resourceId"
              element={
                <Protectedroute>
                  <ResourceDetailView />
                </Protectedroute>
              }
            />
          </Route>
        </Route>

        <Route path="/mentor/:mentorId"
          element={
            <MentorProfile />
          }
        />
        {/* ------------------------------ mentor dashboard routes ------------------------------ */}
        <Route path="/mentor">
          <Route
            index
            element={
              <Protectedroute>
                <Mentor />
              </Protectedroute>
            }
          />
          <Route
            path="dashboard"
            element={
              <Protectedroute>
                <Mentor />
              </Protectedroute>
            }
          />
          <Route path="resources">
            <Route
              index
              element={
                <Protectedroute>
                  <MentorResources />
                </Protectedroute>
              }
            />
            <Route
              path="add"
              element={
                <Protectedroute>
                  <Addresources />
                </Protectedroute>
              }
            />
            <Route
              path=":resourceId"
              element={
                <Protectedroute>
                  <ResourceDetailView />
                </Protectedroute>
              }
            />
          </Route>
          <Route
            path="blog"
            element={
              <Protectedroute>
                <Mentorblog />
              </Protectedroute>
            }
          />
          <Route
            path="learners"
            element={
              <Protectedroute>
                <Learners />
              </Protectedroute>
            }
          />
        </Route>
      </Routes>
    </Router >
  );
};
