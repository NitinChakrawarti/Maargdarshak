import { useState } from 'react';
import { Carousel } from "react-responsive-carousel";
import { mentors } from "../../data/mentorsdata";
import { motion } from "framer-motion";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles

const MentorsCarousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  // Handle slide change
  const handleChange = (index) => {
    setActiveSlide(index);
  };
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };


  return (
    <section className="max-w-7xl mx-auto pt-24 px-4">
      <motion.h2
        className="text-4xl text-brand-navy font-bold mb-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        Our Mentors
      </motion.h2>
      <p className=" text-gray-600 mb-12">
        Learn from industry experts who are passionate about sharing their knowledge and experience to help you succeed.
      </p>

      <div className="md:mt-10 -mx-4 px-0">
      <Carousel
          showArrows={true}
          autoPlay
          infiniteLoop
          stopOnHover
          showThumbs={false}
          showStatus={false}
          emulateTouch
          interval={4000}
          selectedItem={activeSlide}
          onChange={handleChange}
          centerMode
          centerSlidePercentage={30}
          className="mentor-carousel "
          renderArrowPrev={(clickHandler, hasPrev) =>
            hasPrev && (
              <button
                onClick={clickHandler}
                className="absolute left-0 z-10 top-1/2 -translate-y-1/2 bg-secondary text-bg w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-opacity-90 transition-all focus:outline-none bg-brand-navy opacity-70 "
                aria-label="Previous mentor"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )
          }
          renderArrowNext={(clickHandler, hasNext) =>
            hasNext && (
              <button
                onClick={clickHandler}
                className="absolute right-0 z-10 top-1/2 -translate-y-1/2 bg-secondary text-bg w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-opacity-90 transition-all focus:outline-none bg-brand-navy opacity-70"
                aria-label="Next mentor"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )
          }
        >
          {mentors.map((mentor) => (

            <div key={mentor.id} className="px-3 py-5 mx-auto mb-10">
              <div className="rounded-xl overflow-hidden shadow-md bg-white border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 h-full group">
                <div className="relative overflow-hidden">
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6 relative">
                  <div className="mb-5">
                    <h3 className="text-2xl text-primary font-bold mb-1">
                      {mentor.name}
                    </h3>
                    <p className="text-sm text-gray-600 font-medium">{mentor.jobTitle}</p>
                    <div className="h-px bg-gray-200 my-4 w-16"></div>
                    <p className="text-sm mt-3 line-clamp-3 text-gray-700 leading-relaxed">{mentor.expertise}</p>
                  </div>
                  <div className="mt-5 w-full flex justify-center">
                    <button className="bg-secondary text-brand-blue px-7 py-2.5 rounded-lg font-medium hover:bg-opacity-90 transition-all shadow-sm flex items-center space-x-2 cursor-pointer hover:pl-5 hover:pr-9">
                      <span>Know More</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default MentorsCarousel;