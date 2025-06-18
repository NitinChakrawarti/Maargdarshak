import {
    Home,
    BookOpen,
    FileText,
    Users,
    MessageCircle,
    User,
} from "lucide-react";


export const MentorSidebar = [
    { label: "Home", component: "/mentor/home", icon: <Home size={20} /> },
    { label: "Resources", component: "/mentor/resources", icon: <BookOpen size={20} /> },
    { label: "Blogs", component: "/mentor/blog", icon: <FileText size={20} /> },
    { label: "Learners", component: "/mentor/learners", icon: <User size={20} /> },
    { label: "Chat", component: "/chat", icon: <MessageCircle size={20} /> },
];

export const UserSidebar = [
    { label: "Home", component: "/user/home", icon: <Home size={20} /> },
    { label: "Explore", component: "/user/resources", icon: <BookOpen size={20} /> },
    { label: "Chat", component: "/chat", icon: <MessageCircle size={20} /> },
    { label: "Favourites", component: "/user/bookmarks", icon: <FileText size={20} /> },
    { label: "Profile", component: "/user/profile", icon: <Users size={20} /> },
]