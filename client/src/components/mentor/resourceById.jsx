// import { useState } from "react";
// import {
//     Star,
//     Bookmark,
//     BookmarkCheck,
//     Plus,
//     Check,
//     Circle,
//     PlayCircle,
//     ExternalLink,
//     Clock,
//     Users,
//     Award,
//     ChevronRight,
//     MessageSquare,
//     Share2,
//     Download
// } from "lucide-react";
// import Layout from "../../layout/auth/layout";

// const ResourceDetailView = () => {
//     const [resource] = useState({
//         "_id": "683c95082877f6e472628b37",
//         "title": "Complete Web Development Bootcamp",
//         "description": "Master modern web development with this comprehensive bootcamp covering HTML, CSS, JavaScript, React, Node.js, and database management. Build real-world projects and deploy them to production.",
//         "domain": ["Web Development", "JavaScript", "React", "Node.js"],
//         "rating": 4.8,
//         "reviews": [
//             { id: 1, user: "John Doe", rating: 5, comment: "Excellent course!" },
//             { id: 2, user: "Jane Smith", rating: 4, comment: "Very comprehensive" },
//             { id: 3, user: "Mike Johnson", rating: 5, comment: "Best investment!" }
//         ],
//         "banner": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop",
//         "resource": [
//             {
//                 "type": "video",
//                 "title": "Introduction to Web Development",
//                 "url": "https://example.com/video1",
//                 "duration": "15 min"
//             },
//             {
//                 "type": "video",
//                 "title": "HTML Fundamentals",
//                 "url": "https://example.com/video2",
//                 "duration": "45 min"
//             },
//             {
//                 "type": "video",
//                 "title": "CSS Styling and Layout",
//                 "url": "https://example.com/video3",
//                 "duration": "60 min"
//             },
//             {
//                 "type": "assignment",
//                 "title": "Build Your First Website",
//                 "url": "https://example.com/assignment1",
//                 "duration": "2 hours"
//             },
//             {
//                 "type": "video",
//                 "title": "JavaScript Basics",
//                 "url": "https://example.com/video4",
//                 "duration": "90 min"
//             },
//             {
//                 "type": "video",
//                 "title": "React Components and State",
//                 "url": "https://example.com/video5",
//                 "duration": "75 min"
//             },
//             {
//                 "type": "project",
//                 "title": "Build a Todo App with React",
//                 "url": "https://example.com/project1",
//                 "duration": "4 hours"
//             },
//             {
//                 "type": "video",
//                 "title": "Node.js and Express",
//                 "url": "https://example.com/video6",
//                 "duration": "80 min"
//             },
//             {
//                 "type": "project",
//                 "title": "Full Stack Application",
//                 "url": "https://example.com/project2",
//                 "duration": "8 hours"
//             }
//         ],
//         "instructor": "Sarah Wilson",
//         "totalDuration": "20+ hours",
//         "studentsEnrolled": 15420,
//         "lastUpdated": "January 2025"
//     });

//     const [courseProgress, setCourseProgress] = useState({});
//     const [isBookmarked, setIsBookmarked] = useState(false);
//     const [isAddedToList, setIsAddedToList] = useState(false);

//     const handleProgressChange = (resourceId, status) => {
//         setCourseProgress(prev => ({
//             ...prev,
//             [resourceId]: status
//         }));
//     };

//     const getProgressIcon = (resourceId) => {
//         const status = courseProgress[resourceId] || 'not-started';
//         switch (status) {
//             case 'completed':
//                 return <Check className="w-5 h-5 text-green-600" />;
//             case 'in-progress':
//                 return <Circle className="w-5 h-5 text-yellow-500 fill-current" />;
//             default:
//                 return <Circle className="w-5 h-5 text-gray-300" />;
//         }
//     };

