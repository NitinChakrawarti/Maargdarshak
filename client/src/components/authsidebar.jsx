// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useState, useEffect, useRef } from "react";
// import {
//   ChevronLeft,
//   ChevronRight,
//   LogOut,
//   X
// } from "lucide-react";
// import logo from "../assets/logo.png";
// import { MentorSidebar, UserSidebar } from "../data/authsidebar";
// import { useDispatch, useSelector } from "react-redux";
// import { LogOutFunc } from "../api";
// import { setAuth } from "../redux/features/authSlice";

// const Sidebar = ({ isOpen, setIsSidebarOpen, onCollapse }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const sidebarRef = useRef(null);
//   const dispatch = useDispatch();
//   const { role, data } = useSelector((state) => state.auth);

//   // Update parent component when collapse state changes
//   useEffect(() => {
//     if (onCollapse) {
//       onCollapse(isCollapsed);
//     }
//   }, [isCollapsed, onCollapse]);

//   // Handle click outside sidebar
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
//         setIsSidebarOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [setIsSidebarOpen]);

//   const handleLogout = async () => {
//     const logout = await LogOutFunc({ role: role });
//     if (logout.status === 200) {
//       dispatch(setAuth({ role: null, data: null }));
//       return navigate("/");
//     }
//     else {
//       console.error("Logout failed:", logout.message);
//     }
//   };

//   const toggleCollapse = () => {
//     setIsCollapsed(!isCollapsed);
//   };

//   return (
//     <>
//       {/* Mobile overlay */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-30 md:hidden"
//           onClick={() => setIsSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <div
//         ref={sidebarRef}
//         className={`fixed z-40 top-0 left-0 h-screen bg-gradient-to-b from-brand-blue to-brand-navy text-white transition-transform duration-300 transform ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
//           } ${isCollapsed ? "w-16" : "w-52"}`}
//       >
//         {/* Mobile close button */}
//         {!isCollapsed && (
//           <button
//             className="absolute top-4 right-2 p-1 rounded-full bg-white/10 hover:bg-white/20 text-white md:hidden"
//             onClick={() => setIsSidebarOpen(false)}
//           >
//             <X size={24} />
//           </button>
//         )}

//         {/* Logo */}
//         <div className="md:p-4 py-4 px-4 md:text-center border-b border-white/10">
//           <span className="text-3xl font-extrabold text-white py-2">
//             {isCollapsed ? (
//               <img src={logo} alt="logo" className="w-10 h-10" />
//             ) : (
//               "मार्गदर्शक"
//             )}
//           </span>
//         </div>

//         {/* Sidebar content */}
//         <div className="flex flex-col h-[calc(100%-4rem)] py-4">
//           <div className="flex-1 px-3 space-y-1">
//             {(role === 'mentor' ? MentorSidebar : role === 'user' ? UserSidebar : []).map((item) => (
//               <Link
//                 key={item.component}
//                 to={item.component}
//                 className={`flex items-center justify-start w-full text-left text-[15px] font-medium px-3 py-2.5 rounded-md ${item.component === location.pathname
//                   ? "bg-white text-brand-blue"
//                   : "text-white/90 hover:text-white hover:bg-white/10 transition-colors"
//                   }`}
//                 title={isCollapsed ? item.label : ""}
//               >
//                 <div className="flex items-center justify-center w-6">
//                   {item.icon}
//                 </div>
//                 {!isCollapsed && <span className="ml-3">{item.label}</span>}
//               </Link>
//             ))}
//             <button
//               onClick={handleLogout}
//               className="flex items-center justify-start w-full text-left text-[15px] font-medium px-3 py-2.5 text-white/90 hover:text-white hover:bg-white/10 rounded-md transition-colors mt-2"
//               title={isCollapsed ? "Logout" : ""}
//             >
//               <div className="flex items-center justify-center w-6">
//                 <LogOut size={20} />
//               </div>
//               {!isCollapsed && <span className="ml-3">Logout</span>}
//             </button>
//           </div>

//           {/* Collapse button */}
//           <div className="px-3 pt-3 mb-4 w-full flex justify-end border-t border-white/10">
//             <button
//               onClick={toggleCollapse}
//               className="flex items-center w-fit text-left text-[15px] font-medium px-3 py-2.5 text-white/90 hover:text-white hover:bg-white/10 rounded-md transition-colors"
//               title={isCollapsed ? "Expand" : "Collapse"}
//             >
//               {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;




import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  LogOut,
  X
} from "lucide-react";
import logo from "../assets/logo.png";
import { MentorSidebar, UserSidebar } from "../data/authsidebar";
import { useDispatch, useSelector } from "react-redux";
import { LogOutFunc } from "../api";
import { setAuth } from "../redux/features/authSlice";

