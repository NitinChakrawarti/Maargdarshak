import { useContext, useState } from "react";
import Sidebar from "../../components/usersidebar";
import Header from "../../components/header";
// import { UserContext } from "../context/contextapi";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const { user } = useContext(UserContext);
  return (
    <div className="max-w-8xl relative h-screen bg-bg">
      <Sidebar isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div className={`md:ml-52 transition-all duration-300`}>
        <Header />
        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