//     const getResourceIcon = (type) => {
//         switch (type) {
//             case 'video':
//                 return <PlayCircle className="w-5 h-5 text-blue-600" />;
//             case 'assignment':
//                 return <Award className="w-5 h-5 text-purple-600" />;
//             case 'project':
//                 return <Download className="w-5 h-5 text-green-600" />;
//             default:
//                 return <ExternalLink className="w-5 h-5 text-gray-600" />;
//         }
//     };

//     const calculateProgress = () => {
//         const total = resource.resource.length;
//         const completed = Object.values(courseProgress).filter(status => status === 'completed').length;
//         return Math.round((completed / total) * 100);
//     };

//     const renderStars = (rating) => {
//         return (
//             <div className="flex items-center space-x-1">
//                 {[...Array(5)].map((_, i) => (
//                     <Star
//                         key={i}
//                         className={`w-5 h-5 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
//                     />
//                 ))}
//                 <span className="text-gray-600 ml-2">({rating})</span>
//             </div>
//         );
//     };

//     return (
//         <Layout>
//             <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
//                 {/* Hero Section */}
//                 <div className="relative h-96 overflow-hidden">
//                     <img
//                         src={resource.banner}
//                         alt={resource.title}
//                         className="w-full h-full object-cover"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

//                     <div className="absolute bottom-0 left-0 right-0 p-8">
//                         <div className="max-w-6xl mx-auto text-white">
//                             <div className="flex flex-wrap gap-2 mb-4">
//                                 {resource.domain.map((domain, index) => (
//                                     <span
//                                         key={index}
//                                         className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium"
//                                     >
//                                         {domain}
//                                     </span>
//                                 ))}
//                             </div>
//                             <h1 className="text-4xl md:text-5xl font-bold mb-4">{resource.title}</h1>
//                             <div className="flex items-center space-x-6">
//                                 {renderStars(resource.rating)}
//                                 <span className="flex items-center">
//                                     <Users className="w-5 h-5 mr-2" />
//                                     {resource.studentsEnrolled.toLocaleString()} students
//                                 </span>
//                                 <span className="flex items-center">
//                                     <Clock className="w-5 h-5 mr-2" />
//                                     {resource.totalDuration}
//                                 </span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="max-w-6xl mx-auto px-4 py-8">
//                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                         {/* Main Content */}
//                         <div className="lg:col-span-2 space-y-8">
//                             {/* Course Description */}
//                             <div className="bg-white rounded-2xl p-6 shadow-lg">
//                                 <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Course</h2>
//                                 <p className="text-gray-600 leading-relaxed">{resource.description}</p>
//                                 <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
//                                     <div className="text-center">
//                                         <div className="text-2xl font-bold text-blue-600">{resource.resource.length}</div>
//                                         <div className="text-sm text-gray-600">Lessons</div>
//                                     </div>
//                                     <div className="text-center">
//                                         <div className="text-2xl font-bold text-green-600">{calculateProgress()}%</div>
//                                         <div className="text-sm text-gray-600">Complete</div>
//                                     </div>
//                                     <div className="text-center">
//                                         <div className="text-2xl font-bold text-purple-600">{resource.reviews.length}</div>
//                                         <div className="text-sm text-gray-600">Reviews</div>
//                                     </div>
//                                     <div className="text-center">
//                                         <div className="text-2xl font-bold text-orange-600">{resource.rating}</div>
//                                         <div className="text-sm text-gray-600">Rating</div>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Course Content */}
//                             <div className="bg-white rounded-2xl p-6 shadow-lg">
//                                 <div className="flex items-center justify-between mb-6">
//                                     <h2 className="text-2xl font-bold text-gray-800">Course Content</h2>
//                                     <div className="text-sm text-gray-600">
//                                         {Object.values(courseProgress).filter(status => status === 'completed').length} of {resource.resource.length} completed
//                                     </div>
//                                 </div>

