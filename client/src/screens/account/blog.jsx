import { Blogcard } from "../../components/blog/blogcard";
import { Link } from 'react-router-dom';
import { CiCirclePlus } from "react-icons/ci";
import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../auth/layout";

export const UserBlog = () => {
    const [blogs, setblog] = useState([])
    const [loading, setLoading] = useState(false); // Loading state

    useEffect(() => {
        (async () => {
            setLoading(true)
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/post/get-all-post`
                );
                setblog(response.data.data)
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false); // Stop loading after fetching data
            }
        })();
    }, []);
    return (
        <>
            <Layout>
                <div className="flex justify-between px-2 md:px-12 md:pr-10 mt-20 md:mt-6 shadow-sm py-2">
                    <h1 className="text-3xl font-bold text-primary ">Blogs</h1>
                    <Link
                        to="/addblog"
                        className="text-md flex justify-center items-center font-semibold border-primary border-2 rounded-full px-4 hover:shadow-lg hover:border-primary duration-300"
                    >
                        Create new Post <CiCirclePlus className="ml-2 text-2xl" />
                    </Link>
                </div>
                <div className="py-10 px-2 md:px-12">
                    {loading ? (
                        <div className="flex justify-center items-center h-60">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary border-solid"></div>
                        </div>
                    ) : (
                        blogs && blogs.length > 0 ? (
                            blogs?.map((blog, index) => (
                                <Blogcard {...blog} key={index} />
                            ))
                        ) : (
                            <p className="text-center text-gray-500">No blogs available</p>
                        )
                    )}
                </div>
            </Layout>
        </>
    );
};
