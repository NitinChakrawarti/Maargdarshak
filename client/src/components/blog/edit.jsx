import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import { useParams } from 'react-router-dom';
import Layout from '../../screens/auth/layout';


export const EditBlog = () => {
    const [blogpost, setBlogPost] = useState({
        _id: '',
        title: '',
        summary: '',
        content: '',
        image: null,
    });

    //--------- editor modules -----------------//
    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' },
            ],
            ['link', 'image'],
            ['clean'],
        ],
    };

    const navigate = useNavigate();

    //-------------------function for intial data fetch -------------//

    const { id } = useParams();
    useEffect(() => {
        const blogById = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_USER_API}/post/${id}`);
                if (response.data.postdoc._id) setBlogPost({
                    title: response.data.postdoc.title,
                    summary: response.data.postdoc.summary,
                    content: response.data.postdoc.content,
                    _id: response.data.postdoc._id,
                    image: null,
                })

            } catch (error) {
                console.error('Error fetching blog by ID:', error);
            }
        };
        blogById();
    }, []);

    //-------------------- submit change funtion -----------------//
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(blogpost.image);
        try {
            const formData = new FormData();
            formData.append('_id', blogpost._id)
            formData.append('title', blogpost.title);
            formData.append('summary', blogpost.summary);
            formData.append('content', blogpost.content);
            if (blogpost.image) {
                formData.append('image', blogpost.image); // Include image if present
            }
            const post = await axios.put(
                `${import.meta.env.VITE_BASE_URL}/post/edit-post/${id}`,
                formData, {
                withCredentials: true
            }
            );
            if (post.status === 200) {
                alert('Post edited successfully!');
                navigate('/blog/')
            }
            setBlogPost({
                title: '',
                summary: '',
                content: '',
                image: null,
            });
        } catch (error) {
            console.error('Error in editing post:', error);
            alert('Failed to create post. Please try again.');
        }
    };

    return (

        <Layout>
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex justify-between items-center pb-6 mt-10 shadow-sm py-2">
                    <h1 className="text-2xl md:text-3xl font-bold">Edit Blog</h1>
                </div>
                <div className="w-full">
                    <form
                        className="flex flex-col gap-6 bg-white shadow-md rounded-lg p-4 md:p-8"
                        onSubmit={handleSubmit}
                    >
                        <input
                            type="text"
                            placeholder="Title"
                            name="title"
                            value={blogpost.title}
                            onChange={(e) =>
                                setBlogPost((prev) => ({ ...prev, title: e.target.value }))
                            }
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                        />
                        <input
                            type="text"
                            placeholder="Summary"
                            name="summary"
                            value={blogpost.summary}
                            onChange={(e) =>
                                setBlogPost((prev) => ({ ...prev, summary: e.target.value }))
                            }
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                        />
                        <input
                            type="file"
                            onChange={(e) =>
                                setBlogPost((prev) => ({ ...prev, image: e.target.files[0] }))
                            }
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none"
                        />
                        <ReactQuill
                            value={blogpost.content}
                            onChange={(value) =>
                                setBlogPost((prev) => ({ ...prev, content: value }))
                            }
                            modules={modules}
                            className=" md:h-40 mb-12"
                        />
                        <button
                            type="submit"
                            className="w-full bg-primary/80 hover:bg-primary transition font-semibold text-white text-lg py-2 rounded-md"
                        >
                            Edit Post
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