//                                 {/* Progress Bar */}
//                                 <div className="mb-6">
//                                     <div className="flex justify-between text-sm text-gray-600 mb-2">
//                                         <span>Overall Progress</span>
//                                         <span>{calculateProgress()}%</span>
//                                     </div>
//                                     <div className="w-full bg-gray-200 rounded-full h-3">
//                                         <div
//                                             className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500"
//                                             style={{ width: `${calculateProgress()}%` }}
//                                         ></div>
//                                     </div>
//                                 </div>

//                                 <div className="space-y-3">
//                                     {resource.resource.map((item, index) => (

//                                         <div
//                                             key={index}
//                                             className="flex items-center space-x-4 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
//                                         >
//                                             {/* Progress Checkbox */}
//                                             <div className="flex space-x-2">
//                                                 <button
//                                                     onClick={() => handleProgressChange(index, 'completed')}
//                                                     className={`p-1 rounded-full transition-colors ${courseProgress[index] === 'completed'
//                                                             ? 'bg-green-100 text-green-600'
//                                                             : 'hover:bg-gray-100'
//                                                         }`}
//                                                     title="Mark as completed"
//                                                 >
//                                                     <Check className="w-4 h-4" />
//                                                 </button>
//                                                 <button
//                                                     onClick={() => handleProgressChange(index, 'in-progress')}
//                                                     className={`p-1 rounded-full transition-colors ${courseProgress[index] === 'in-progress'
//                                                             ? 'bg-yellow-100 text-yellow-600'
//                                                             : 'hover:bg-gray-100'
//                                                         }`}
//                                                     title="Mark as in progress"
//                                                 >
//                                                     <Circle className="w-4 h-4" />
//                                                 </button>
//                                             </div>

//                                             {/* Progress Status */}
//                                             <div className="flex-shrink-0">
//                                                 {getProgressIcon(index)}
//                                             </div>

//                                             {/* Content Type Icon */}
//                                             <div className="flex-shrink-0">
//                                                 {getResourceIcon(item.type)}
//                                             </div>

//                                             {/* Content Info */}
//                                             <div className="flex-1">
//                                                 <h3 className="font-semibold text-gray-800">{item.title}</h3>
//                                                 <div className="flex items-center space-x-4 text-sm text-gray-600">
//                                                     <span className="capitalize">{item.type}</span>
//                                                     {item.duration && (
//                                                         <span className="flex items-center">
//                                                             <Clock className="w-4 h-4 mr-1" />
//                                                             {item.duration}
//                                                         </span>
//                                                     )}
//                                                 </div>
//                                             </div>

//                                             {/* Action Button */}
//                                             <button
//                                                 onClick={() => window.open(item.url, '_blank')}
//                                                 className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                                             >
//                                                 <ChevronRight className="w-5 h-5" />
//                                             </button>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>

//                             {/* Reviews Section */}
//                             <div className="bg-white rounded-2xl p-6 shadow-lg">
//                                 <h2 className="text-2xl font-bold text-gray-800 mb-6">Student Reviews</h2>
//                                 <div className="space-y-4">
//                                     {resource.reviews.map((review) => (
//                                         <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
//                                             <div className="flex items-center justify-between mb-2">
//                                                 <span className="font-semibold text-gray-800">{review.user}</span>
//                                                 <div className="flex">
//                                                     {[...Array(5)].map((_, i) => (
//                                                         <Star
//                                                             key={i}
//                                                             className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
//                                                         />
//                                                     ))}
//                                                 </div>
//                                             </div>
//                                             <p className="text-gray-600">{review.comment}</p>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Sidebar */}
//                         <div className="space-y-6">
//                             {/* Action Buttons */}
//                             <div className="bg-white rounded-2xl p-6 shadow-lg">
//                                 <div className="space-y-4">
//                                     <button
//                                         onClick={() => setIsBookmarked(!isBookmarked)}
//                                         className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-semibold transition-all ${isBookmarked
//                                                 ? 'bg-yellow-100 text-yellow-800 border-2 border-yellow-300'
//                                                 : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                                             }`}
//                                     >
//                                         {isBookmarked ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
//                                         <span>{isBookmarked ? 'Bookmarked' : 'Bookmark Course'}</span>
//                                     </button>

