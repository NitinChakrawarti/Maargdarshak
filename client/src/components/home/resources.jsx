// import React from "react";
// import { TbFileCv, TbUserScreen } from "react-icons/tb";
// import { FaNetworkWired } from "react-icons/fa";

// const resourceData = [
//   {
//     icon: <TbFileCv size="4vmax" />,
//     title: "Resume Builder",
//     description: "Create, preview, and download resumes.",
//   },
//   {
//     icon: <TbUserScreen size="4vmax" />,
//     title: "Interview Preparation",
//     description: "Mock interview practice and tips.",
//   },
//   {
//     icon: <FaNetworkWired size="4vmax" />,
//     title: "Networking Tips",
//     description: "Articles and videos on building professional networks.",
//   },
// ];

// const Resources = () => {
//   return (
//     <section id="resources" className="py-16 mt-10  px-4 md:px-28 mx-auto">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-4xl text-secondary font-bold pb-8 text-primary">
//           Resources
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
//           {resourceData.map((resource, index) => (
//             <div
//               key={index}
//               className="p-4 bg-gray-200 rounded-lg flex flex-col justify-center items-center gap-4 hover:shadow-lg duration-300 "
//             >
//               <div className="text-primary">{resource.icon}</div>
//               <h3 className="text-xl text-primary font-bold">
//                 {resource.title}
//               </h3>
//               <p className="text-secondary text-center text-soft-gray -mt-2">
//                 {resource.description}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Resources;




import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const resources = [
  {
    title: "Career Resources",
    description: "Access tools and materials for career development",
    link: "/resources/career"
  },
  {
    title: "Job Portals",
    description: "Find opportunities aligned with your career goals",
    link: "/resources/jobs"
  },
  {
    title: "Skill Development",
    description: "Enhance your skills with tailored learning paths",
    link: "/resources/skills"
  }
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Resources = () => {
  return (
    <section id="resources" className="pt-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <motion.h2 
          className="text-3xl md:text-4xl text-brand-navy font-bold mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          Helpful Resources
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <motion.div
              key={index}
              className="p-6 bg-gradient-to-br from-white to-brand-sky/10 rounded-lg shadow hover:shadow-lg transition-all duration-300 border border-brand-sky/20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ 
                scale: 1.03, 
                boxShadow: "0 10px 25px -5px rgba(181, 213, 229, 0.4)",
                backgroundColor: "rgba(247, 249, 252, 1)" 
              }}
            >
              <h3 className="text-xl font-semibold text-brand-blue mb-3">{resource.title}</h3>
              <p className="text-soft-gray mb-4">{resource.description}</p>
              <Link to={resource.link}>
                <motion.span 
                  className="inline-block text-brand-orange font-medium hover:underline"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Explore More &rarr;
                </motion.span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Resources;