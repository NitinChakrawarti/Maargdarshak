import { useContext, useState } from "react";
import Sidebar from "../../components/usersidebar";
import { UserContext } from "../../context/contextapi";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useContext(UserContext);
  return (
    <div className="max-w-8xl relative h-screen bg-bg">
      <header className="md:sticky top-0">
        <div className="h-16 shadow-sm w-full z-50 bg-bg md:hidden fixed">
          <div className="flex w-full flex-row-reverse justify-between px-4 items-center">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden  top-3 left-4 p-2 text-primary  font-extrabold rounded-md focus:outline-none"
            >
              {/* Hamburger Icon */}
              {isSidebarOpen ? (
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
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
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
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
              <h1 className="font-extrabold text-primary text-2xl">
                मार्गदर्शक
              </h1>
            </div>
          </div>
        </div>
        <Sidebar isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      </header>
      <main className=" md:mt-4 overflow-x-hidden md:ml-[12rem] ">
        {children}
      </main>
    </div>
  );
};

export default Layout;
