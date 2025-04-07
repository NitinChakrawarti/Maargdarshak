import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Home,
  BookOpen,
  FileText,
  Users,
  MessageCircle,
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import logo from "../assets/logo.png";
const Sidebar = ({ isOpen, setIsSidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sidebarItems = [
    { label: "Home", component: "/dashboard", icon: <Home size={20} /> },
    { label: "Resources", component: "/resources", icon: <BookOpen size={20} /> },
    { label: "Blogs", component: "/blog", icon: <FileText size={20} /> },
    { label: "Learners", component: "/learners", icon: <Users size={20} /> },
    { label: "Chat", component: "/chats", icon: <MessageCircle size={20} /> },
  ];
  const handleMenuClick = (component) => {
    setIsSidebarOpen(false);
    navigate(component);
  };

  const handleLogout = () => {
    document.cookie = "mentorToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/");
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`fixed z-40 top-0 left-0 h-screen bg-gradient-to-b from-brand-blue to-brand-navy text-white transition-all duration-300 transform ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } ${isCollapsed ? "w-16" : "w-52"}`}
    >
      <div className="p-4 text-center border-b border-white/10">
        {!isCollapsed ? (
          <span className="text-3xl font-extrabold text-white md:block py-2">
            मार्गदर्शक
          </span>
        ) : (
          <span className="text-3xl font-extrabold text-white hidden md:block py-2">
            <img src={logo} alt="logo" className="w-10 h-10" />
          </span>
        )}
      </div>
      <div className="flex flex-col h-[calc(100%-4rem)] py-4">
        <div className="flex-1 px-3 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.component}
              onClick={() => handleMenuClick(item.component)}
              className={`flex items-center justify-start w-full text-left text-[15px] font-medium px-3 py-2.5 rounded-md ${item.component === location.pathname
                ? "bg-white text-brand-blue"
                : "text-white/90 hover:text-white hover:bg-white/10 transition-colors"
                }`}
              title={isCollapsed ? item.label : ""}
            >
              <div className="flex items-center justify-center w-6">
                {item.icon}
              </div>
              {!isCollapsed && <span className="ml-3">{item.label}</span>}
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center justify-start w-full text-left text-[15px] font-medium px-3 py-2.5 text-white/90 hover:text-white hover:bg-white/10 rounded-md transition-colors mt-2"
            title={isCollapsed ? "Logout" : ""}
          >
            <div className="flex items-center justify-center w-6">
              <LogOut size={20} />
            </div>
            {!isCollapsed && <span className="ml-3">Logout</span>}
          </button>
        </div>
        <div className="px-3 pt-3 mb-4 w-full hidden md:flex justify-end border-t border-white/10">
          <button
            onClick={toggleCollapse}
            className="flex items-center w-fit text-left text-[15px] font-medium px-3 py-2.5 text-white/90 hover:text-white hover:bg-white/10 rounded-md transition-colors"
            title={isCollapsed ? "Expand" : "Collapse"}
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;