import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, User, LogOut, Settings, ChevronDown, Menu } from "lucide-react";
import { LogOutFunc } from "../api"; // Adjust the import path as necessary
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../redux/features/authSlice";

const Header = ({ toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { role, data } = useSelector((state) => state.auth);
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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


  return (
    <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 md:px-6 sticky top-0 z-30">
      <div className="flex items-center">
        {/* Mobile menu button */}
        <button
          onClick={toggleSidebar}
          className="md:hidden mr-4 p-2 text-gray-600 hover:text-brand-blue rounded-md hover:bg-gray-100 transition-colors"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-bold text-brand-blue"></h1>
      </div>

      <div className="flex items-center space-x-4">
        {/* Notification Bell */}
        <button className="relative p-2 text-gray-600 hover:text-brand-blue rounded-full hover:bg-gray-100 transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center text-white">
              <User size={18} />
            </div>
            <ChevronDown size={16} className="text-gray-600" />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100">
              <button
                onClick={() => {
                  setIsDropdownOpen(false);
                  navigate("/profile");
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <User size={16} className="mr-3" />
                Profile
              </button>

              <div className="border-t border-gray-100 my-1"></div>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                <LogOut size={16} className="mr-3" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 