import { Bookmark, BookmarkCheck, Check, Plus, Share2, User } from "lucide-react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { AddToFavorites, EnrollInCourse } from "../../api";
import { toast } from "react-toastify";
import { setUser } from "../../redux/features/userSlice";


const CourseSidebar = ({
    isBookmarked,
    isAddedToList,
    setIsBookmarked,
    setIsAddedToList,
    resource,
    resourceId,
    courseProgress,
    calculateProgress,
}) => {
    const totalLessons = resource.modules.reduce(
        (count, module) => count + (module.lessons?.length || 0),
        0
    );

    const completed = Object.values(courseProgress).filter((s) => s === "completed").length;
    const inProgress = Object.values(courseProgress).filter((s) => s === "in-progress").length;

    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const addCourse = async (data) => {
        try {
            const response = await EnrollInCourse(data);
            if (response.status === 200) {
                toast.success("Enrolled successfully!");
                dispatch(
                    setUser({
                        ...user,
                        courses: [
                            ...user.courses,
                            {
                                courseId: resourceId,
                                courseName: resource.title,
                                description: resource.description,
                            },
                        ],
                    })
                );
                setIsAddedToList(true);
            } else {
                toast.error("Failed, Try again.");
            }
        } catch (err) {
            toast.error("Something went wrong.");
            console.error(err);
        }
    };

    const addBookmark = async (data) => {
        try {
            const response = await AddToFavorites(data);
            if (response.status === 200) {
                toast.success(response.data.message);
                dispatch(
                    setUser({
                        ...user,
                        savedItems: response.data.data.favorites,
                    })
                );
                setIsBookmarked(!response.data.data.removed);
            } else {
                toast.error("Failed, Try again.");
            }
        } catch (err) {
            toast.error("Something went wrong.");
            console.error(err);
        }
    };

    return (
        <div className="space-y-6">
            {/* Action Buttons */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="space-y-4">
                    {/* Bookmark */}
                    <button
                        onClick={() =>
                            user ? addBookmark({
                                userId: user._id,
                                courseId: resourceId,
                            })
                                :
                                toast.error("Please login to bookmark this course.")
                        }
                        title={isBookmarked ? "Remove Favourite" : "Add to Favourite"}
                        className={`w-full flex items-center cursor-pointer justify-center space-x-2 py-3 px-4 rounded-xl font-semibold transition-all ${isBookmarked
                            ? "bg-yellow-100 text-yellow-800 border-2 border-yellow-300"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                    >
                        {isBookmarked ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
                        <span>{isBookmarked ? "Added to Favorites" : "Add to Favorites"}</span>
                    </button>

                    {/* Enroll */}
                    <button
                        onClick={() =>
                            user ? addCourse({
                                userId: user._id,
                                courseId: resourceId,
                            })
                                :
                                toast.error("Please login to enroll in this course.")
                        }
                        className={`w-full flex items-center  justify-center space-x-2 py-3 px-4 rounded-xl font-semibold transition-all ${isAddedToList
                            ? "bg-green-600 text-white cursor-not-allowed"
                            : "bg-brand-navy text-white cursor-pointer hover:bg-dark-blue"
                            }`}
                        disabled={isAddedToList}
                    >
                        {isAddedToList ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                        <span>{isAddedToList ? "Enrolled" : "Enroll Now"}</span>
                    </button>

                    {/* Share */}
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                            toast.success("Course link copied to clipboard!");
                        }}
                        className="w-full cursor-pointer flex items-center justify-center space-x-2 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 font-semibold transition-all"
                    >
                        <Share2 className="w-5 h-5" />
                        <span>Share Course</span>
                    </button>
                </div>
            </div>

            {/* Course Info */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Course Information</h3>
                <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Instructor:</span>
                        <Link to={`/mentor/${resource.mentorId}`} className="flex items-center gap-2">
                            <User className="w-5 h-5 text-brand-blue" />
                            <span className="font-semibold">{resource.mentorname}</span>
                        </Link>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Students:</span>
                        <span className="font-semibold">{resource.studentsEnrolled}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Last Updated:</span>
                        <span className="font-semibold">
                            {dayjs(resource.updatedAt).format("MMM DD, YYYY")}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Rating:</span>
                        <span className="font-semibold">{resource.rating}/5</span>
                    </div>
                </div>
            </div>

            {/* Progress Stats */}
            <div className="bg-gradient-to-r from-dark-blue to-brand-navy rounded-2xl p-6 text-white">
                <h3 className="text-lg font-bold mb-4">Your Progress</h3>
                <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                        <span>Completed:</span>
                        <span className="font-bold">
                            {completed}/{totalLessons}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span>In Progress:</span>
                        <span className="font-bold">{inProgress}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Overall:</span>
                        <span className="font-bold">{calculateProgress()}%</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseSidebar;
