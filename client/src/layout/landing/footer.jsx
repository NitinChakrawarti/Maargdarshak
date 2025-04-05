// import { Link } from "react-router-dom";

// const Footer = () => {
//   return (
//     <footer className="bg-primary text-white pt-16 pb-4 px-4 md:px-8">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
//         {/* Logo and About Section */}
//         <div className="space-y-4">
//           <h2 className="text-2xl font-bold text-bg">Margdarshak</h2>
//           <p className="text-white/80">
//             Your go-to platform for career guidance, resources, and
//             opportunities to reach your professional goals.
//           </p>
//           <div className="flex space-x-4">
//             <a
//               href="#"
//               aria-label="Facebook"
//               className="text-white/80 hover:text-white"
//             >
//               <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
//                 {/* Facebook Icon */}
//                 <path d="M22 12c0-5.522-4.478-10-10-10S2 6.478 2 12c0 5.014 3.675 9.129 8.438 9.874v-6.987H7.896v-2.887h2.542V9.845c0-2.514 1.492-3.911 3.775-3.911 1.095 0 2.238.195 2.238.195v2.462h-1.261c-1.244 0-1.63.773-1.63 1.564v1.878h2.773l-.443 2.887h-2.33v6.987C18.325 21.13 22 17.014 22 12z" />
//               </svg>
//             </a>
//             <a
//               href="#"
//               aria-label="Twitter"
//               className="text-white/80 hover:text-white"
//             >
//               <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
//                 {/* Twitter Icon */}
//                 <path d="M8.29 20c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.013-.53A8.36 8.36 0 0 0 22 5.92a8.19 8.19 0 0 1-2.357.646 4.107 4.107 0 0 0 1.804-2.27 8.223 8.223 0 0 1-2.605.996A4.096 4.096 0 0 0 11.072 8c0 .321.036.634.106.933A11.637 11.637 0 0 1 3.209 4.924a4.096 4.096 0 0 0 1.27 5.464A4.073 4.073 0 0 1 2.8 9.7v.052a4.097 4.097 0 0 0 3.285 4.016 4.09 4.09 0 0 1-1.85.07A4.097 4.097 0 0 0 8.29 20" />
//               </svg>
//             </a>
//             <a
//               href="#"
//               aria-label="LinkedIn"
//               className="text-white/80 hover:text-white"
//             >
//               <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
//                 {/* LinkedIn Icon */}
//                 <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zM8.339 19.339h-2.678v-8.679h2.678v8.679zM7 8.652c-.856 0-1.533-.698-1.533-1.556 0-.857.677-1.556 1.533-1.556s1.556.699 1.556 1.556c0 .857-.699 1.556-1.556 1.556zM18.339 19.339h-2.678v-4.089c0-.974-.346-1.64-1.225-1.64-.668 0-1.064.448-1.239.881-.064.155-.08.372-.08.59v4.258h-2.679v-8.679h2.679v1.18c.356-.553.993-1.34 2.414-1.34 1.768 0 3.108 1.154 3.108 3.637v5.202z" />
//               </svg>
//             </a>
//           </div>
//         </div>

//         {/* Quick Links */}
//         <div className="flex flex-col md:items-center ">
//           <h3 className="text-xl font-semibold text-white">Quick Links</h3>
//           <ul className="mt-4 space-y-2 flex items-start flex-col">
//             <Link
//               to="/"
//               className="text-white/80 hover:text-white"
//               onClick={() => window.scrollTo(0, 0)}
//             >
//               Home
//             </Link>
//             <Link
//               to="/about"
//               className="text-white/80 hover:text-white "
//               onClick={() => window.scrollTo(0, 0)}
//             >
//               About
//             </Link>
//             <Link
//               to="/ourmentors"
//               className="text-white/80 hover:text-white"
//               onClick={() => window.scrollTo(0, 0)}
//             >
//               Mentors
//             </Link>
//           </ul>
//         </div>

//         {/* Contact Information */}
//         <div>
//           <h3 className="text-xl font-semibold text-white">Contact Us</h3>
//           <p className="mt-4 text-white/80">Email: support@margdarshak.com</p>
//           <p className="text-white/80">Phone: +1 234 567 890</p>
//           <p className="text-white/80">Address: RGPV university bhopal M.P. </p>
//         </div>
//       </div>

//       {/* Footer Bottom */}
//       <div className="mt-8 border-t border-gray-700 pt-4 text-center text-white/80">
//         <p>
//           &copy; {new Date().getFullYear()} Margdarshak. All Rights Reserved.
//         </p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-brand-navy text-white pt-16 pb-6 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo and Description */}
        <div>
          <h2 className="text-2xl font-bold text-brand-orange">Margdarshak</h2>
          <p className="mt-4 text-brand-sky">
            Your go-to platform for career guidance, resources, and opportunities to reach your professional goals.
          </p>
          <div className="flex space-x-4 mt-4">
            {[
              {
                label: "Facebook",
                path: "M22 12c0-5.522-4.478-10...",
              },
              {
                label: "Twitter",
                path: "M8.29 20c7.547 0 11.675-6.253...",
              },
              {
                label: "LinkedIn",
                path: "M19 0h-14c-2.761 0-5 2.239...",
              },
            ].map((item, i) => (
              <a
                key={i}
                href="#"
                aria-label={item.label}
                className="text-brand-sky hover:text-white transition-colors"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d={item.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:text-center">
          <h3 className="text-xl font-semibold text-white">Quick Links</h3>
          <ul className="mt-4 space-y-2">
            {[
              { label: "Home", to: "/" },
              { label: "About", to: "/about" },
              { label: "Mentors", to: "/ourmentors" },
            ].map(({ label, to }, i) => (
              <li key={i}>
                <Link
                  to={to}
                  onClick={() => window.scrollTo(0, 0)}
                  className="text-brand-sky hover:text-white transition"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold text-white">Contact Us</h3>
          <ul className="mt-4 space-y-1 text-brand-sky">
            <li>Email: support@margdarshak.com</li>
            <li>Phone: +1 234 567 890</li>
            <li>Address: RGPV University, Bhopal, M.P.</li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="mt-10 border-t border-white/20 pt-4 text-center text-brand-sky text-sm">
        &copy; {new Date().getFullYear()} Margdarshak. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
