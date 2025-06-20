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
import MentorResources from "../screens/mentor/resources";
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
import VerifyCertificate from "../screens/verifyCertificate";
import Layoutcomponent from "../layout/landing/layoutcomponent";
import Layout from "../layout/auth/layout";
import ChatComponent from "../screens/auth/chat";
import UserHome from "../screens/user/userhome";
import MentorProfilePublic from "../screens/mentorProfilepublic";



export const AllRoutes = () => {
    return (
        <Routes>
            <Route
                element={
                    <Publicroute>
                        <Layoutcomponent />
                    </Publicroute>
                }
            >
                <Route
                    index
                    element={<Home />}
                />
                <Route
                    path="/about"
                    element={<About />}
                />
                <Route
                    path="/mentors"
                    element={<OurMentors />}
                />
                <Route
                    path="/signup"
                    element={<SignUp />}
                />
                <Route
                    path="/mentor-signup"
                    element={<MentorSignUp />}
                />
                <Route
                    path="/resource"
                >
                    <Route
                        index
                        element={<Resources />}
                    />
                    <Route
                        path=":id"
                        element={<ResourceDetail />}
                    />
                </Route>
                <Route
                    path="/verify-certificate"
                    element={<VerifyCertificate />}
                />
                <Route path="mentor/:mentorId"
                    element={
                        <MentorProfilePublic />
                    }
                />
            </Route>

            {/* User Routes */}
            <Route
                path="/user"
                element={
                    <Protectedroute>
                        <Layout />
                    </Protectedroute>
                }
            >
                <Route
                    path="home"
                    element={
                        <UserHome />
                    }
                />
                <Route
                    path="explore"
                    element={
                        <Explore />
                    }
                />
                <Route path="resources">
                    <Route
                        path=""
                        element={
                            <ResourcePage />
                        }
                    />
                    <Route
                        path=":resourceId"
                        element={
                            <ResourceDetail />
                        }
                    />
                </Route>

                <Route
                    path="bookmarks">
                    <Route
                        index
                        element={
                            <BookMark />
                        }
                    />
                    <Route
                        path=":resourceId"
                        element={
                            <ResourceDetail />
                        }
                    />
                </Route>
                <Route
                    path="profile"
                    element={
                        <UserProfile />
                    }
                />

                <Route
                    path="chat"
                    element={
                        <ChatComponent />
                    }
                />
                <Route path="mentor/:mentorId"
                    element={
                        <MentorProfile />
                    }
                />
            </Route>

            {/* Mentor Routes */}

            <Route path="/mentor"
                element={
                    <Protectedroute>
                        <Layout />
                    </Protectedroute>
                }>
                <Route
                    path="home"
                    element={
                        <Mentor />
                    }
                />
                <Route
                    path="dashboard"
                    element={
                        <Mentor />
                    }
                />
                <Route path="resources">
                    <Route
                        index
                        element={
                            <MentorResources />
                        }
                    />
                    <Route
                        path="add"
                        element={
                            <Addresources />
                        }
                    />
                    <Route
                        path=":resourceId"
                        element={
                            <ResourceDetail />
                        }
                    />
                </Route>

                <Route
                    path="learners"
                    element={
                        <Learners />
                    }
                />
                <Route
                    path="chat"
                    element={
                        <ChatComponent />
                    }
                />
            </Route>

            <Route
                path="/mentor/profile"
                element={
                    <MentorProfilePage />
                }
            />
            <Route
                path="*"
                element={<Pagenotfound />}
            />

            <Route path="/mentor/:mentorId"
                element={
                    <MentorProfile />
                }
            />

        </Routes >
    )
};