import { useState } from "react";
import signup from "../assets/3071357.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Enterotp from "../components/enterotp";
import Layoutcomponent from "../layout/landing/layoutcomponent";
import InputField from "../components/parts/inputfield";
import Button from "../components/parts/button";
import { Login, Signup, VerifyOtp } from "../api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth } from "../redux/features/authSlice";

const SignUp = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
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

  // Toggle between Login and Sign-Up form
  const toggleForm = () => {
    if (step === 2) {
      setStep(0);
    } else {
      setStep(2);
    }
  };

  // --------------- Toggle password visibility ---------------//
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // --------------- otp  handle ---------------//
  const setUserOtp = (otp) => {
    setotpverification({ ...otpverification, otp: parseInt(otp.userOTP, 10) });
  };

  // --------------- Signup Request ---------------//
  const signupreq = async (e) => {
    e.preventDefault();
    setisloading(true);
    const response = await Signup(formData);
    if (response.status == 200) {
      setStep(1);
      setotpverification({
        email: response.data.data.email,
        role: response.data.data.role,
      });
    } else {
      console.log(response);
    }
    setisloading(false);
  };

  // --------------- Verify otp ---------------//
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

  // --------------- Login Request ---------------//
  const loginreq = async (e) => {
    e.preventDefault();
    setisloading(true);
    const response = await Login(formData);
    if (response.data.UserNotVerified) {
      setStep(1);
      setotpverification({
        email: response.data.data.email,
        role: response.data.data.role,
      });
    }
    if (response.status === 200) {
      dispatch(setAuth({ role: response.data.data.role, data: response.data.data }));
      navigate("/user");
      console.log("Login Success");
    } else {
      console.log(response);
    }
    setisloading(false);
  };

  return (
    <Layoutcomponent>
      <div className=" flex max-w-7xl md:mx-auto pt-24 md:pt-24 justify-evenly ">
        <div className="lg:w-[50%] lg:block hidden">
          <img src={signup} alt="" />
        </div>
        {step != 1 ? (
          <section className=" flex flex-col bg-white gap-10 pb-10 px-0 lg:w-[40%] w-[90%] md:w-[70%] md:px-10 lg:px-12 justify-center">
            <div className="md:max-w-md bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-center text-3xl font-semibold text-gray-800 mb-6">
                {step === 2 ? "Login to Your Account" : "Create an Account"}
              </h2>

              {/* Form */}
              <form
                className="space-y-4"
                onSubmit={step === 0 ? signupreq : loginreq}
              >
                {/* Name Field (Visible only for Sign-Up) */}
                {step === 0 && (
                  <InputField
                    label="Full Name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                  />
                )}

                {/* Email Field */}
                <InputField
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="contact@easydevs.tech"
                  value={formData.email}
                  onChange={handleChange}
                />

                {/* Password Field */}
                <div className="relative">
                  <InputField
                    label="Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
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
                {/* Submit Button */}
                <Button
                  type="submit"
                  label={step === 2 ? "Login" : "Sign Up"}
                />
              </form>

              {/* Toggle Form Link */}
              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  {step === 2
                    ? "Don't have an account?"
                    : "Already have an account?"}{" "}
                  <span
                    onClick={toggleForm}
                    className="text-primary font-semibold cursor-pointer hover:underline"
                  >
                    {step === 2 ? "Sign Up" : "Login"}
                  </span>
                </p>
              </div>
            </div>
          </section>
        ) : (
          <div className="flex justify-center items-center lg:pt-0 py-32">
            <div>
              <h1 className="font-bold text-brand-navy text-3xl pb-4">
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
        )}
      </div>
    </Layoutcomponent>
  );
};

export default SignUp;
