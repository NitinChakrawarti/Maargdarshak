import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import InputField from "../components/parts/inputfield";
import Layoutcomponent from "../layout/landing/layoutcomponent";
import Button from "../components/parts/button";
import { MentorLogin, MentorSignup, Signup, VerifyOtp } from "../api";
import { useNavigate } from "react-router-dom";
import FileUpload from "../components/parts/fileupload";
import Enterotp from "../components/enterotp";
import { setAuth } from "../redux/features/authSlice";
import { useDispatch } from "react-redux";
import { setMentor } from "../redux/features/mentorSlice";

const ExtendedSignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    profile: "",
    social: "",
    email: "",
    mobile: "",
    password: "",
    domains: "",
    expertise: "",
    experience: "",
  });
  const [isloading, setisloading] = useState(false);
  const [step, setStep] = useState(0);
  const [otpverification, setotpverification] = useState({
    email: "",
    otp: null,
    role: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        profile: file,
        iconPreview: URL.createObjectURL(file),
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // --------------- otp  handle ---------------//
  const setUserOtp = (otp) => {
    setotpverification({ ...otpverification, otp: parseInt(otp.userOTP, 10) });
  };

  const VerifyOtpOnClick = async (e) => {
    e.preventDefault();
    setisloading(true);
    const response = await VerifyOtp(otpverification);
    if (response.status == 200 && response.data.data === true) {
      setStep(2);
    } else {
      console.log(response);
    }
    setisloading(false);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("name", formData.name);
    formDataToSubmit.append("email", formData.email);
    formDataToSubmit.append("mobile", formData.mobile);
    formDataToSubmit.append("domains", formData.domains);
    formDataToSubmit.append("expertise", formData.expertise);
    formDataToSubmit.append("experience", formData.experience);
    formDataToSubmit.append("social", formData.social);
    formDataToSubmit.append("password", formData.password);
    // Append profile image file
    if (formData.profile && formData.profile instanceof File) {
      formDataToSubmit.append("profile", formData.profile);
    }
    setIsLoading(true);
    const response = await MentorSignup(formDataToSubmit);
    if (response.status === 200) {
      setStep(1);
      setotpverification({
        email: response.data.data.email,
        role: response.data.data.role,
      });
    } else {
      console.log(response);
    }
    setIsLoading(false);
  };

  // --------------- Login Request ---------------//
  const loginreq = async (e) => {
    e.preventDefault();
    setisloading(true);
    const response = await MentorLogin(formData);
    if (response.data.UserNotVerified) {
      setStep(1);
      setotpverification({
        email: response.data.data.email,
        role: response.data.data.role,
      });
    }
    if (response.status === 200) {
      dispatch(setAuth({ role: response.data.data.mentorData.role, data: {
         _id: response.data.data.mentorData._id,
        email: response.data.data.mentorData.email,
        name: response.data.data.mentorData.name,
        isverified: response.data.data.mentorData.isverified,
      } }));
      dispatch(setMentor(response.data.data.mentorData));
      navigate("/user");
      console.log("Login Success");
    } else {
      console.log(response);
    }
    setisloading(false);
  };

  return (
    <Layoutcomponent>
      <div className="flex max-w-7xl mx-auto pt-24 justify-center">
        <section className="flex flex-col bg-white gap-6 pb-10 px-8 py-6 mb-4 w-full md:w-3/4 lg:w-1/2">
          {step === 0 ? (
            <form className="space-y-4" onSubmit={handleSignup}>
              <h2 className="text-center text-3xl font-bold text-dark-blue">
                Apply for mentor
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Full Name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                />
                <InputField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <InputField
                  label="Mobile"
                  name="mobile"
                  type="text"
                  value={formData.mobile}
                  onChange={handleChange}
                />
                <InputField
                  label="Domains"
                  name="domains"
                  type="text"
                  value={formData.domains}
                  onChange={handleChange}
                />
                <InputField
                  label="Expertise"
                  name="expertise"
                  type="text"
                  value={formData.expertise}
                  onChange={handleChange}
                />
                <InputField
                  label="Experience"
                  name="experience"
                  type="text"
                  value={formData.experience}
                  onChange={handleChange}
                />
                <InputField
                  label="Social Profile"
                  name="social"
                  type="text"
                  value={formData.social}
                  onChange={handleChange}
                />
                <FileUpload
                  label="Profile Picture"
                  name="profile"
                  onChange={handleFileChange}
                />
              </div>
              <div className="relative">
                <InputField
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 top-8 right-4 flex items-center text-gray-600 hover:text-gray-800"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className=" gap-4">
                <Button
                  type="submit"
                  label={isLoading ? "Please Wait..." : "Sign Up"}
                  disabled={isLoading}
                  className=""
                />
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="bg-transparent mt-4 text-center w-full text-light-blue"
                >
                  Already have an mentor account? Login
                </button>
              </div>
            </form>
          ) : step === 1 ? (
            <div className="flex justify-center items-center lg:pt-0 py-32">
              <div>
                <h1 className="font-bold text-primary text-3xl pb-4">
                  {" "}
                  Enter OTP & Continue{" "}
                </h1>
                <p className="text-soft-gray text-center">
                  Please verify otp to complete <br /> signup process
                </p>
                <Enterotp setUserOtp={setUserOtp} />
                <div className="flex gap-8">
                  <button
                    onClick={() => setStep(0)}
                    className="w-full py-3 hover:text-dark-blue bg-bg text-primary rounded-lg shadow-md font-bold text-xl  transition duration-300"
                  >
                    Back
                  </button>
                  {
                    !isloading ? <button
                      onClick={VerifyOtpOnClick}
                      className="w-full py-3 hover:bg-light-blue bg-primary text-bg rounded-lg shadow-md font-bold text-xl  transition duration-300"
                    >
                      Verify
                    </button>
                      :
                      <button
                        disabled={true}
                        className="w-full py-3 hover:bg-light-blue bg-primary text-bg rounded-lg shadow-md font-bold text-xl cursor-not-allowed transition duration-300"
                      >
                        Verifying
                      </button>}
                </div>
              </div>
            </div>
          ) : (
            step === 2 && (
              <form className="space-y-4" onSubmit={handleSignup}>
                <h2 className="text-center text-3xl font-semibold text-gray-800">
                  Mentor Login
                </h2>
                <InputField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <div className="relative">
                  <InputField
                    label="Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 top-8 right-4 flex items-center text-gray-600 hover:text-gray-800"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <div className=" gap-4">
                  <Button
                    type="submit"
                    label={isLoading ? "Please Wait..." : "Login"}
                    disabled={isLoading}
                    className=""
                    onClick={loginreq}
                  />
                  <button
                    type="button"
                    onClick={() => setStep(0)}
                    className="bg-transparent mt-4 text-center w-full text-light-blue"
                  >
                    Don't have an mentor account? Apply Now
                  </button>
                </div>
              </form>
            )
          )}
        </section>
      </div>
    </Layoutcomponent>
  );
};

export default ExtendedSignUp;















// import { useState } from "react";
// import { Eye, EyeOff, Upload, User, Mail, Phone, Code, Award, Calendar, Globe, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";

// const MentorSignup = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [currentStep, setCurrentStep] = useState(0);
//   const [formData, setFormData] = useState({
//     name: "",
//     profile: null,
//     social: "",
//     email: "",
//     mobile: "",
//     password: "",
//     domains: "",
//     expertise: "",
//     experience: "",
//   });
//   const [otpData, setOtpData] = useState({
//     email: "",
//     otp: "",
//     role: "",
//   });
//   const [profilePreview, setProfilePreview] = useState(null);

//   const steps = ["Registration", "Verification", "Login"];

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData(prev => ({ ...prev, profile: file }));
//       setProfilePreview(URL.createObjectURL(file));
//     }
//   };

//   const handleOtpChange = (e) => {
//     setOtpData(prev => ({ ...prev, otp: e.target.value }));
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
    
//     // Simulate API call
//     setTimeout(() => {
//       setCurrentStep(1);
//       setOtpData(prev => ({ ...prev, email: formData.email, role: "mentor" }));
//       setIsLoading(false);
//     }, 2000);
//   };

//   const handleOtpVerification = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
    
//     // Simulate OTP verification
//     setTimeout(() => {
//       setCurrentStep(2);
//       setIsLoading(false);
//     }, 1500);
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
    
//     // Simulate login
//     setTimeout(() => {
//       alert("Login successful!");
//       setIsLoading(false);
//     }, 1500);
//   };

//   const InputField = ({ label, name, type, value, onChange, icon: Icon, placeholder, required = true }) => (
//     <div className="space-y-2">
//       <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
//         {Icon && <Icon size={16} />}
//         {label}
//       </label>
//       <input
//         type={type}
//         name={name}
//         value={value}
//         onChange={onChange}
//         placeholder={placeholder}
//         required={required}
//         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
//       />
//     </div>
//   );

//   const Button = ({ children, onClick, type = "button", variant = "primary", disabled = false, className = "" }) => {
//     const baseClasses = "px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
//     const variants = {
//       primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-blue-300",
//       secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500",
//       outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500"
//     };
    
//     return (
//       <button
//         type={type}
//         onClick={onClick}
//         disabled={disabled}
//         className={`${baseClasses} ${variants[variant]} ${disabled ? 'cursor-not-allowed' : ''} ${className}`}
//       >
//         {children}
//       </button>
//     );
//   };

//   const StepIndicator = () => (
//     <div className="flex items-center justify-center mb-8">
//       {steps.map((step, index) => (
//         <div key={step} className="flex items-center">
//           <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
//             index <= currentStep 
//               ? 'bg-blue-600 border-blue-600 text-white' 
//               : 'border-gray-300 text-gray-400'
//           }`}>
//             {index < currentStep ? <CheckCircle size={20} /> : index + 1}
//           </div>
//           <span className={`ml-2 text-sm font-medium ${
//             index <= currentStep ? 'text-blue-600' : 'text-gray-400'
//           }`}>
//             {step}
//           </span>
//           {index < steps.length - 1 && (
//             <div className={`w-16 h-0.5 mx-4 ${
//               index < currentStep ? 'bg-blue-600' : 'bg-gray-300'
//             }`} />
//           )}
//         </div>
//       ))}
//     </div>
//   );

//   const RegistrationForm = () => (
//     <form onSubmit={handleSignup} className="space-y-6">
//       <div className="text-center mb-8">
//         <h2 className="text-3xl font-bold text-gray-900 mb-2">Apply as a Mentor</h2>
//         <p className="text-gray-600">Share your expertise and help others grow</p>
//       </div>

//       {/* Profile Picture Upload */}
//       <div className="flex justify-center mb-6">
//         <div className="relative">
//           <div className="w-24 h-24 rounded-full border-4 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50">
//             {profilePreview ? (
//               <img src={profilePreview} alt="Profile" className="w-full h-full object-cover" />
//             ) : (
//               <User size={32} className="text-gray-400" />
//             )}
//           </div>
//           <label className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
//             <Upload size={16} />
//             <input
//               type="file"
//               onChange={handleFileChange}
//               accept="image/*"
//               className="hidden"
//             />
//           </label>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <InputField
//           label="Full Name"
//           name="name"
//           type="text"
//           value={formData.name}
//           onChange={handleInputChange}
//           icon={User}
//           placeholder="Enter your full name"
//         />
//         <InputField
//           label="Email Address"
//           name="email"
//           type="email"
//           value={formData.email}
//           onChange={handleInputChange}
//           icon={Mail}
//           placeholder="your@email.com"
//         />
//         <InputField
//           label="Mobile Number"
//           name="mobile"
//           type="tel"
//           value={formData.mobile}
//           onChange={handleInputChange}
//           icon={Phone}
//           placeholder="+1 (555) 123-4567"
//         />
//         <InputField
//           label="Primary Domains"
//           name="domains"
//           type="text"
//           value={formData.domains}
//           onChange={handleInputChange}
//           icon={Code}
//           placeholder="e.g., Web Development, AI/ML"
//         />
//         <InputField
//           label="Core Expertise"
//           name="expertise"
//           type="text"
//           value={formData.expertise}
//           onChange={handleInputChange}
//           icon={Award}
//           placeholder="e.g., React, Python, Leadership"
//         />
//         <InputField
//           label="Years of Experience"
//           name="experience"
//           type="text"
//           value={formData.experience}
//           onChange={handleInputChange}
//           icon={Calendar}
//           placeholder="e.g., 5+ years"
//         />
//       </div>

//       <InputField
//         label="Social Profile"
//         name="social"
//         type="url"
//         value={formData.social}
//         onChange={handleInputChange}
//         icon={Globe}
//         placeholder="LinkedIn, GitHub, or personal website"
//         required={false}
//       />

//       <div className="relative">
//         <InputField
//           label="Password"
//           name="password"
//           type={showPassword ? "text" : "password"}
//           value={formData.password}
//           onChange={handleInputChange}
//           placeholder="Create a strong password"
//         />
//         <button
//           type="button"
//           onClick={togglePasswordVisibility}
//           className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
//         >
//           {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//         </button>
//       </div>

//       <div className="flex flex-col gap-4">
//         <Button
//           type="submit"
//           disabled={isLoading}
//           className="w-full py-4 text-lg"
//         >
//           {isLoading ? (
//             <span className="flex items-center justify-center gap-2">
//               <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//               Creating Account...
//             </span>
//           ) : (
//             <span className="flex items-center justify-center gap-2">
//               Apply Now <ArrowRight size={20} />
//             </span>
//           )}
//         </Button>
        
//         <button
//           type="button"
//           onClick={() => setCurrentStep(2)}
//           className="text-blue-600 hover:text-blue-800 font-medium"
//         >
//           Already have an account? Sign in
//         </button>
//       </div>
//     </form>
//   );

//   const OtpVerificationForm = () => (
//     <div className="text-center space-y-6">
//       <div className="mb-8">
//         <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//           <Mail size={32} className="text-blue-600" />
//         </div>
//         <h2 className="text-3xl font-bold text-gray-900 mb-2">Verify Your Email</h2>
//         <p className="text-gray-600">
//           We've sent a verification code to<br />
//           <span className="font-medium text-gray-900">{otpData.email}</span>
//         </p>
//       </div>

//       <form onSubmit={handleOtpVerification} className="space-y-6">
//         <div className="flex justify-center">
//           <input
//             type="text"
//             value={otpData.otp}
//             onChange={handleOtpChange}
//             placeholder="Enter 6-digit code"
//             maxLength={6}
//             className="w-48 px-4 py-3 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent tracking-widest"
//           />
//         </div>

//         <div className="flex gap-4">
//           <Button
//             onClick={() => setCurrentStep(0)}
//             variant="outline"
//             className="flex-1 py-3"
//           >
//             <ArrowLeft size={20} className="mr-2" />
//             Back
//           </Button>
//           <Button
//             type="submit"
//             disabled={isLoading}
//             className="flex-1 py-3"
//           >
//             {isLoading ? (
//               <span className="flex items-center justify-center gap-2">
//                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                 Verifying...
//               </span>
//             ) : (
//               "Verify & Continue"
//             )}
//           </Button>
//         </div>
//       </form>

//       <button className="text-sm text-gray-500 hover:text-gray-700">
//         Didn't receive the code? <span className="text-blue-600 font-medium">Resend</span>
//       </button>
//     </div>
//   );

//   const LoginForm = () => (
//     <form onSubmit={handleLogin} className="space-y-6">
//       <div className="text-center mb-8">
//         <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
//         <p className="text-gray-600">Sign in to your mentor account</p>
//       </div>

//       <div className="space-y-4">
//         <InputField
//           label="Email Address"
//           name="email"
//           type="email"
//           value={formData.email}
//           onChange={handleInputChange}
//           icon={Mail}
//           placeholder="your@email.com"
//         />
        
//         <div className="relative">
//           <InputField
//             label="Password"
//             name="password"
//             type={showPassword ? "text" : "password"}
//             value={formData.password}
//             onChange={handleInputChange}
//             placeholder="Enter your password"
//           />
//           <button
//             type="button"
//             onClick={togglePasswordVisibility}
//             className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
//           >
//             {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//           </button>
//         </div>
//       </div>

//       <div className="flex flex-col gap-4">
//         <Button
//           type="submit"
//           disabled={isLoading}
//           className="w-full py-4 text-lg"
//         >
//           {isLoading ? (
//             <span className="flex items-center justify-center gap-2">
//               <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//               Signing In...
//             </span>
//           ) : (
//             "Sign In"
//           )}
//         </Button>
        
//         <button
//           type="button"
//           onClick={() => setCurrentStep(0)}
//           className="text-blue-600 hover:text-blue-800 font-medium"
//         >
//           Don't have an account? Apply now
//         </button>
//       </div>
//     </form>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
//       <div className="w-full max-w-2xl">
//         <div className="bg-white rounded-2xl shadow-xl p-8">
//           <StepIndicator />
          
//           {currentStep === 0 && <RegistrationForm />}
//           {currentStep === 1 && <OtpVerificationForm />}
//           {currentStep === 2 && <LoginForm />}
//         </div>
        
//         <div className="text-center mt-6 text-sm text-gray-500">
//           By continuing, you agree to our{' '}
//           <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
//           {' '}and{' '}
//           <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MentorSignup;