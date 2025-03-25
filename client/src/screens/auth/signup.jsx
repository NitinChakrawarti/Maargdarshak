// import { useState } from 'react';
// import { useAuth0 } from "@auth0/auth0-react";
// import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
// import axios from 'axios'
// // import { useContext } from 'react';
// // import { LoginContext } from '../context/backcontext';
// import { useNavigate } from 'react-router-dom';

import Layoutcomponent from "../../components/layoutcomponent";

// const SignUp = () => {
// const [isLogin, setIsLogin] = useState(false);
// const [showPassword, setShowPassword] = useState(false);
// const [formData, setFormData] = useState({ name: '', email: '', password: '' });
// const { loginWithRedirect } = useAuth0();
// const [isloading, setisloading] = useState(false);
// const navigate = useNavigate();


// const loginContext = useContext(LoginContext);

// // Handle form input changes
// const handleChange = (e) => {
//   setFormData({ ...formData, [e.target.name]: e.target.value });
// };

// // Toggle between Login and Sign-Up form
// const toggleForm = () => {
//   setIsLogin(!isLogin);
// };

// // Toggle password visibility
// const togglePasswordVisibility = () => {
//   setShowPassword(!showPassword);
// };

//   // Handle form submission
//   const signupreq = async (e) => {
//     e.preventDefault();
//     setisloading(true);
//     const result = await axios.post(`${import.meta.env.VITE_USER_API}/auth/sign-up`, {
//       name: formData.name,
//       email: formData.email,
//       password: formData.password
//     })
//       .then((response) => {
//         const data = response.data;
//         if (data) {
//           alert("You can login now")
//           setIsLogin(true);
//         }
//       })
//       .catch((error) => {
//         alert('Sign up failed', error)
//         console.error('Error:', error);
//       })
//       .finally(() => {
//         setisloading(false); // Ensure this function or state setter exists in your context
//         setFormData({ name: '', email: '', password: '' });
//       });
//   };


//   const loginreq = async (e) => {
//     e.preventDefault();
//     setisloading(true);
//     const result = await axios.post(`${import.meta.env.VITE_USER_API}/auth/user-login`, {
//       email: formData.email,
//       password: formData.password
//     },
//       {
//         withCredentials: true,
//       })
//       .then((response) => {
//         const data = response.data;
//         if (data) {
//           navigate('/');
//           loggedin();
//         }
//       })
//       .catch((error) => {
//         alert(`${error.response.data.message}`)
//         console.error('Error:', error);
//       })
//       .finally(() => {
//         setisloading(false); // Ensure this function or state setter exists in your context
//         setFormData({ email: '', password: '' });
//       });
//   }

//   const loggedin = () => {
//     loginContext.setlogin(true);
//   }

//   return (
//     <div className="flex flex-col md:flex-row w-full justify-center">
//       {/* Sidebar */}
//       <div className="bg-primary pt-20 md:pt-0 pb-10 px-5 md:px-10 lg:px-20  flex flex-col items-center justify-center md:w-[30%] w-full">
//         <h1 className="font-bold text-[6vmax] text-white">मार्गदर्शक</h1>
//         <p className="text-lg text-center text-white/80">
//           Join us to know the real <br /> power you have
//         </p>
//       </div>

//       {/* Main Content */}
// <section className="flex flex-col bg-white pt-0 md:pt-0 gap-10 pb-10 px-5 mt-16 md:px-10 lg:px-20 justify-center md:w-[70%] w-full">
//   <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
//     <h2 className="text-center text-3xl font-semibold text-gray-800 mb-6">
//       {isLogin ? 'Login to Your Account' : 'Create an Account'}
//     </h2>

//     {/* Form */}
//     <form className="space-y-4" onSubmit={!isLogin ? signupreq : loginreq}>
//       {/* Name Field (Visible only for Sign-Up) */}
//       {!isLogin && (
//         <div>
//           <label className="block text-gray-700 font-medium mb-2">Full Name</label>
//           <input
//             type="text"
//             name="name"
//             placeholder="John Doe"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
//             required
//           />
//         </div>
//       )}

//       {/* Email Field */}
//       <div>
//         <label className="block text-gray-700 font-medium mb-2">Email</label>
//         <input
//           type="email"
//           name="email"
//           placeholder="you@example.com"
//           value={formData.email}
//           onChange={handleChange}
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
//           required
//         />
//       </div>

