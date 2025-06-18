
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
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
                                {/* Navigation item */}
                                <div className={`relative flex flex-col items-center px-3 py-2 rounded-2xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-2
                                    ${isActive
                                        ? "bg-gradient-to-r  text-brand-navy  scale-110"
                                        : "text-brand-navy hover:text-white hover:bg-brand-navy/50"
                                    }`}
                                >
                                    {/* Icon container with bounce animation */}
                                    <div className={`w-7 h-7 flex items-center justify-center  transition-all duration-300 ${isActive ? "animate-bounce" : "group-hover:animate-pulse"
                                        }`}>
                                        {item.label === "Profile" ? (
                                            <div className="relative">
                                                <img
                                                    src={user?.profile}
                                                    alt="profile"
                                                    className={`w-7 h-7 rounded-full object-cover border-2 transition-all duration-300 ${isActive
                                                            ? "border-white shadow-lg shadow-cyan-400/50"
                                                            : "border-white/30 group-hover:border-white/60"
                                                        }`}
                                                />
                                            
                                            </div>
                                        ) : (
                                            <div className={`transition-all duration-300 ${isActive ? "text-brand-navy" : "text-soft-gray "
                                                }`}>
                                                {item.icon}
                                            </div>
                                        )}
                                    </div>

                                    {/* Label with fade animation */}
                                    <span className={`text-xs font-medium transition-all duration-300 ${isActive
                                            ? "text-brand-navy opacity-100"
                                            : "text-soft-gray  group-hover:opacity-100"
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
            </div>
        </div>
    );
};

export default BottomNav;