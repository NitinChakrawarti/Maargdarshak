import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
// import Profile from './profile';
import MyLearnings from "./mylearnings";
import ConnectMentors from "./connectmentor";
import Chats from "./chats";
import Sidebar from "./usersidebar";
import React from "react";
import { Pagenotfound } from "../pages/pagenotfound";
import { Blog } from "../blogpage/blog";
import { AddBlog } from "../blogpage/addblog";
import { Postpage } from "../blogpage/postpage";
import { EditBlog } from "../blogpage/edit";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <Router>
      <div className="flex md:flex-row flex-col bg-gray-50 min-h-screen">
        {/* Hamburger Icon for Mobile Sidebar Toggle */}
        <div className="h-16 shadow-lg w-full z-30 bg-white md:hidden fixed">
          <div className="flex justify-end items-center">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden fixed top-3 left-4 p-2 bg-primary text-white rounded-md focus:outline-none"
            >
              {/* Hamburger Icon */}
              {isSidebarOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke=""
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke=""
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
            <div className="flex justify-center items-center h-full py-4 pr-6">
              <h1 className="font-bold text-primary text-xl">मार्गदर्शक</h1>
            </div>
          </div>
        </div>

        <Sidebar isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

        {/* Render Route Components */}
        <div className="flex-1 pt-5 mt-20 md:mt-8 md:pt-0 md:pl-10 md:ml-64 ">
          <Routes>
            {/* <Route path="/" element={<Profile />} /> */}
            <Route path="/" element={<MyLearnings />} />
            <Route path="/mylearnings" element={<MyLearnings />} />
            <Route path="/connectmentor" element={<ConnectMentors />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<Postpage />} />
            <Route path="/edit-blog/:id" element={<EditBlog />} />
            <Route path="/addblog" element={<AddBlog />} />
            <Route path="/chats" element={<Chats />} />
            <Route path="*" element={<Pagenotfound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default DashboardLayout;
