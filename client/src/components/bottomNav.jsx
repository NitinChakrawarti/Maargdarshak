
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MentorSidebar, UserSidebar } from "../data/authsidebar";

const BottomNav = () => {
    const location = useLocation();
    const { role } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.user);

    const navItems = role === "mentor" ? MentorSidebar : role === "user" ? UserSidebar : [];

    return (
        <div className="fixed  bottom-0 left-0 right-0 z-50">
            {/* Background with glassmorphism effect */}
            <div className=" shadow-2xl  bg-bg/90 backdrop-blur-2xl">
                {/* Animated background glow */}
                <div className="absolute inset-0 bg-bg/90 backdrop-blur-2xl  animate-pulse"></div>
                
                {/* Navigation container */}
                <div className="relative flex justify-around items-center pt-2 pb-1 px-4">
                    {navItems.map((item, index) => {
                        const isActive = item.component === location.pathname;
                        
                        return (
                            <Link
                                key={item.component}
                                to={item.component}
                                className="relative group"
                                style={{
                                    animationDelay: `${index * 100}ms`
                                }}
                            >
                                {/* Active indicator background */}
                                {isActive && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-brand-blue to-brand-sky rounded-2xl blur-sm opacity-70 animate-pulse"></div>
                                )}
                                
                                {/* Navigation item */}
                                <div className={`relative flex flex-col items-center px-3 py-2 rounded-2xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-1
                                    ${isActive 
                                        ? "bg-gradient-to-r  text-brand-navy shadow-lg shadow-cyan-500/30 scale-105" 
                                        : "text-brand-navy hover:text-white hover:bg-brand-navy/50 hover:shadow-lg hover:shadow-purple-500/20"
                                    }`}
                                >
                                    {/* Icon container with bounce animation */}
                                    <div className={`w-7 h-7 flex items-center justify-center  transition-all duration-300 ${
                                        isActive ? "animate-bounce" : "group-hover:animate-pulse"
                                    }`}>
                                        {item.label === "Profile" ? (
                                            <div className="relative">
                                                <img
                                                    src={user?.profile}
                                                    alt="profile"
                                                    className={`w-7 h-7 rounded-full object-cover border-2 transition-all duration-300 ${
                                                        isActive 
                                                            ? "border-white shadow-lg shadow-cyan-400/50" 
                                                            : "border-white/30 group-hover:border-white/60"
                                                    }`}
                                                />
                                                {/* Online indicator */}
                                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-ping"></div>
                                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                                            </div>
                                        ) : (
                                            <div className={`transition-all duration-300 ${
                                                isActive ? "text-brand-navy" : "text-brand-navy group-hover:text-brand-blue"
                                            }`}>
                                                {item.icon}
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Label with fade animation */}
                                    <span className={`text-xs font-medium transition-all duration-300 ${
                                        isActive 
                                            ? "text-brand-navy opacity-100" 
                                            : "text-brand-navy group-hover:text-brand-blue group-hover:opacity-100"
                                    }`}>
                                        {item.label}
                                    </span>
                                </div>
                                
                                {/* Hover effect ripple */}
                                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/20 rounded-2xl animate-pulse"></div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
{/*                 
                Bottom accent line
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 animate-pulse"></div> */}
            </div>
        </div>
    );
};

export default BottomNav;