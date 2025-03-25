import { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

const navele = [
  {
    button: "Home",
    link: "/"
  },
  {
    button: "About",
    link: "/about"
  },
  {
    button: "Our Mentors",
    link: "/mentors"
  },
];


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const location = useLocation();

  return (
    <nav className="bg-bg shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl text-primary font-bold text-secondary">
              Margdarshak
            </Link>
          </div>

          <div className="hidden md:flex space-x-8 items-center relative">
            {navele.map((ele, index) => (
              <Link
                to={ele.link}
                className={`text-secondary hover:text-primary  font-semibold relative after:bg-primary after:absolute after:h-[2px] after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer ${ele.link === location.pathname ? "text-primary after:bg-primary after:w-full  " : "text-soft-gray"} `}
                key={index}
                onClick={() => window.scrollTo(0, 0)}
              >
                {ele.button}
              </Link>
            ))}
            <Link to='/signup'
              onClick={() => window.scrollTo(0, 0)}
            >
              <button className="mt-4 md:mt-0 px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg shadow-lg font-semibold  transition duration-300">

                Sign Up

              </button>
            </Link>

          </div>

          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="text-primary hover:text-secondary focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {
        isOpen && (
          <div className="md:hidden">
            <div className=" flex flex-col justify-end px-2 pt-2 pb-3 space-y-1 sm:px-3">

              {navele.map((ele, index) => (
                <Link
                  to={ele.link}
                  className="block text-dark-blue hover:bg-gray-200 px-3 py-2 rounded-md text-base font-medium" key={index} onClick={() => setIsOpen(false)}
                >
                  {ele.button}
                </Link>
              ))}
              <div className='flex flex-col w-40'>
                <Link to='/signup' >
                  <button className="mt-4 md:mt-0 px-6 py-2 bg-secondary rounded-lg shadow-lg font-semibold text-white bg-primary hover:bg-dark-blue  transition duration-300" onClick={() => setIsOpen(false)}>
                    Sign Up
                  </button>
                </Link>
              </div>

            </div>
          </div>
        )
      }
    </nav >
  );
};

export default Navbar;