//                                     <button
//                                         onClick={() => setIsAddedToList(!isAddedToList)}
//                                         className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-semibold transition-all ${isAddedToList
//                                                 ? 'bg-green-600 text-white'
//                                                 : 'bg-blue-600 text-white hover:bg-blue-700'
//                                             }`}
//                                     >
//                                         {isAddedToList ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
//                                         <span>{isAddedToList ? 'Added to My List' : 'Add to My List'}</span>
//                                     </button>

//                                     <button className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 font-semibold transition-all">
//                                         <Share2 className="w-5 h-5" />
//                                         <span>Share Course</span>
//                                     </button>
//                                 </div>
//                             </div>

//                             {/* Course Info */}
//                             <div className="bg-white rounded-2xl p-6 shadow-lg">
//                                 <h3 className="text-lg font-bold text-gray-800 mb-4">Course Information</h3>
//                                 <div className="space-y-3">
//                                     <div className="flex justify-between">
//                                         <span className="text-gray-600">Instructor:</span>
//                                         <span className="font-semibold">{resource.instructor}</span>
//                                     </div>
//                                     <div className="flex justify-between">
//                                         <span className="text-gray-600">Duration:</span>
//                                         <span className="font-semibold">{resource.totalDuration}</span>
//                                     </div>
//                                     <div className="flex justify-between">
//                                         <span className="text-gray-600">Students:</span>
//                                         <span className="font-semibold">{resource.studentsEnrolled.toLocaleString()}</span>
//                                     </div>
//                                     <div className="flex justify-between">
//                                         <span className="text-gray-600">Last Updated:</span>
//                                         <span className="font-semibold">{resource.lastUpdated}</span>
//                                     </div>
//                                     <div className="flex justify-between">
//                                         <span className="text-gray-600">Rating:</span>
//                                         <span className="font-semibold">{resource.rating}/5</span>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Quick Stats */}
//                             <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
//                                 <h3 className="text-lg font-bold mb-4">Your Progress</h3>
//                                 <div className="space-y-3">
//                                     <div className="flex justify-between">
//                                         <span>Completed:</span>
//                                         <span className="font-bold">
//                                             {Object.values(courseProgress).filter(status => status === 'completed').length}/{resource.resource.length}
//                                         </span>
//                                     </div>
//                                     <div className="flex justify-between">
//                                         <span>In Progress:</span>
//                                         <span className="font-bold">
//                                             {Object.values(courseProgress).filter(status => status === 'in-progress').length}
//                                         </span>
//                                     </div>
//                                     <div className="flex justify-between">
//                                         <span>Overall:</span>
//                                         <span className="font-bold">{calculateProgress()}%</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </Layout>
//     );
// };

// export default ResourceDetailView;



































import { useState } from "react";
import {
    Star,
    Bookmark,
    BookmarkCheck,
    Plus,
    Check,
    Circle,
    PlayCircle,
    ExternalLink,
    Clock,
    Users,
    Award,
    ChevronRight,
    MessageSquare,
    Share2,
    Download
} from "lucide-react";
import Layout from "../../layout/auth/layout";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { GetResourceById } from "../../api/index";

