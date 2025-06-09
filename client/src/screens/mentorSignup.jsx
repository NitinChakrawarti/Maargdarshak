import { useState } from "react";
import { Calendar1, Eye, EyeClosed, Globe, Mail, Medal, Phone, TagsIcon, Timer, Upload, User } from "lucide-react";
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
import MentorPng from '../assets/mentor.png'

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

  const [profilePreview, setProfilePreview] = useState(null);

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
      dispatch(setAuth({
        role: response.data.data.mentorData.role, data: {
          _id: response.data.data.mentorData._id,
          email: response.data.data.mentorData.email,
          name: response.data.data.mentorData.name,
          isverified: response.data.data.mentorData.isverified,
        }
      }));
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
      <div className="flex max-w-7xl mx-auto pt-16 md:pt-20 justify-center gap-36 items-center ">
        <section className={`flex flex-col bg-white shadow-xl gap-6 pb-10 mb-6 rounded-4xl w-full md:w-3/4 ${step === 0 ? "lg:w-2/3" : "lg:w-1/2"}`}>
          <div className="pl-6 lg:pl-12 mb-4 bg-brand-navy rounded-t-4xl rounded-b-[100%]  rounded-bl-[20%] pb-6">
            <h1 className="text-2xl lg:text-3xl font-bold text-bg pt-4">
              {
                step === 0 ? "Mentor Sign Up" : step === 1 ? "Verify OTP" : "Mentor Login"
              }
            </h1>
          </div>
          {step === 0 ? (
            <form className="space-y-10 px-4 md:px-8 " onSubmit={handleSignup}>
              <div className="">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full border-4 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50">
                      {profilePreview ? (
                        <img src={profilePreview} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <User size={32} className="text-gray-400" />
                      )}
                    </div>
                    <label className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                      <Upload size={16} />
                      <input
                        type="file"
                        onChange={handleFileChange}
                        name="profile"
                        accept="image/*"
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <InputField
                    label="Full Name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    icon={User}
                  />
                  <InputField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    icon={Mail}
                  />
                  <InputField
                    label="Mobile"
                    name="mobile"
                    type="text"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Enter your mobile number"
                    required
                    icon={Phone}
                  />
                  <InputField
                    label="Domains"
                    name="domains"
                    type="text"
                    value={formData.domains}
                    onChange={handleChange}
                    placeholder="e.g., Web Development, AI/ML"
                    required
                    icon={TagsIcon}
                  />
                  <InputField
                    label="Expertise"
                    name="expertise"
                    type="text"
                    value={formData.expertise}
                    onChange={handleChange}
                    placeholder="e.g., React, Python, Leadership"
                    required
                    icon={Medal}
                  />
                  <InputField
                    label="Experience"
                    name="experience"
                    type="text"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="e.g., 5+ years"
                    required
                    icon={Calendar1}
                  />
                  <InputField
                    label="Social Profile"
                    name="social"
                    type="text"
                    value={formData.social}
                    onChange={handleChange}
                    placeholder="LinkedIn, GitHub, or personal website"
                    required={false}
                    icon={Globe}
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
                      {showPassword ? <EyeClosed /> : <Eye />}
                    </button>
                  </div>
                </div>
                <div className="gap-4 mt-8">
                  <Button
                    type="submit"
                    label={isLoading ? "Please Wait..." : "Sign Up"}
                    disabled={isLoading}
                    className=""
                  />
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="bg-transparent mt-4 text-center w-full text-light-blue cursor-pointer"
                  >
                    Already have an mentor account? Login
                  </button>
                </div>
              </div>
            </form>
          ) : step === 1 ? (
            <div className="flex justify-center items-center lg:pt-0 py-32">
              <div>

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
              <form className="space-y-4 px-4 md:px-8" onSubmit={handleSignup}>

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
                    {showPassword ? <FaEyeSlash /> : <Eye />}
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
                    className="bg-transparent mt-4 text-center w-full text-light-blue cursor-pointer"
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


