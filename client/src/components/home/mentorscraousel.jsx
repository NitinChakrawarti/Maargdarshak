import { useState, useEffect } from 'react';
import { Carousel } from "react-responsive-carousel";
import { mentors } from "../../data/mentorsdata";
import { motion } from "framer-motion";

import "react-responsive-carousel/lib/styles/carousel.min.css";

const MentorsCarousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [slidePercentage, setSlidePercentage] = useState(33);

  const handleChange = (index) => {
    setActiveSlide(index);
  };

  // Responsive logic for centerSlidePercentage
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setSlidePercentage(33); // Desktop: 3 cards
      } else if (width >= 768) {
        setSlidePercentage(50); // Tablet: 2 cards
      } else {
        setSlidePercentage(100); // Mobile: 1 card
      }
    };

    handleResize(); // Set on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="max-w-7xl mx-auto pt-24 px-4">
      <motion.h2
        className="text-3xl md:text-4xl text-brand-navy font-bold mb-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        Our Mentors
      </motion.h2>
      <p className="text-gray-600 mb-12 max-w-2xl">
        Learn from industry experts who are passionate about sharing their knowledge and experience to help you succeed.
      </p>

      <div className="md:mt-10 -mx-4 px-0 relative">
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
          centerMode={true}
          centerSlidePercentage={slidePercentage}
          className="mentor-carousel"
          renderArrowPrev={(clickHandler, hasPrev) =>
            hasPrev && (
              <button
                onClick={clickHandler}
                className="absolute left-2 md:left-0 z-10 top-1/2 -translate-y-1/2 bg-brand-navy text-bg w-8 h-8 md:w-12 md:h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-opacity-90 transition-all focus:outline-none opacity-70"
                aria-label="Previous mentor"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )
          }
          renderArrowNext={(clickHandler, hasNext) =>
            hasNext && (
              <button
                onClick={clickHandler}
                className="absolute right-2 md:right-0 z-10 top-1/2 -translate-y-1/2 bg-brand-navy text-bg w-8 h-8 md:w-12 md:h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-opacity-90 transition-all focus:outline-none opacity-70"
                aria-label="Next mentor"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )
          }
        >
          {mentors.map((mentor) => (
            <div key={mentor.id} className="px-3 py-5 mb-10">
              <div className="rounded-xl overflow-hidden shadow-md bg-white border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 h-1/2 md:h-full group">
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
                    <button className="bg-secondary text-brand-blue px-6 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-all shadow-sm flex items-center space-x-2 cursor-pointer">
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
