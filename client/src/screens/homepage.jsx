
import Resources from "../components/home/resources";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layoutcomponent from "../layout/landing/layoutcomponent";
import Beginjourney from "../components/home/beginyourjourney";
import Mentorscraousel from "../components/home/mentorscraousel";
import CareerPlanning from "../components/home/carrier";
import { Github, Linkedin, Twitter } from "lucide-react";
import FAQ from "../components/home/faq";

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const Home = () => {
  const decorativeCircleVariants = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  return (
    <Layoutcomponent>
      {/* Hero Section */}
      <motion.section
        className="relative bg-gradient-to-b from-white to-brand-sky/10 pt-20 md:pt-36 pb-10 px-5 md:px-10 lg:px-20 overflow-hidden bg-hero-pattern"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        {/* Decorative elements */}
        <motion.div
          className="absolute top-40 right-[10%] w-64 h-64 rounded-full bg-brand-sky/20 blur-3xl"
          animate="animate"
          variants={decorativeCircleVariants}
        />
        <motion.div
          className="absolute bottom-20 left-[5%] w-48 h-48 rounded-full bg-brand-orange/10 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            transition: { duration: 4, repeat: Infinity, repeatType: "reverse" }
          }}
        />

        <div className="max-w-7xl flex flex-col mx-auto relative z-10">
          {/* Rearranged welcome section - Start */}
          <motion.div
            className="text-center mb-12 md:mb-6 mt-16 md:mt-10 "
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5 }
              }
            }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-2">
              <span className="bg-gradient-to-r from-brand-navy to-brand-blue bg-clip-text text-transparent px-2">
                मार्गदर्शक
              </span>
            </h1>
            <motion.div
              className="h-1 w-10 md:w-6 bg-gradient-to-r from-brand-orange to-brand-green mx-auto my-4"
              animate={{ width: ["0%", "30%"] }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <p className="text-lg md:text-lg text-soft-gray max-w-2xl mx-auto leading-relaxed">
              Discover your strengths, set meaningful goals, and find tailored
              opportunities for your career growth journey.
            </p>
          </motion.div>
          <motion.div
            className="flex justify-center mt-2"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5 }
              }
            }}
          >
            <div className="hidden md:flex items-center space-x-4 text-brand-blue text-sm font-medium">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-brand-green" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span>Personalized Plan</span>
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-brand-green" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span>Expert Guidance</span>
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-brand-green" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span>Career Opportunities</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-8 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg md:mt-24 border border-brand-sky/30"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5 }
              }
            }}
          >
            <div className="text-center md:text-left max-w-md">
              <h2 className="text-xl md:text-2xl font-semibold text-brand-navy mb-3">
                Ready to Get Started?
              </h2>
              <p className="text-soft-gray text-md">
                Take our initial assessment to receive personalized career advice,
                job recommendations, and more.
              </p>
            </div>

            <Link to="/signup" className="w-full md:w-auto">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(44, 103, 166, 0.4)"
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full md:w-auto px-4 md:px-8 py-4 bg-gradient-to-r from-brand-blue to-brand-navy text-white rounded-lg shadow-md font-semibold text-lg group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Start Your Journey
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 inline-block transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-1 bg-brand-orange"
                  initial={{ scaleX: 0, originX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </Link>
          </motion.div>
          {/* Rearranged welcome section - End */}
        </div>

      </motion.section>

      {/* Career Planning and Resources */}
      <motion.div
        className= " pt-6 md:pt-16 px-5 md:px-10 lg:px-20 bg-bg"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <CareerPlanning />
        <Resources />
      </motion.div>

      {/* Benefits Section */}
      <div className="pt-16 pb-16 px-5 md:px-10 lg:px-20 bg-bg">
        <section id="resources" className="px-4  mx-auto">
          <div className="max-w-7xl mx-auto">
            <motion.section
              className=""
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h2
                className=" text-3xl md:text-4xl text-brand-navy font-bold text-secondary mb-8"
                variants={fadeIn}
              >
                Why Choose मार्गदर्शक?
              </motion.h2>
              <div className="py-8   flex  md:flex-row flex-col gap-4">
                {[
                  {
                    title: "Personalized Guidance",
                    description:
                      "Receive tailored recommendations for career paths and skill-building opportunities.",
                  },
                  {
                    title: "Expert Resources",
                    description:
                      "Access a curated library of tools, courses, and job portals to accelerate your growth.",
                  },
                  {
                    title: "Community Support",
                    description:
                      "Join a thriving community of professionals and mentors to guide your journey.",
                  },
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-100 p-6 rounded-lg shadow-md text-center hover:shadow-none hover:duration-300 "
                    variants={fadeIn}
                  >
                    <h3 className="text-xl font-semibold text-brand-blue">
                      {benefit.title}
                    </h3>
                    <p className="mt-2 text-soft-gray">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </div>
        </section>
      </div>

      {/* start your journey with md */}
      <Beginjourney />

      {/* mentors craousel  */}
      <Mentorscraousel />

      {/* Testimonials Section */}
      <motion.section
        className="max-w-7xl mx-auto py-16 px-5 md:px-10 lg:px-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-brand-navy mb-8"
          variants={fadeIn}
        >
          What Our Users Say
        </motion.h2>
        <div className=" pt-4 pb-16 px-5 md:px-10 flex gap-4 flex-col md:flex-row">
          {[
            {
              feedback:
                "Margdarshak transformed my career! The personalized guidance and resources helped me secure my dream job.",
              name: "Sumit Singh",
            },
            {
              feedback:
                "The career assessment was spot-on. It helped me identify my strengths and work on my weaknesses.",
              name: "Himansh Prajapati",
            },
            {
              feedback:
                "I love the resources section. It's like having a personal mentor available 24/7.",
              name: "Praful Sahu",
            },
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-none transition-shadow duration-300 border-t-4 border-brand-orange"
              variants={fadeIn}
            >
              <p className="text-gray-600">{testimonial.feedback}</p>
              <h4 className="mt-4 font-semibold text-brand-blue">
                - {testimonial.name}
              </h4>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Team Section */}

      {/* <motion.section
        className="bg-brand-sky py-16 px-5 md:px-10 lg:px-16 max-w-7xl mx-auto rounded-lg"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <motion.h2
          className=" text-3xl md:text-4xl font-bold text-brand-navy mb-12"
          variants={fadeIn}
        >
          Meet Our Team
        </motion.h2>

        <div className="max-w-3xl mx-auto">
          {[
            {
              name: "Nitin Chakrawarti",
              role: "Founder & Developer",
              bio: "A passionate developer with a vision to empower individuals through technology.",
              image: "https://media.licdn.com/dms/image/v2/D4D03AQH-SdRZJ504Zw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1713979492063?e=2147483647&v=beta&t=01a2a8o3wlt0Z-6IdZR9BzJATUE2PoNg284Dd9AfFEE",
              social: ["x.com/nitinchakarawar", "linkedin.com/in/nitinchakrawarti", "github.com/nitinchakrawarti"],
            },
            // Add more team members as needed
          ].map((member, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden mb-10 flex flex-col md:flex-row"
              variants={fadeIn}
            >
              <div className="md:w-1/3  p-6 flex items-center justify-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-48 h-48 rounded-full border-4  object-cover"
                />
              </div>
              <div className="md:w-2/3 p-8">
                <h3 className="text-2xl font-bold text-brand-blue mb-2">{member.name}</h3>
                <p className="text-brand-orange font-medium mb-4">{member.role}</p>
                <div className="w-16 h-1 bg-brand-green mb-4"></div>
                <p className="text-gray-600">{member.bio}</p>
                <div className="mt-6 flex gap-4">
                  <Link to={`https://${member.social[0]}`} target="_blank" className="text-brand-blue hover:text-brand-orange transition-colors duration-300">
                    <Twitter />
                  </Link>
                  <Link to={`https://${member.social[1]}`} target="_blank" className="text-brand-blue hover:text-brand-orange transition-colors duration-300">
                    <Linkedin />
                  </Link>
                  <Link to={`https://${member.social[2]}`} target="_blank" className="text-brand-blue hover:text-brand-orange transition-colors duration-300">
                    <Github />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-8"
          variants={fadeIn}
        >
          <button className="bg-brand-orange hover:bg-brand-navy text-white font-medium py-3 px-8 rounded-lg transition-colors">
            Join Our Team
          </button>
        </motion.div>
      </motion.section> */}

      
      <FAQ />

    </Layoutcomponent>
  );
};

export default Home;