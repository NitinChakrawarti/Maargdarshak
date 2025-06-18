// import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import Home from "../screens/homepage";
// import OurMentors from "../screens/mentors";
// import About from "../screens/aboutpage";
// import { Pagenotfound } from "../screens/pagenotfound";
// import SignUp from "../screens/signup";
// import User from "../screens/auth/user";
// import { Protectedroute, Publicroute } from "./protection";
// import MentorSignUp from "../screens/mentorSignup";
// import Mentor from "../screens/auth/mentor";
// import MentorChat from "../screens/mentor/mentorchat";
// import MentorResources from "../screens/mentor/resources";
// import Mentorblog from "../screens/mentor/blog";
// import Learners from "../screens/mentor/learners";
// import Addresources from "../screens/mentor/addresources";
// import Explore from "../screens/user/explore";
// import ResourcePage from "../screens/user/resourcePage";
// import MentorProfile from "../screens/user/mentorProfile";
// import BookMark from "../screens/user/bookMark";
// import UserProfile from "../screens/user/userProfile";
// import MentorProfilePage from "../screens/mentor/mentorProfile";
// import ResourceDetail from "../screens/user/resourceDetail";
// import Resources from "../screens/resources";

// export const AllRoutes = () => {
//   return (
//     <Router>
//       <Routes>
//         {/* ------------------------------ All public routes ------------------------------ */}
//         <Route
//           path="/"
//           element={
//             <Publicroute>
//               <Home />
//             </Publicroute>
//           }
//         />

//         <Route
//           path="/about"
//           element={
//             <Publicroute>
//               <About />
//             </Publicroute>
//           }
//         />

//         <Route
//           path="/mentors"
//           element={
//             <Publicroute>
//               <OurMentors />
//             </Publicroute>
//           }
//         />
//         <Route
//           path="resource"
//           >
//           <Route
//             path=""
//             element={
//               <Publicroute>
//                 <Resources />
//               </Publicroute>
//             }
//           />
//           <Route
//             path=":resourceId"
//             element={
//               <Publicroute>
//                 <ResourceDetail />
//               </Publicroute>
//             }
//           />
//         </Route>

//         <Route
//           path="/signup"
//           element={
//             <Publicroute>
//               <SignUp />
//             </Publicroute>
//           }
//         />




//         {/* ------------------------------ mentor signup ------------------------------- */}
//         <Route
//           path="/mentor-signup"
//           element={
//             <Publicroute>
//               <MentorSignUp />
//             </Publicroute>
//           }
//         />

//         {/* ------------------------------ 404 page ------------------------------ */}

//         <Route
//           path="*"
//           element={
//             <Publicroute>
//               <Pagenotfound />
//             </Publicroute>
//           }
//         />

//         {/* ------------------------------ all protected routes ------------------------------ */}


//         <Route
//           path="/chat"
//           element={
//             <Protectedroute>
//               <MentorChat />
//             </Protectedroute>
//           }
//         />

//         {/* ------------------------------ user dashboard routes ------------------------------ */}
//         <Route path="/user">
//           <Route
//             path=""
//             element={
//               <Protectedroute>
//                 <User />
//               </Protectedroute>
//             }
//           />
//           <Route
//             path="explore"
//             element={
//               <Protectedroute>
//                 <Explore />
//               </Protectedroute>
//             }
//           />
//           <Route path="resources">
//             <Route
//               path=""
//               element={
//                 <Protectedroute>
//                   <ResourcePage />
//                 </Protectedroute>
//               }
//             />
//             <Route
//               path=":resourceId"
//               element={
//                 <Protectedroute>
//                   <ResourceDetail />
//                 </Protectedroute>
//               }
//             />
//           </Route>

//           <Route
//             path="bookmarks">
//             <Route
//               index
//               element={
//                 <Protectedroute>
//                   <BookMark />
//                 </Protectedroute>
//               }
//             />
//             <Route
//               path=":resourceId"
//               element={
//                 <Protectedroute>
//                   <ResourceDetail />
//                 </Protectedroute>
//               }
//             />
//           </Route>

//         </Route>

//         <Route path="/mentor/:mentorId"
//           element={
//             <MentorProfile />
//           }
//         />
//         {/* ------------------------------ mentor dashboard routes ------------------------------ */}
//         <Route path="/mentor">
//           <Route
//             index
//             element={
//               <Protectedroute>
//                 <Mentor />
//               </Protectedroute>
//             }
//           />
//           <Route
//             path="dashboard"
//             element={
//               <Protectedroute>
//                 <Mentor />
//               </Protectedroute>
//             }
//           />
//           <Route path="resources">
//             <Route
//               index
//               element={
//                 <Protectedroute>
//                   <MentorResources />
//                 </Protectedroute>
//               }
//             />
//             <Route
//               path="add"
//               element={
//                 <Protectedroute>
//                   <Addresources />
//                 </Protectedroute>
//               }
//             />
//             <Route
//               path=":resourceId"
//               element={
//                 <Protectedroute>
//                   <ResourceDetail />
//                 </Protectedroute>
//               }
//             />
//           </Route>
//           <Route
//             path="blog"
//             element={
//               <Protectedroute>
//                 <Mentorblog />
//               </Protectedroute>
//             }
//           />
//           <Route
//             path="learners"
//             element={
//               <Protectedroute>
//                 <Learners />
//               </Protectedroute>
//             }
//           />
//         </Route>
//         <Route
//           path="/user/profile"
//           element={
//             <Protectedroute>
//               <UserProfile />
//             </Protectedroute>
//           }
//         />
//         <Route
//           path="/mentor/profile"
//           element={
//             <Protectedroute>
//               <MentorProfilePage />
//             </Protectedroute>
//           }
//         />
//       </Routes>
//     </Router >
//   );
// };






