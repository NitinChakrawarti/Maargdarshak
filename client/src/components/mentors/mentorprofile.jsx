import { FaLock } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addMentor } from '../../features/chat/chatSlice';
import { useContext } from 'react';
import { BackContext } from '../../context/contextapi';
import { Link } from 'react-router-dom';

const MentorProfileCard = ({ mentordata }) => {
    const dispatch = useDispatch();
    const mentors = useSelector(state => state.mentors);
    const {back, setBack} = useContext(BackContext);

    const handleChat = () => {
        const isMentorInChat = mentors.mentors.find((mentor) => mentor.name === mentordata.name);

        if (!isMentorInChat) {
            dispatch(addMentor(mentordata));
            alert(`Chat with ${mentordata.name} has been initiated. Check your chat list for more details.`);
        }
        else {
            alert(`Chat with ${mentordata.name} is already initiated. Check your chat list for more details.`);
        }
    };
    const onBackToMentors = () => {
        setBack(false);
    }
    const handleAccessResources = () => {
        alert(`This feature is locked. Please pay to access resources by ${mentordata.name}.`);
    };
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
            <button
                onClick={onBackToMentors}
                className="self-start z-10 mb-4 px-4 py-2 bg-primary/80 text-white rounded-lg font-semibold hover:bg-primary transition md:relative top-5 left-5"
            >
                Back to All Mentors
            </button>

            <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-8 w-full max-w-lg text-center space-y-6 md:w-96">
                <img
                    src={mentordata.image}
                    alt={mentordata.name}
                    className="w-32 h-32 rounded-full object-cover mb-4"
                />

                <h3 className="text-2xl font-bold text-gray-800">{mentordata.name}</h3>
                <p className="text-lg text-gray-600">{mentordata.jobTitle}</p>
                <p className="text-md text-gray-500">
                    <strong>Expertise:</strong> {mentordata.expertise}
                </p>
                <Link to="/chats" >
                    <button
                        onClick={handleChat}
                        className="w-full py-2 px-4 bg-primary/80 text-white rounded-lg font-semibold hover:bg-primary transition"
                    >
                        Chat with Mentor
                    </button>
                </Link>


                <button
                    onClick={handleAccessResources}
                    className="w-full py-2 px-4 bg-gray-300 text-gray-500 rounded-lg font-semibold flex items-center justify-center space-x-2 cursor-not-allowed"
                    disabled
                >
                    <FaLock className="text-gray-500" />
                    <span>Resources by Mentor (Locked)</span>
                </button>

                <div className="bg-gray-50 rounded-lg p-4 text-left w-full space-y-2">
                    <h4 className="text-lg font-semibold text-gray-700">About the Mentor</h4>
                    <p className="text-gray-600">
                        {mentordata.name} is a seasoned professional specializing in {mentordata.expertise.toLowerCase()}.
                        Currently working as a {mentordata.jobTitle.toLowerCase()} at Google, {mentordata.name} has years of experience
                        in mentoring aspiring developers and guiding them through complex projects.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MentorProfileCard;
