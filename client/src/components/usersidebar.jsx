import { Link, useLocation, useNavigate } from 'react-router-dom';  // Import useNavigate
import { useState } from 'react';
import {
  LogOut, ListCheck,
  Users,
  FileText,
  MessageCircle,
  UserPen,
} from 'lucide-react'

const Sidebar = ({ isOpen, setIsSidebarOpen }) => {

  const navigate = useNavigate();
  const location = useLocation();
  const sidebarItems = [
    { label: "Todo", component: "/todo", icon: <ListCheck /> },
    { label: "Mentors", component: "/connectmentor", icon: <Users /> },
    { label: "Blogs", component: "/blog", icon: <FileText /> },
    { label: "Messages", component: "/chats", icon: <MessageCircle /> },
    { label: "Profile", component: "/profile", icon: <UserPen /> },
    // { label: "Logout", component: "/profile", icon: <LogOut /> },
  ];

  const [activeItem, setActiveItem] = useState('/profile');

  const handleMenuClick = (component) => {
    // backContext.setBack(false);
    setActiveItem(component);
    setIsSidebarOpen(false);
    navigate(component);
  };

  return (
    <div
      className={`fixed z-40 top-0 left-0 w-52 h-screen bg-primary text-bg transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
    >
      <div className="p-5 text-center md:pt-8 mb-2">
        <span className="text-4xl font-extrabold border-b-2 pb-4 text-bg hidden md:block">मार्गदर्शक</span>
      </div>

      <div className="h-[70%] flex mt-8 flex-col justify-between space-y-4 p-5">
        <div >
          {/* <p className=' w-full text-left font-bold py-2 rounded-lg flex px-4 items-center gap-2 '> <IoPerson />  </p> */}
          {sidebarItems.map((item) => (
            <button
              key={item.component}
              onClick={() => handleMenuClick(item.component)}
              className={`flex items-center gap-4 w-full text-left lg:mb-2 text-[16px] font-bold px-4 py-2 ${item.component === location.pathname
                ? 'bg-bg rounded-md text-black'
                : 'text-bg/80 hover:text-bg'
                }`}
            >
              {item.icon && item.icon}   {item.label}
            </button>
          ))}
          <button
            onClick={() => {
              localStorage.removeItem('logintoken')
              navigate('/')
            }}
            className={`flex gap-4 w-full text-left text-[16px] font-bold px-4 py-2 text-bg/80 hover:text-bg rounded-lg `}
          >
            <LogOut /> Logout
          </button>
        </div>

      </div>
    </div>
  );
};

export default Sidebar;
