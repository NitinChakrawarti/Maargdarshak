import { useEffect, useState } from "react";
import { VerifyToken } from "../../api";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setMentor, clearMentor } from '../../redux/features/mentorSlice';
import MentorPage from "../../screens/mentor/mentorhome";

const Mentor = () => {
    const [openDialog, setOpenDialog] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSignOut = () => {
        Cookies.remove('mentorToken');
        dispatch(clearMentor());
        navigate('/');
    }

    return (
        <>
            {mentor?.status === "inactive" ? (
                <div className="min-h-screen bg-gray-100">
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        <div className="px-4 py-6 sm:px-0">
                            <h1 className="text-3xl font-bold text-gray-900">Mentor Dashboard</h1>
                            {mentor && (
                                <div className="mt-4">
                                    <p className="text-lg text-gray-700">Welcome, {mentor.name}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {openDialog && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                            <div className="bg-white rounded-lg max-w-md w-full">
                                <div className="bg-primary text-white px-6 py-4 rounded-t-lg">
                                    <h3 className="text-xl font-semibold">Account Status</h3>
                                </div>
                                <div className="p-6">
                                    <div className="text-center">
                                        <h4 className="text-xl font-medium mb-2">{mentor?.name}</h4>
                                        <p className="text-lg text-gray-700 mb-4">
                                            Your mentor account request is currently pending verification.
                                            We will notify you once your account has been verified.
                                        </p>
                                        <button
                                            onClick={handleSignOut}
                                            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <MentorPage />
            )}
        </>
    )
}

export default Mentor;
