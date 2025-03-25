import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../auth/layout';
import { UserContext } from '../../context/contextapi';
import axios from 'axios'

const Profile = () => {
    const [userType, setUserType] = useState('Tech');
    const [selectedTags, setSelectedTags] = useState([]);
    const { user, setuser } = useContext(UserContext);
    const [profiledata, setProfiledata] = useState(user);

    const techTags = ['Web Development', 'UI/UX', 'Cloud '];
    const nonTechTags = ['Finance', 'Management', 'Marketing'];

    const handleTagToggle = (tag) => {
        const updatedTags = selectedTags.includes(tag)
            ? selectedTags.filter((t) => t !== tag)
            : [...selectedTags, tag];
        setSelectedTags(updatedTags);
        setProfiledata((prev) => ({ ...prev, domains: updatedTags }));
    };

    const handleChange = (e) => {
        setProfiledata((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const profilesubmit = async (e) => {
        e.preventDefault();
        // setuser(profiledata)
        try {
            const updateduser = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/update-user`, {
                ...profiledata
            },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("logintoken")}`,
                    },
                });
            if (updateduser.data) {
                console.log(updateduser.data);
            }

        } catch (error) {
            console.log(error)
        }
    };

    return (
        <Layout>
            <div className="bg-bg mt-16 md:mt-10  p-6 md:px-16 rounded-lg shadow-sm">
                <form className="space-y-4" onSubmit={profilesubmit}>
                    <div>
                        <label className="block text-gray-600">Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            className="w-full mt-2 p-2 border rounded-lg"
                            onChange={handleChange}
                            value={profiledata.name || ''}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600">Mobile</label>
                        <input
                            type="mobile"
                            name="mobile"
                            placeholder="Enter your mobile no."
                            className="w-full mt-2 p-2 border rounded-lg"
                            onChange={handleChange}
                            value={profiledata.mobile || ''}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your Contact No."
                            className="w-full mt-2 p-2 border rounded-lg"
                            disabled
                            value={profiledata.email || ''}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600">Category</label>
                        <select
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)}
                            className="w-full mt-2 p-2 border rounded-lg"
                            required
                        >
                            <option value="Tech">Tech</option>
                            <option value="Non-Tech">Non-Tech</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-600 mb-2">Skills/Interest</label>
                        <div className="flex flex-wrap gap-2">
                            {(userType === 'Tech' ? techTags : nonTechTags).map((tag) => (
                                <button
                                    key={tag}
                                    type="button"
                                    onClick={() => handleTagToggle(tag)}
                                    className={`px-4 py-2 rounded-lg border ${selectedTags.includes(tag)
                                        ? 'bg-light-blue text-white'
                                        : 'bg-gray-200 text-gray-800'
                                        }`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>


                </form>
                <button
                    type="submit"
                    className="mt-12 px-4 p-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition duration-300"
                >
                    Save Profile
                </button>
            </div>
        </Layout>
    );
};

export default Profile;
