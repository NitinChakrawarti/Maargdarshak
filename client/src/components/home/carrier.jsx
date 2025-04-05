// import React from "react";
// import Goal from "../../assets/goal.gif";
// import Progress from "../../assets/progress.gif";
// import Feedback from "../../assets/feedback.gif";

// const carreer = [
//   {
//     head: "Set Goals",
//     descp: "Define and set specific career goals.",
//     img: Goal,
//   },
//   {
//     head: "Milestone Tracker",
//     descp: "Track progress towards each goal.",
//     img: Progress,
//   },
//   {
//     head: "Feedback and Reviews",
//     descp: "Feedback from career coaches or mentors.",
//     img: Feedback,
//   },
// ];
// const CareerPlanning = () => {
//   return (
//     <section id="career-planning" className="py-8 px-4 md:px-28">
//       <div className="container mx-auto max-w-7xl">
//         <h2 className="text-4xl text-secondary pb-8 text-primary font-bold">
//           Career Planning
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
//           {carreer.map((ele, index) => (
//             <div
//               key={index}
//               className="p-4 bg-white rounded-lg flex flex-col justify-center items-center gap-4 hover:shadow-md duration-300"
//             >
//               <div className="h-20 w-20">
//                 <img src={ele.img} />
//               </div>
//               <h3 className="text-xl text-primary font-bold ">{ele.head}</h3>
//               <p className="text-secondary text-soft-gray -mt-2">{ele.descp}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CareerPlanning;












import React from "react";
import { motion } from "framer-motion";
import Goal from "../../assets/goal.gif";
import Progress from "../../assets/progress.gif";
import Feedback from "../../assets/feedback.gif";

const carreer = [
  {
    head: "Set Goals",
    descp: "Define and set specific career goals.",
    img: Goal,
  },
  {
    head: "Milestone Tracker",
    descp: "Track progress towards each goal.",
    img: Progress,
  },
  {
    head: "Feedback and Reviews",
    descp: "Feedback from career coaches or mentors.",
    img: Feedback,
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const CareerPlanning = () => {
  return (
    <section id="career-planning" className="py-8 px-4 ">
      <div className="container mx-auto max-w-7xl">
        <motion.h2 
          className="text-4xl text-brand-navy pb-8 font-bold"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          Career Planning
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {carreer.map((ele, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white rounded-lg flex flex-col justify-center items-center gap-4 hover:shadow-lg transition-all duration-300 border border-brand-sky/30"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.9 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: { duration: 0.5, delay: index * 0.2 } 
                }
              }}
              whileHover={{ 
                y: -5, 
                boxShadow: "0 10px 25px -5px rgba(181, 213, 229, 0.5)",
                backgroundColor: "rgba(247, 249, 252, 1)" 
              }}
            >
              <div className="h-24 w-24 bg-brand-sky/10 rounded-full p-4 flex items-center justify-center">
                <img 
                  src={ele.img} 
                  className="w-full h-full object-contain" 
                  alt={ele.head} 
                />
              </div>
              <h3 className="text-xl text-brand-navy font-bold mt-2">{ele.head}</h3>
              <p className="text-soft-gray text-center">{ele.descp}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerPlanning;