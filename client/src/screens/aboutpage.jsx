// import React from "react";
// import {
//   FaUserGraduate,
//   FaHandshake,
//   FaChartLine,
//   FaBullseye,
//   FaBriefcase,
//   FaUsers,
//   FaLightbulb,
//   FaTools,
//   FaPeopleArrows,
// } from "react-icons/fa";
// import Layoutcomponent from "../layout/landing/layoutcomponent";

// const About = () => {
//   const features = [
//     {
//       title: "Personalized Career Assessment",
//       description:
//         "Unlock your potential with in-depth assessments tailored to your strengths, interests, and areas for improvement. Get clear guidance on choosing the right career path.",
//       icon: <FaUserGraduate className="w-20 h-20 text-light-blue mb-6" />,
//     },
//     {
//       title: "Connect with Mentors",
//       description:
//         "Forge valuable connections with experienced industry professionals and mentors who provide insights, career advice, and support for your professional growth.",
//       icon: <FaHandshake className="w-20 h-20 text-light-blue mb-6" />,
//     },
//     {
//       title: "Track Your Learning Progress",
//       description:
//         "Stay organized and motivated with tools that monitor your progress, set achievable milestones, and celebrate your accomplishments along the way.",
//       icon: <FaChartLine className="w-20 h-20 text-light-blue mb-6" />,
//     },
//     {
//       title: "Goal Setting & Achievement",
//       description:
//         "Define your short-term and long-term career objectives with clarity. Access structured resources and guidance to achieve your aspirations effectively.",
//       icon: <FaBullseye className="w-20 h-20 text-light-blue mb-6" />,
//     },
//     {
//       title: "Job & Internship Opportunities",
//       description:
//         "Discover curated job and internship openings that match your skill set and career interests, streamlining your journey to professional success.",
//       icon: <FaBriefcase className="w-20 h-20 text-light-blue mb-6" />,
//     },
//     {
//       title: "Community & Peer Support",
//       description:
//         "Join a vibrant community of like-minded individuals where you can share experiences, seek advice, and grow alongside supportive peers.",
//       icon: <FaUsers className="w-20 h-20 text-light-blue mb-6" />,
//     },
//   ];

//   const extraSections = [
//     {
//       title: "Innovative Learning Tools",
//       description:
//         "Explore a range of cutting-edge tools like AI-powered recommendations and interactive simulations, making learning more engaging and impactful.",
//       icon: <FaLightbulb className="w-20 h-20 text-light-blue mb-6" />,
//     },
//     {
//       title: "Skill Development Workshops",
//       description:
//         "Participate in hands-on workshops and skill development sessions tailored to industry needs, empowering you to stay ahead in the competitive job market.",
//       icon: <FaTools className="w-20 h-20 text-light-blue mb-6" />,
//     },
//     {
//       title: "Collaborative Projects",
//       description:
//         "Engage in real-world projects with peers, gaining practical experience while building an impressive portfolio that showcases your skills and expertise.",
//       icon: <FaPeopleArrows className="w-20 h-20 text-light-blue mb-6" />,
//     },
//   ];

//   return (
//     <Layoutcomponent>
//       <section className="bg-bg py-16 px-2 lg:px-20">
//         <div className="max-w-7xl mx-auto">
//           {/* Header Section */}
//           <div className="pl-6 lg:pl-12 bg-primary rounded-b-[100%] rounded-bl-[20%] pb-8">
//             <h1 className="text-2xl lg:text-4xl font-bold text-bg pt-12">
//               About मार्गदर्शक
//             </h1>
//           </div>
//           <div className="mt-10 px-2 lg:px-12">
//             <p className="text-2xl lg:text-3xl text-primary font-bold mb-6">
//               Empowering your career journey.
//             </p>
//             <p className="text-soft-gray text-lg lg:text-xl leading-relaxed mb-12">
//               मार्गदर्शक is your trusted partner in navigating the complexities
//               of career decisions. Whether you're a student exploring your
//               options, a graduate seeking your first job, or a professional
//               aiming for a career switch, we offer tailored solutions to help
//               you achieve your goals. With personalized tools, expert advice,
//               and a supportive community, मार्गदर्शक ensures your journey is
//               smooth, informed, and fulfilling.
//             </p>
//           </div>

//           {/* Features Section */}
//           <div className="mt-8 lg:mt-28">
//             <h2 className="text-2xl lg:text-3xl font-bold text-primary lg:px-12 px-6 mb-12">
//               {" "}
//               Key Services{" "}
//             </h2>
//             <div className="grid  grid-cols-1 px-2 lg:px-12 md:grid-cols-2 lg:grid-cols-3 gap-10">
//               {features.map((feature, index) => (
//                 <div
//                   key={index}
//                   className="bg-white shadow-md rounded-xl p-8 flex flex-col items-center hover:shadow-lg hover:scale-105 transition-transform duration-300"
//                 >
//                   {feature.icon}
//                   <h3 className="text-xl font-bold text-dark-blue mb-4">
//                     {feature.title}
//                   </h3>
//                   <p className="text-soft-gray text-center">
//                     {feature.description}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//           {/* Additional Sections */}
//           <div className="mt-8 lg:mt-28">
//             <h2 className="text-2xl lg:text-3xl font-bold text-primary lg:px-12 px-2 mb-12">
//               More Ways We Support Your Journey
//             </h2>
//             <div className="grid grid-cols-1 px-2 lg:px-12 md:grid-cols-2 lg:grid-cols-3 gap-10">
//               {extraSections.map((section, index) => (
//                 <div
//                   key={index}
//                   className="bg-white shadow-md rounded-xl p-8 flex flex-col items-center hover:shadow-lg hover:scale-105 transition-transform duration-300"
//                 >
//                   {section.icon}
//                   <h4 className=" lg:text-xl font-bold text-primary mb-4">
//                     {section.title}
//                   </h4>
//                   <p className="text-soft-gray text-center">
//                     {section.description}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Closing Section */}
//           <div className="mt-8 lg:mt-28 bg-primary text-bg py-6 lg:py-16 mx-2 px-6 lg:mx-12 rounded-lg shadow-lg">
//             <h3 className="text-2xl lg:text-4xl font-bold mb-6 text-center">
//               Ready to Take the Next Step in Your Career?
//             </h3>
//             <p className="text-lg lg:text-xl text-bg/90 lg:w-[90%] mx-auto text-center mb-8">
//               Join मार्गदर्शक today and embark on a journey of self-discovery,
//               growth, and success. With the right guidance and resources, your
//               dreams are within reach.
//             </p>
//             <div className="text-center">
//               <button className="bg-bg text-dark-blue px-8 py-2 lg:py-4 rounded-lg text-lg font-bold hover:bg-bg/90 transition-colors">
//                 Get Started Now
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>
//     </Layoutcomponent>
//   );
// };

// export default About;

import React from "react";
import {
  FaUserGraduate,
  FaHandshake,
  FaChartLine,
  FaBullseye,
  FaBriefcase,
  FaUsers,
  FaLightbulb,
  FaTools,
  FaPeopleArrows,
} from "react-icons/fa";
import Layoutcomponent from "../layout/landing/layoutcomponent";

