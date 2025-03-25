import { format } from 'date-fns'
import { Link } from 'react-router-dom'


export const Blogcard = ({ _id, title, summary, content, cover, author, createdAt }) => {
    return (
        <>
            <div className="flex gap-2 lg:flex-row flex-col px-0 md:p-4 max-w-6xl shadow-sm ">
                <div className="lg:w-[30%] w-full">
                    <Link to={`/blog/${_id}`} >
                        <img
                            src={`${import.meta.env.VITE_CLOUDINARY_BASE_URL}/${cover}`}
                            alt=""
                            className="w-[90%] h-[10rem] object-cover mx-auto"
                        />
                    </Link>

                </div>
                <div className="lg:w-[60%] w-full lg:mx-0 mx-2 md:mx-10">
                    <div className=' md:flex-row flex-col'>
                        <Link to={`/blog/${_id}`} >
                            <h1 className="text-4xl pb-2 font-bold">
                                {title}
                            </h1>
                        </Link>
                        <div className='flex md:flex-row flex-col'>
                            <span className="text-white w-fit bg-primary px-2 mr-2">
                                {author?.name}
                            </span>
                            <span className="text-black/50">
                                {format(new Date(createdAt), 'MMM d, yyyy HH:mm')}
                            </span>
                        </div>
                    </div>

                    <div className=" mt-4">
                        {summary.split(" ").slice(0, 50).join(" ")}
                    </div>
                </div>
            </div>
        </>
    )
}
