import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Home from "../screens/landing/homepage"
import OurMentors from "../screens/landing/mentors.jsx"; // Add Our Mentors component
import About from "../screens/landing/aboutpage"
import { Pagenotfound } from "../screens/pagenotfound";
import Publicroute from "../components/publicroute.jsx";
import SignUp from "../screens/landing/signup.jsx";

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
            </Routes>
        </Router>
    )
}