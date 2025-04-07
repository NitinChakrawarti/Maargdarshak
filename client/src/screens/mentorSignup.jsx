import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import InputField from "../components/parts/inputfield";
import Layoutcomponent from "../layout/landing/layoutcomponent";
import Button from "../components/parts/button";
import { MentorLogin, MentorSignup, Signup, VerifyOtp } from "../api";
import { useNavigate } from "react-router-dom";
import FileUpload from "../components/parts/fileupload";
import Enterotp from "../components/enterotp";

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
                  label="Apply Now"
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
                  <button
                    onClick={VerifyOtpOnClick}
                    className="w-full py-3 hover:bg-light-blue bg-primary text-bg rounded-lg shadow-md font-bold text-xl  transition duration-300"
                  >
                    Verify
                  </button>
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
                    label="Login Now"
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