// src/routes/AllRoutes.jsx
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

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
import ResourcePage from "../screens/user/resourcePage";
import MentorProfile from "../screens/user/mentorProfile";
import BookMark from "../screens/user/bookMark";
import UserProfile from "../screens/user/userProfile";
import MentorProfilePage from "../screens/mentor/mentorProfile";
import ResourceDetail from "../screens/user/resourceDetail";
import Resources from "../screens/resources";
import PageWrapper from "../components/pagewrapper";

const RouteContainer = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route
          path="/"
          element={<Publicroute><PageWrapper><Home /></PageWrapper></Publicroute>}
        />
        <Route
          path="/about"
          element={<Publicroute><PageWrapper><About /></PageWrapper></Publicroute>}
        />
        <Route
          path="/mentors"
          element={<Publicroute><PageWrapper><OurMentors /></PageWrapper></Publicroute>}
        />
        <Route path="resource">
          <Route
            index
            element={<Publicroute><PageWrapper><Resources /></PageWrapper></Publicroute>}
          />
          <Route
            path=":resourceId"
            element={<Publicroute><PageWrapper><ResourceDetail /></PageWrapper></Publicroute>}
          />
        </Route>
        <Route
          path="/signup"
          element={<Publicroute><PageWrapper><SignUp /></PageWrapper></Publicroute>}
        />
        <Route
          path="/mentor-signup"
          element={<Publicroute><PageWrapper><MentorSignUp /></PageWrapper></Publicroute>}
        />
        <Route
          path="/mentor/:mentorId"
          element={<PageWrapper><MentorProfile /></PageWrapper>}
        />
        <Route
          path="*"
          element={<Publicroute><PageWrapper><Pagenotfound /></PageWrapper></Publicroute>}
        />

        {/* Protected Routes */}
        <Route
          path="/chat"
          element={<Protectedroute><PageWrapper><MentorChat /></PageWrapper></Protectedroute>}
        />
        <Route path="/user">
          <Route
            index
            element={<Protectedroute><PageWrapper><User /></PageWrapper></Protectedroute>}
          />
          <Route
            path="explore"
            element={<Protectedroute><PageWrapper><Explore /></PageWrapper></Protectedroute>}
          />
          <Route path="resources">
            <Route
              index
              element={<Protectedroute><PageWrapper><ResourcePage /></PageWrapper></Protectedroute>}
            />
            <Route
              path=":resourceId"
              element={<Protectedroute><PageWrapper><ResourceDetail /></PageWrapper></Protectedroute>}
            />
          </Route>
          <Route path="bookmarks">
            <Route
              index
              element={<Protectedroute><PageWrapper><BookMark /></PageWrapper></Protectedroute>}
            />
            <Route
              path=":resourceId"
              element={<Protectedroute><PageWrapper><ResourceDetail /></PageWrapper></Protectedroute>}
            />
          </Route>
          <Route
            path="profile"
            element={<Protectedroute><PageWrapper><UserProfile /></PageWrapper></Protectedroute>}
          />
        </Route>
        <Route path="/mentor">
          <Route
            index
            element={<Protectedroute><PageWrapper><Mentor /></PageWrapper></Protectedroute>}
          />
          <Route
            path="dashboard"
            element={<Protectedroute><PageWrapper><Mentor /></PageWrapper></Protectedroute>}
          />
          <Route path="resources">
            <Route
              index
              element={<Protectedroute><PageWrapper><MentorResources /></PageWrapper></Protectedroute>}
            />
            <Route
              path="add"
              element={<Protectedroute><PageWrapper><Addresources /></PageWrapper></Protectedroute>}
            />
            <Route
              path=":resourceId"
              element={<Protectedroute><PageWrapper><ResourceDetail /></PageWrapper></Protectedroute>}
            />
          </Route>
          <Route
            path="blog"
            element={<Protectedroute><PageWrapper><Mentorblog /></PageWrapper></Protectedroute>}
          />
          <Route
            path="learners"
            element={<Protectedroute><PageWrapper><Learners /></PageWrapper></Protectedroute>}
          />
          <Route
            path="profile"
            element={<Protectedroute><PageWrapper><MentorProfilePage /></PageWrapper></Protectedroute>}
          />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export const AllRoutes = () => {
  return (
    <Router>
      <RouteContainer />
    </Router>
  );
};
