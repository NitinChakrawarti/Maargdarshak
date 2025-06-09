// import React from "react";

// const Beginjourney = () => {
//   return (
//     <div className="bg-primary text-bg  py-20 lg:py-16">
//       <div className="max-w-7xl items-center justify-evenly flex lg:flex-row flex-col mx-auto md:px-10 px-4">
//         <div className="pl-10">
//           <h1 className="text-bg text-4xl  font-bold text-center">
//             {" "}
//             Start Your Journey with Maargdarshak
//           </h1>
//           <p className="text-bg/80 mt-2">
//             To get Quality Resoureces and guidance form experts{" "}
//           </p>
//         </div>
//         <div className="lg:mt-0 mt-8">
//           <button className="text-primary bg-bg  font-bold px-8 py-4 text-2xl rounded-full">
//             Join Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Beginjourney;





import React from "react";
import { Link } from "react-router-dom";


const Beginjourney = () => {
  return (
    <div className="bg-brand-navy text-white py-20 lg:py-16">
      <div className="max-w-7xl items-center justify-evenly flex lg:flex-row flex-col mx-auto md:px-10 px-4">
        <div className="pl-0 lg:pl-10">
          <h1 className="text-4xl font-bold text-center lg:text-left">
            Start Your Journey with Maargdarshak
          </h1>
          <p className="text-brand-sky mt-2 text-center lg:text-left">
            To get Quality Resources and guidance from experts
          </p>
        </div>
        <div className="lg:mt-0 mt-8">
          <Link 
            to="/signup"
            className="bg-brand-orange hover:bg-brand-orange/90 text-bg font-bold px-6 py-3 text-xl rounded-2xl"
          >
            Join Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Beginjourney;