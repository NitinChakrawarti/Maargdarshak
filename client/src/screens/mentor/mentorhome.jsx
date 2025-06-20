import { useSelector } from "react-redux";
import Layout from '../../layout/auth/layout'

const MentorPage = () => {
    const { data: mentor } = useSelector((state) => state.auth);
    return (
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
        </div>
    );
};

export default MentorPage;