const ResourceDetailView = () => {

    const [courseProgress, setCourseProgress] = useState({});
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isAddedToList, setIsAddedToList] = useState(false);

    const handleProgressChange = (resourceId, status) => {
        setCourseProgress(prev => ({
            ...prev,
            [resourceId]: status
        }));
    };

    const [resource, setResource] = useState({
        resource: [],
        domain: [],
        reviews: [],
        studentsEnrolled: 0,
        rating: 0
    });

    const location = useLocation();
    const resourceId = location.pathname.split('/').pop();

    useEffect(() => {
        fetchResource(resourceId);
    }, [resourceId]);

    const fetchResource = async (resourceId) => {
        try {
            const response = await GetResourceById(resourceId);
            if (response.status === 200) {
                const data = response.data.data;
                if (data) {
                    setResource(data);
                } else {
                    console.warn("API returned null data");
                    setResource({
                        resource: [],
                        domain: [],
                        reviews: [],
                        studentsEnrolled: 0,
                        rating: 0
                    });
                }
            } else {
                console.error("Failed to fetch resource:", response.message);
            }
        } catch (error) {
            console.error("Error fetching resource:", error);
        }
    };

    useEffect(() => {
        if (resourceId) {
            fetchResource(resourceId);
        }
    }, [resourceId]);

    const getProgressIcon = (resourceId) => {
        const status = courseProgress[resourceId] || 'not-started';
        switch (status) {
            case 'completed':
                return <Check className="w-5 h-5 text-green-600" />;
            case 'in-progress':
                return <Circle className="w-5 h-5 text-yellow-500 fill-current" />;
            default:
                return <Circle className="w-5 h-5 text-gray-300" />;
        }
    };

    const getResourceIcon = (type) => {
        switch (type) {
            case 'video':
                return <PlayCircle className="w-5 h-5 text-blue-600" />;
            case 'assignment':
                return <Award className="w-5 h-5 text-purple-600" />;
            case 'project':
                return <Download className="w-5 h-5 text-green-600" />;
            default:
                return <ExternalLink className="w-5 h-5 text-gray-600" />;
        }
    };

    const calculateProgress = () => {
        const total = resource.resource.length;
        const completed = Object.values(courseProgress).filter(status => status === 'completed').length;
        return Math.round((completed / total) * 100);
    };

    const renderStars = (rating) => {
        return (
            <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                ))}
                <span className="text-gray-600 ml-2">({rating})</span>
            </div>
        );
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
                {/* Hero Section */}
                <div className="relative h-96 overflow-hidden">
                    <img
                        src={resource.banner}
                        alt={resource.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-8">
                        <div className="max-w-6xl mx-auto text-white">
                            <div className="flex flex-wrap gap-2 mb-4">
                                {resource.domain.map((domain, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium"
                                    >
                                        {domain}
                                    </span>
                                ))}
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">{resource.title}</h1>
                            <div className="flex items-center space-x-6">
                                {renderStars(resource.rating)}
                                <span className="flex items-center">
                                    <Users className="w-5 h-5 mr-2" />
                                    {resource?.studentsEnrolled?.toLocaleString()} students
                                </span>
                                <span className="flex items-center">
                                    <Clock className="w-5 h-5 mr-2" />
                                    {resource.totalDuration}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Course Description */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Course</h2>
                                <p className="text-gray-600 leading-relaxed">{resource.description}</p>
                                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-blue-600">{resource.resource.length}</div>
                                        <div className="text-sm text-gray-600">Lessons</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-green-600">{calculateProgress()}%</div>
                                        <div className="text-sm text-gray-600">Complete</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-purple-600">{resource.reviews.length}</div>
                                        <div className="text-sm text-gray-600">Reviews</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-orange-600">{resource.rating}</div>
                                        <div className="text-sm text-gray-600">Rating</div>
                                    </div>
                                </div>
                            </div>

                            {/* Course Content */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-gray-800">Course Content</h2>
                                    <div className="text-sm text-gray-600">
                                        {Object.values(courseProgress).filter(status => status === 'completed').length} of {resource.resource.length} completed
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="mb-6">
                                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                                        <span>Overall Progress</span>
                                        <span>{calculateProgress()}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div
                                            className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500"
                                            style={{ width: `${calculateProgress()}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {resource.resource.map((item, index) => (

                                        <div
                                            key={index}
                                            className="flex items-center space-x-4 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                                        >
                                            {/* Progress Checkbox */}
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleProgressChange(index, 'completed')}
                                                    className={`p-1 rounded-full transition-colors ${courseProgress[index] === 'completed'
                                                        ? 'bg-green-100 text-green-600'
                                                        : 'hover:bg-gray-100'
                                                        }`}
                                                    title="Mark as completed"
                                                >
                                                    <Check className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleProgressChange(index, 'in-progress')}
                                                    className={`p-1 rounded-full transition-colors ${courseProgress[index] === 'in-progress'
                                                        ? 'bg-yellow-100 text-yellow-600'
                                                        : 'hover:bg-gray-100'
                                                        }`}
                                                    title="Mark as in progress"
                                                >
                                                    <Circle className="w-4 h-4" />
                                                </button>
                                            </div>

                                            {/* Progress Status */}
                                            <div className="flex-shrink-0">
                                                {getProgressIcon(index)}
                                            </div>

                                            {/* Content Type Icon */}
                                            <div className="flex-shrink-0">
                                                {getResourceIcon(item.type)}
                                            </div>

                                            {/* Content Info */}
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-800">{item.title}</h3>
                                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                                    <span className="capitalize">{item.type}</span>
                                                    {item.duration && (
                                                        <span className="flex items-center">
                                                            <Clock className="w-4 h-4 mr-1" />
                                                            {item.duration}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Action Button */}
                                            <button
                                                onClick={() => window.open(item.url, '_blank')}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            >
                                                <ChevronRight className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Reviews Section */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">Student Reviews</h2>
                                <div className="space-y-4">
                                    {resource.reviews.map((review) => (
                                        <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="font-semibold text-gray-800">{review.user}</span>
                                                <div className="flex">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-gray-600">{review.comment}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Action Buttons */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg">
                                <div className="space-y-4">
                                    <button
                                        onClick={() => setIsBookmarked(!isBookmarked)}
                                        className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-semibold transition-all ${isBookmarked
                                            ? 'bg-yellow-100 text-yellow-800 border-2 border-yellow-300'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {isBookmarked ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
                                        <span>{isBookmarked ? 'Bookmarked' : 'Bookmark Course'}</span>
                                    </button>

                                    <button
                                        onClick={() => setIsAddedToList(!isAddedToList)}
                                        className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-semibold transition-all ${isAddedToList
                                            ? 'bg-green-600 text-white'
                                            : 'bg-brand-navy text-white hover:bg-dark-blue'
                                            }`}
                                    >
                                        {isAddedToList ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                                        <span>{isAddedToList ? 'Added to My List' : 'Add to My List'}</span>
                                    </button>

                                    <button className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 font-semibold transition-all">
                                        <Share2 className="w-5 h-5" />
                                        <span>Share Course</span>
                                    </button>
                                </div>
                            </div>

                            {/* Course Info */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg">
                                <h3 className="text-lg font-bold text-gray-800 mb-4">Course Information</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Instructor:</span>
                                        <span className="font-semibold">{resource.instructor}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Duration:</span>
                                        <span className="font-semibold">{resource.totalDuration}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Students:</span>
                                        <span className="font-semibold">{resource.studentsEnrolled?.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Last Updated:</span>
                                        <span className="font-semibold">{resource.lastUpdated}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Rating:</span>
                                        <span className="font-semibold">{resource.rating}/5</span>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="bg-gradient-to-r from-dark-blue to-brand-navy rounded-2xl p-6 text-white">
                                <h3 className="text-lg font-bold mb-4">Your Progress</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span>Completed:</span>
                                        <span className="font-bold">
                                            {Object.values(courseProgress).filter(status => status === 'completed').length}/{resource.resource.length}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>In Progress:</span>
                                        <span className="font-bold">
                                            {Object.values(courseProgress).filter(status => status === 'in-progress').length}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Overall:</span>
                                        <span className="font-bold">{calculateProgress()}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ResourceDetailView;