//       {/* Password Field */}
//       <div>
//         <label className="block text-gray-700 font-medium mb-2">Password</label>
//         <div className="relative">
//           <input
//             type={showPassword ? 'text' : 'password'}
//             name="password"
//             placeholder="********"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
//             required
//           />
//           <button
//             type="button"
//             onClick={togglePasswordVisibility}
//             className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-gray-800"
//           >
//             {showPassword ? <FaEyeSlash /> : <FaEye />}
//           </button>
//         </div>
//       </div>

//       {/* Submit Button */}
//       <button
//         type="submit"
//         className="w-full py-3 bg-primary text-white rounded-lg shadow-md hover:bg-primary/80 transition duration-300"
//       >
//         {/* {isLogin ? 'Login' : 'Sign Up'} */}
//         {isLogin ? (!isloading ? 'Login' : 'Login in process') : (!isloading ? 'Sign up' : 'processing')}
//       </button>
//     </form>

//     {/* Toggle Form Link */}
//     <div className="mt-6 text-center">
//       <p className="text-gray-600">
//         {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
//         <span
//           onClick={toggleForm}
//           className="text-primary font-semibold cursor-pointer hover:underline"
//         >
//           {isLogin ? 'Sign Up' : 'Login'}
//         </span>
//       </p>
//     </div>
//   </div>

//         {/* Google Sign-In */}
//         {/* <h1 className="text-3xl font-bold ml-48">Or</h1>
//         <div className="mx-auto md:ml-32 flex items-center">
//           Continue with
//           <button
//             onClick={() => loginWithRedirect()}
//             className="flex justify-center items-center gap-4 mx-2 py-2 px-4 text-white rounded-lg shadow-md bg-black hover:bg-primary/80 transition duration-300"
//           >
//             <FaGoogle /> Google
//           </button>
//         </div> */}
//       </section>
//     </div>
//   );
// };

// export default SignUp;







import { useState } from 'react';
import signup from '../../assets/3071357.jpg'
import axios from 'axios'
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import Enterotp from "../../components/enterotp";
import { Navigate, useNavigate } from "react-router-dom";


