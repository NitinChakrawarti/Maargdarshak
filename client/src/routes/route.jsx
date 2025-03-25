import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Home from "../screens/homepage"
import OurMentors from "../screens/mentors.jsx"; // Add Our Mentors component
import About from "../screens/aboutpage"
import SignUp from "../screens/auth/signup";
import { Pagenotfound } from "../screens/pagenotfound";
import Publicroute from "../components/publicroute.jsx";
import Protected from "../components/protected.jsx";
import ConnectMentors from "../screens/account/connectmentor.jsx";
import MyLearnings from "../screens/account/learnings.jsx";
import Chats from "../screens/account/chats.jsx";
import Profile from "../screens/account/profile.jsx";
import { UserBlog } from "../screens/account/blog.jsx";
import { Postpage } from "../components/blog/postpage.jsx";
import { EditBlog } from "../components/blog/edit.jsx";
import { AddBlog } from "../components/blog/addblog.jsx";

export const AllRoutes = () => {
    return (
        <Router >
            <Routes>

                {/* ------------------------------ All public routes ------------------------------ */}

                <Route path="/" element={
                    <Publicroute >
                        <Home />
                    </Publicroute>
                } />

                <Route path="/about" element={
                    <Publicroute >
                        <About />
                    </Publicroute>
                } />

                <Route path="/mentors" element={
                    <Publicroute >
                        <OurMentors />
                    </Publicroute>
                } />

                <Route path="/signup" element={
                    <Publicroute >
                        <SignUp />
                    </Publicroute>
                } />

                {/* <Route path="/blog" element={
                    <Publicroute >
                        <Blog />
                    </Publicroute>
                } /> */}

                <Route path="*" element={
                    <Publicroute >
                        <Pagenotfound />
                    </Publicroute>
                } />

                {/* ------------------------------ all protected routes ------------------------------ */}

                <Route path="/todo" element={
                    <Protected >
                        <MyLearnings />
                    </Protected>
                } />

                <Route path="/connectmentor" element={
                    <Protected >
                        <ConnectMentors />
                    </Protected>
                } />

                <Route path="/blog" element={
                    <Protected >
                        <UserBlog />
                    </Protected>
                } />

                <Route path="/chats" element={
                    <Protected >
                        <Chats />
                    </Protected>
                } />

                <Route path="/profile" element={
                    <Protected >
                        <Profile />
                    </Protected>
                } />
                <Route
                    path="/blog/:id"
                    element={
                        <Protected>
                            <Postpage />
                        </Protected>
                    }
                />
                <Route
                    path="/edit-blog/:id"
                    element={
                        <Protected>
                            <EditBlog />
                        </Protected>
                    }
                />
                <Route
                    path="/addblog"
                    element={
                        <Protected>
                            <AddBlog />
                        </Protected>
                    }
                />
            </Routes>
        </Router>
    )
}