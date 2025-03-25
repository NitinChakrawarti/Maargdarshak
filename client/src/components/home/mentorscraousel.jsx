import { Carousel } from 'react-responsive-carousel';
import { mentors } from '../../data/mentorsdata';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles

const MentorsCarousel = () => {
    return (
        <div className="max-w-7xl mx-auto pt-24">
            <h2 className="text-3xl text-secondary font-bold text-center mb-6">Our Mentors</h2>
            <div className='md:mt-16'>
                <Carousel
                    showArrows={true}
                    autoPlay
                    infiniteLoop
                    stopOnHover
                    showThumbs={false}
                    showStatus={false}
                    emulateTouch
                    interval={3000}
                >
                    {mentors.map((mentor) => (
                        <div key={mentor.id} className="p-4 mx-auto mb-10">
                            <div className="border-2 border-secondary py-4 rounded-lg overflow-hidden">
                                <img
                                    src={mentor.image}
                                    alt={mentor.name}
                                    className="w-full h-56 object-contain"
                                />
                                <div className="p-4">
                                    <div>
                                    <h3 className="text-xl text-primary font-bold">{mentor.name}</h3>
                                    <p className="text-sm text-gray-600">{mentor.jobTitle}</p>
                                    <p className="text-sm mt-2">{mentor.expertise}</p>
                                    </div>
                                    <div>
                                        <button className='bg-secondary text-bg px-4 py-[2px] mt-2 rounded-lg'>
                                            Know More 
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
};

export default MentorsCarousel;