const Sidebar = ({ isOpen, setIsSidebarOpen, onCollapse }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const sidebarRef = useRef(null);
  const dispatch = useDispatch();
  const { role, data } = useSelector((state) => state.auth);

  // Update parent component when collapse state changes
  useEffect(() => {
    if (onCollapse) {
      onCollapse(isCollapsed);
    }
  }, [isCollapsed, onCollapse]);

  // Handle click outside sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsSidebarOpen]);

  const handleLogout = async () => {
    const logout = await LogOutFunc({ role: role });
    if (logout.status === 200) {
      dispatch(setAuth({ role: null, data: null }));
      return navigate("/");
    }
    else {
      console.error("Logout failed:", logout.message);
    }
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed z-40 top-0 left-0 h-screen bg-gradient-to-br from-[#1e293b] via-[#1a3a6c] to-[#1e3a8a] text-white transition-all duration-500 transform shadow-2xl ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          } ${isCollapsed ? "w-16" : "w-52"} overflow-hidden`}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2c67a6]/10 via-[#0ea5e9]/10 to-[#3b82f6]/10 opacity-50"></div>
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#b5d5e5]/20 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-[#f7a35c]/20 rounded-full blur-xl"></div>

        {/* Mobile close button */}
        {!isCollapsed && (
          <button
            className="absolute top-4 right-2 p-2 rounded-full bg-[#b5d5e5]/20 backdrop-blur-sm hover:bg-[#b5d5e5]/30 text-white md:hidden transition-all duration-200 hover:scale-110"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        )}

        {/* Logo */}
        <div className="relative z-10 md:p-4 py-4 px-4 md:text-center border-b border-[#b5d5e5]/20 backdrop-blur-sm">
          <div className="flex items-center justify-center">
            <span className="text-3xl font-extrabold text-white py-2 drop-shadow-lg">
              {isCollapsed ? (
                <img 
                  src={logo} 
                  alt="logo" 
                  className="w-10 h-10 rounded-lg ring-2 ring-[#b5d5e5]/30 hover:ring-[#b5d5e5]/50 transition-all" 
                />
              ) : (
                <span className="bg-gradient-to-r from-white to-[#b5d5e5] bg-clip-text text-transparent">
                  मार्गदर्शक
                </span>
              )}
            </span>
          </div>
        </div>

        {/* Sidebar content */}
        <div className="relative z-10 flex flex-col h-[calc(100%-4rem)] py-4">
          <div className="flex-1 px-3 space-y-2">
            {(role === 'mentor' ? MentorSidebar : role === 'user' ? UserSidebar : []).map((item) => (
              <Link
                key={item.component}
                to={item.component}
                className={`group flex items-center justify-start w-full text-left text-[15px] font-medium px-3 py-3 rounded-xl transition-all duration-300 ${item.component === location.pathname
                  ? "bg-gradient-to-r from-[#0ea5e9] to-[#2c67a6] text-white shadow-lg transform scale-105"
                  : "text-white/80 hover:text-white hover:bg-[#b5d5e5]/10 backdrop-blur-sm hover:transform hover:scale-105"
                  }`}
                title={isCollapsed ? item.label : ""}
              >
                <div className={`flex items-center justify-center w-6 transition-all duration-300 ${
                  item.component === location.pathname ? "text-white" : "text-[#b5d5e5] group-hover:text-white"
                }`}>
                  {item.icon}
                </div>
                {!isCollapsed && (
                  <span className="ml-3 font-medium transition-all duration-300">
                    {item.label}
                  </span>
                )}
                {item.component === location.pathname && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full opacity-80"></div>
                )}
              </Link>
            ))}
            
            <button
              onClick={handleLogout}
              className="group flex items-center justify-start w-full text-left text-[15px] font-medium px-3 py-3 text-white/80 hover:text-white hover:bg-red-500/20 backdrop-blur-sm rounded-xl transition-all duration-300 mt-4 hover:transform hover:scale-105"
              title={isCollapsed ? "Logout" : ""}
            >
              <div className="flex items-center justify-center w-6 text-red-300 group-hover:text-white transition-all duration-300">
                <LogOut size={20} />
              </div>
              {!isCollapsed && <span className="ml-3 font-medium">Logout</span>}
            </button>
          </div>

          {/* Collapse button */}
          <div className="px-3 pt-4 mb-4 w-full flex justify-end border-t border-[#b5d5e5]/20">
            <button
              onClick={toggleCollapse}
              className="group flex items-center w-fit text-left text-[15px] font-medium px-3 py-3 text-white/80 hover:text-white hover:bg-[#b5d5e5]/20 backdrop-blur-sm rounded-xl transition-all duration-300 hover:transform hover:scale-110"
              title={isCollapsed ? "Expand" : "Collapse"}
            >
              <div className="text-[#b5d5e5] group-hover:text-white transition-all duration-300">
                {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;