import { useContext } from 'react';
import { UserContext } from '../../context/contextapi'
import { Link } from 'react-router-dom';
import { FaPen } from "react-icons/fa";


export const PostDetail = ({ _id, title, summary, content, cover, createdAt, author }) => {


    const userContext = useContext(UserContext);

    const formattedDate = new Date(createdAt).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });

    return (
        <div className="md:mr-10 mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">

            <h1 className=" text-center text-5xl font-bold text-gray-800 mb-4">{title}</h1>
            <p className="text-center text-gray-500 italic text-sm mb-6">
                Published on {formattedDate} by <span className="font-semibold text-gray-800">{author?.name || "Unknown Author"}</span>
                {
                    userContext.user.id === author?._id ?
                        <Link to={`/edit-blog/${_id}`} className=' w-fit ml-2 inline-block' >
                            <p className='text-white py-[2px] px-2 bg-primary rounded-sm mx-auto w-fit my-2 ' >
                                Edit blog <FaPen className='inline-block' />
                            </p>
                        </Link>
                        :
                        null
                }
            </p>
            <div className="mb-6 md:px-32">
                <img
                    src={`${import.meta.env.VITE_CLOUDINARY_BASE_URL}/${cover}`}
                    alt={title}
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                />
            </div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">Summary</h2>
            <p className="text-gray-700 leading-relaxed mb-6">{summary}</p>
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">Content</h2>
            <div
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: content }}
            ></div>
        </div>
    );
};