const About = () => {
  const features = [
    {
      title: "Personalized Career Assessment",
      description:
        "Unlock your potential with in-depth assessments tailored to your strengths, interests, and areas for improvement.",
      icon: <FaUserGraduate className="w-16 h-16 text-brand-blue mb-6" />,
    },
    {
      title: "Connect with Mentors",
      description:
        "Connect with experienced industry professionals and mentors who provide real insights and support.",
      icon: <FaHandshake className="w-16 h-16 text-brand-green mb-6" />,
    },
    {
      title: "Track Your Learning Progress",
      description:
        "Monitor your growth, set milestones, and celebrate your accomplishments along the way.",
      icon: <FaChartLine className="w-16 h-16 text-brand-orange mb-6" />,
    },
    {
      title: "Goal Setting & Achievement",
      description:
        "Define your short- and long-term goals with clarity and access guided resources to achieve them.",
      icon: <FaBullseye className="w-16 h-16 text-brand-navy mb-6" />,
    },
    {
      title: "Job & Internship Opportunities",
      description:
        "Find curated job and internship listings tailored to your career interests and skill level.",
      icon: <FaBriefcase className="w-16 h-16 text-brand-sky mb-6" />,
    },
    {
      title: "Community & Peer Support",
      description:
        "Be part of a like-minded community where you can share, learn, and grow together.",
      icon: <FaUsers className="w-16 h-16 text-brand-blue mb-6" />,
    },
  ];

  const extraSections = [
    {
      title: "Innovative Learning Tools",
      description:
        "Use AI-driven tools and simulations to learn in a more interactive and personalized way.",
      icon: <FaLightbulb className="w-16 h-16 text-brand-orange mb-6" />,
    },
    {
      title: "Skill Development Workshops",
      description:
        "Attend practical workshops designed around real industry demands to keep you ahead.",
      icon: <FaTools className="w-16 h-16 text-brand-green mb-6" />,
    },
    {
      title: "Collaborative Projects",
      description:
        "Work on live projects with peers and build a portfolio that speaks for your skills.",
      icon: <FaPeopleArrows className="w-16 h-16 text-brand-navy mb-6" />,
    },
  ];

  return (
    <Layoutcomponent>
      <section className="bg-bg py-16 px-2 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="pl-6 lg:pl-12 bg-brand-navy rounded-b-[100%] rounded-bl-[20%] pb-8">
            <h1 className="text-2xl lg:text-4xl font-bold text-bg pt-12">
              About मार्गदर्शक
            </h1>
          </div>

          <div className="mt-10 px-4 lg:px-12">
            <p className="text-2xl lg:text-3xl text-brand-navy font-bold mb-6">
              Empowering your career journey.
            </p>
            <p className="text-soft-gray text-lg lg:text-xl leading-relaxed mb-12">
              मार्गदर्शक is your trusted partner in navigating career decisions.
              Whether you're a student, job seeker, or career switcher—we're here with tools, expert advice, and a community to help you succeed.
            </p>
          </div>

          {/* Features */}
          <div className="mt-8 lg:mt-24">
            <h2 className="text-2xl lg:text-3xl font-bold text-primary px-4 lg:px-12 mb-12">
              Key Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-4 lg:px-12">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-2xl p-8 text-center hover:shadow-lg hover:scale-105 transition-transform duration-300"
                >
                  <div className="flex justify-center items-center mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-dark-blue mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-soft-gray">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* More Ways */}
          <div className="mt-16 lg:mt-28">
            <h2 className="text-2xl lg:text-3xl font-bold text-primary px-4 lg:px-12 mb-12">
              More Ways We Support Your Journey
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-4 lg:px-12">
              {extraSections.map((section, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-2xl p-8 text-center hover:shadow-lg hover:scale-105 transition-transform duration-300"
                >
                  <div className="flex justify-center items-center mb-6">
                    {section.icon}
                  </div>
                  <h4 className="text-lg lg:text-xl font-bold text-brand-blue mb-3">
                    {section.title}
                  </h4>
                  <p className="text-soft-gray">{section.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 lg:mt-28 bg-brand-navy text-bg py-12 px-6 lg:px-20 rounded-2xl text-center shadow-lg">
            <h3 className="text-2xl lg:text-4xl font-bold mb-6">
              Ready to Take the Next Step in Your Career?
            </h3>
            <p className="text-lg lg:text-xl text-bg/90 mb-8 max-w-4xl mx-auto">
              Join मार्गदर्शक today and unlock the full potential of your career with personalized guidance and powerful tools.
            </p>
            <button className="bg-bg text-primary px-8 py-3 lg:py-4 rounded-xl text-lg font-semibold hover:bg-bg/90 transition-colors">
              Get Started Now
            </button>
          </div>
        </div>
      </section>
    </Layoutcomponent>
  );
};

export default About;
