import { useState } from "react";
import {
    Lock,
    Star,

} from "lucide-react";
import Layout from "../../layout/auth/layout";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { getCourseProgress, GetResourceById, UpdateCourseProgress } from "../../api/index";
import { useSelector } from "react-redux";
import CourseModule from "./courseModel";
import CourseSidebar from "./resourceSidebar";
import CourseBanner from "./courseBanner";
import Layoutcomponent from "../../layout/landing/layoutcomponent";
import { useCallback } from "react";
import { debounce } from "lodash";
import { toast } from "react-toastify";
import GenerateCertificate from "./generateCertificate";


const ResourceDetailView = () => {

    const [courseProgress, setCourseProgress] = useState({});
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isAddedToList, setIsAddedToList] = useState(false);
    const location = useLocation();
    const resourceId = location.pathname.split('/').pop();
    const { user } = useSelector((state) => state.user);



    const handleProgressChange = (lessonId, status) => {
        setCourseProgress(prev => ({
            ...prev,
            [lessonId]: status
        }));
        const data = {
            userId: user._id,
            courseId: resourceId,
            Progress: {
                ...courseProgress,
                [lessonId]: status
            }
        };
        console.log("Progress Data:", data);
        
        handleProgressChangeImmediate(data);
    };

    const [resource, setResource] = useState({
        modules: [],
        domain: [],
        reviews: [],
        studentsEnrolled: 0,
        rating: 0
    });

    const fetchResource = async (resourceId) => {
        const response = await GetResourceById(resourceId);
        if (response.status === 200) {
            const data = response.data.data;
            if (data) {
                setResource(data);
            } else {
                console.warn("API returned null data");
                setResource({
                    modules: [],
                    domain: [],
                    reviews: [],
                    studentsEnrolled: 0,
                    rating: 0
                });
            }
        } else {
            console.error("Failed to fetch resource:", response.message);
        }
    };

    const fetchCourseProgress = async (resourceId) => {
        const response = await getCourseProgress(resourceId);

        if (response.status === 200) {
            setCourseProgress(response.data.data.Progress);
        } else {
            toast.error("Failed to fetch course progress");
        }
    };

    const handleProgressChangeImmediate = useCallback(
        debounce(async (data) => {
            console.log(data);
            
            const response = await UpdateCourseProgress(data);
            if (response.status === 200) {
                toast.success("Course progress updated successfully");
            } else {
                toast.error("Failed to update course progress");
            }
        }, 1000),
        [user?._id]
    );


    useEffect(() => {
        if (resourceId) {
            fetchResource(resourceId);
        }
        const usercourse = user?.courses || [];
        const isEnrolled = usercourse.some(course => course.courseId === resourceId);
        if (isEnrolled) {

            fetchCourseProgress(resourceId);
            setIsAddedToList(true);
        }

        const userFavorites = user?.savedItems || [];
        const isBookmarked = userFavorites.some(favorite => favorite === resourceId);

        if (isBookmarked) {
            setIsBookmarked(true);
        }
    }, [resourceId, user]);


    const calculateProgress = () => {
        const total = resource.modules.reduce((count, module) => count + (module.lessons?.length || 0), 0)
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



    const backurl = location?.pathname.split('/').slice(0, -1).join('/') || '/';


    const detailContent = (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            {/* Hero Section */}
            <CourseBanner
                resource={resource}
                backUrl={backurl}
                renderStars={renderStars}
            />

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
                                    <div className="text-2xl font-bold text-blue-600">{resource.modules.length}</div>
                                    <div className="text-sm text-gray-600">Modules</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600">{calculateProgress()}%</div>
                                    <div className="text-sm text-gray-600">Complete</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-purple-600">
                                        {resource.modules.reduce((count, module) => count + (module.lessons?.length || 0), 0)}
                                    </div>
                                    <div className="text-sm text-gray-600">Lessons</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-orange-600">{resource.rating}</div>
                                    <div className="text-sm text-gray-600">Rating</div>
                                </div>
                            </div>
                        </div>
                        {/* Progress Bar */}
                        <div className="mb-6 relative">
                            {/* Overlay Lock Notice */}
                            {!isAddedToList && (
                                <div className="absolute inset-0 z-30 flex items-center justify-center  rounded-2xl backdrop-blur-sm">
                                    <div className="flex items-center gap-2 bg-white px-6 py-4 rounded-xl shadow-lg text-gray-800 text-sm font-medium">
                                        <Lock className="w-5 h-5 text-gray-600" />
                                        <span>Enroll in this course to track progress and unlock all features.</span>
                                    </div>
                                </div>
                            )}

                            {/* Progress Bar */}
                            <div className={`relative z-10 ${!isAddedToList ? 'opacity-50 pointer-events-none select-none' : ''}`}>
                                <div className="flex justify-between text-sm text-gray-600 px-4 mb-2">
                                    <span>Overall Progress</span>
                                    <span>{calculateProgress()}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                    <div
                                        className="bg-gradient-to-r from-green-400 to-green-600 h-full rounded-full transition-all duration-500"
                                        style={{ width: `${calculateProgress()}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>


                        <div className="space-y-6">
                            {resource.modules.map((module, moduleIndex) => (
                                <CourseModule
                                    key={moduleIndex}
                                    module={module}
                                    moduleIndex={moduleIndex}
                                    courseProgress={courseProgress}
                                    isAddedToList={isAddedToList}
                                    handleProgressChange={handleProgressChange}
                                />
                            ))}
                            {
                                calculateProgress() >= 100 && isAddedToList ? (
                                    <GenerateCertificate
                                        resourceId={resourceId}
                                        user={user}
                                        courseProgress={courseProgress}
                                        resource={resource}
                                    />
                                ) :
                                    <div className="flex items-center p-4 bg-amber-50 border border-amber-200 rounded-lg">
                                        <svg
                                            className="w-5 h-5 text-amber-500 mr-3 flex-shrink-0"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <p className="text-amber-800 font-medium">
                                            You need to complete all lessons to get a certificate.
                                        </p>
                                    </div>
                            }

                        </div>

                        {/* Reviews Section */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Student Reviews</h2>
                            <div className="space-y-4">
                                {
                                    resource.reviews.length > 0 ? (
                                        resource.reviews.map((review, index) => (
                                            <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
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
                                        ))
                                    ) :
                                        <p className="text-gray-600">No reviews yet. </p>
                                }
                            </div>
                        </div>
                    </div>


                    <CourseSidebar
                        isBookmarked={isBookmarked}
                        isAddedToList={isAddedToList}
                        setIsAddedToList={setIsAddedToList}
                        setIsBookmarked={setIsBookmarked}
                        user={user}
                        resource={resource}
                        resourceId={resourceId}
                        courseProgress={courseProgress}
                        calculateProgress={calculateProgress}
                    />
                </div>
            </div>
        </div>
    )
    return (

        user?.role === "user" ?
            <Layout>
                {detailContent}
            </Layout>
            :
            <Layoutcomponent>
                {detailContent}
            </Layoutcomponent>

    );
};

export default ResourceDetailView;