const SignUp = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isloading, setisloading] = useState(false);
  const [step, setStep] = useState(0);
  const [otpverification, setotpverification] = useState({
    email: "",
    otp: ""
  })

  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Toggle between Login and Sign-Up form
  const toggleForm = () => {
    if (step === 2) {
      setStep(0)
    }
    else {
      setStep(2)
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  //---------------api calls ---------------------//

  const signupreq = async (e) => {
    e.preventDefault();
    setisloading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password
      })

      if (response.data.data) {
        setFormData({ email: '', password: '' });
        const otpRequest = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/otpgenerate`, {
          email: response.data.data
        })
        if (otpRequest.data.success) {
          setStep(1),
            setotpverification({
              email: response.data.data
            })
        }
        else {
          alert(otpRequest.data.message)
        }
      }
    }
    catch (error) {
      console.log(error.response.data.message);
      setisloading(false)
    }
  };


  const VerifyOtp = async () => {
    const verificationResponse = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/otpverify`, {
      email: otpverification.email,
      otp: otpverification.otp
    })

    if (verificationResponse.data.success) {
      setStep(2);
    }
  }

  const loginreq = async (e) => {
    e.preventDefault();
    setisloading(true);
    try {
      const result = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/user-login`, {
        email: formData.email,
        password: formData.password
      });

      if (result.data.success) {
        const token = result.data.logintoken
        localStorage.setItem("logintoken",token);
        navigate('/goals')
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  //---------------otp  handle ---------------//
  const setUserOtp = (otp) => {
    setotpverification({
      otp: otp.userOTP
    })
  }

  return (

    <Layoutcomponent >
      <div className=" flex max-w-7xl mx-auto pt-24 md:pt-24 justify-evenly ">
        <div className="lg:w-[50%] lg:block hidden" >
          <img src={signup} alt="" />
        </div>


        {
          step != 1 ?
            <section className=" flex flex-col bg-white gap-10 pb-10 px-5 md:w-[40%] md:px-10 lg:px-12 justify-center">
              <div className="max-w-md bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-center text-3xl font-semibold text-gray-800 mb-6">
                  {step === 2 ? 'Login to Your Account' : 'Create an Account'}
                </h2>

                {/* Form */}
                <form className="space-y-4" onSubmit={step === 0 ? signupreq : loginreq}
                >
                  {/* Name Field (Visible only for Sign-Up) */}
                  {step === 0 && (
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                        required
                      />
                    </div>
                  )}

                  {/* Email Field */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                      required
                    />
                  </div>

                  {/* Password Field */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="********"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                        required
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-gray-800"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    className="w-full py-3 bg-primary text-white rounded-lg shadow-md hover:bg-primary transition duration-300"
                  >
                    {/* {isLogin ? 'Login' : 'Sign Up'} */}
                    {step === 2 ? (!isloading ? 'Login' : 'Login in process') : (!isloading ? 'Sign up' : 'processing')}
                  </button>
                </form>

                {/* Toggle Form Link */}
                <div className="mt-6 text-center">
                  <p className="text-gray-600">
                    {step === 2 ? "Don't have an account?" : 'Already have an account?'}{' '}
                    <span
                      onClick={toggleForm}
                      className="text-primary font-semibold cursor-pointer hover:underline"
                    >
                      {step === 2 ? 'Sign Up' : 'Login'}
                    </span>
                  </p>
                </div>
              </div>
            </section>
            :
            <div className="flex justify-center items-center lg:pt-0 py-32">
              <div>
                <h1 className="font-bold text-primary text-3xl pb-4"> Enter OTP & Continue </h1>
                <p className="text-soft-gray text-center">Please verify otp to complete <br /> signup process</p>
                <Enterotp setUserOtp={setUserOtp} />
                <div className="flex gap-8">
                  <button
                    onClick={() => setStep(0)}
                    className="w-full py-3 hover:text-dark-blue bg-bg text-primary rounded-lg shadow-md font-bold text-xl  transition duration-300"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => VerifyOtp()}
                    className="w-full py-3 hover:bg-light-blue bg-primary text-bg rounded-lg shadow-md font-bold text-xl  transition duration-300"
                  >
                    Verify
                  </button>
                </div>
              </div>
            </div>
        }


      </div>
    </Layoutcomponent >
  )
}

export default SignUp;



// {
//   step != 1 ?
//     <section className=" flex flex-col bg-white gap-10 pb-10 px-5 md:w-[40%] md:px-10 lg:px-20 justify-center">
//       <div className="max-w-md bg-white rounded-lg shadow-lg p-6">
//         <h2 className="text-center text-3xl font-semibold text-gray-800 mb-6">
//           {step === 2 ? 'Login to Your Account' : 'Create an Account'}
//         </h2>

//         {/* Form */}
//         <form className="space-y-4" onSubmit={step === 2 ? signupreq : null} >
//           {/* Name Field (Visible only for Sign-Up) */}
//           {!isLogin && (
//             <div>
//               <label className="block text-gray-700 font-medium mb-2">Full Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="John Doe"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
//                 required
//               />
//             </div>
//           )}

//           {/* Email Field */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">Email</label>
//             <input
//               type="email"
//               name="email"
//               placeholder="you@example.com"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
//               required
//             />
//           </div>

//           {/* Password Field */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">Password</label>
//             <div className="relative">
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 name="password"
//                 placeholder="********"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={togglePasswordVisibility}
//                 className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-gray-800"
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full py-3 bg-primary text-white rounded-lg shadow-md hover:bg-primary transition duration-300"
//           >
//             {/* {isLogin ? 'Login' : 'Sign Up'} */}
//             {step === 2 ? (!isloading ? 'Login' : 'Login in process') : (!isloading ? 'Sign up' : 'processing')}
//           </button>
//         </form>

//         {/* Toggle Form Link */}
//         <div className="mt-6 text-center">
//           <p className="text-gray-600">
//             {step === 2 ? "Don't have an account?" : 'Already have an account?'}{' '}
//             <span
//               onClick={toggleForm}
//               className="text-primary font-semibold cursor-pointer hover:underline"
//             >
//               {step === 2 ? 'Sign Up' : 'Login'}
//             </span>
//           </p>
//         </div>
//       </div>
//     </section>
//     :
//     <div className="flex justify-center items-center lg:pt-0 py-32">
//       <div>
//         <h1 className="font-bold text-primary text-3xl pb-4"> Enter OTP & Continue </h1>
//         <p className="text-soft-gray text-center">Please verify otp to complete <br /> signup process</p>
//         <Enterotp setUserOtp={setUserOtp} />
//         <button
//           type="submit"
//           className="w-full py-3 hover:bg-light-blue bg-primary text-bg rounded-lg shadow-md font-bold text-xl  transition duration-300"
//         >
//           Verify
//         </button>
//       </div>
//     </div>
// }