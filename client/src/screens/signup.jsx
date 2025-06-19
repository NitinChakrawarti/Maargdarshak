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
import { setUser } from "../redux/features/userSlice";
import { Mail, UserIcon } from "lucide-react";
import ThirdPartyAuth from "../components/thirdpartyauth";

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
      dispatch(setAuth({
        role: response.data.data.userData.role, data: {
          _id: response.data.data.userData._id,
          email: response.data.data.userData.email,
          name: response.data.data.userData.name,
          isverified: response.data.data.userData.isverified,
        }
      }));
      dispatch(setUser(response.data.data.userData));
      navigate("/user");
      console.log("Login Success");
    } else {
      console.log(response);
    }
    setisloading(false);
  };

  return (

    <div className="flex flex-col max-w-7xl md:mx-auto pt-24 md:pt-24 mb-6 items-center justify-center gap-10 lg:flex-row">
      <div className="flex bg-white pb-6 rounded-4xl shadow-lg flex-col gap-10 items-center lg:w-[35%] w-[90%] md:w-[70%] justify-center">
        <div className="pl-6 lg:pl-12 mb-0 bg-brand-navy rounded-t-4xl rounded-b-[100%] w-full rounded-bl-[20%] pb-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-bg pt-4">
            {
              step === 0 ? "Sign Up" : step === 1 ? "Verify OTP" : "Login"
            }
          </h1>
        </div>
        {step != 1 ? (
          <div className="lg:max-w-md z-20 px-8 w-full">
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
                  required={step === 0 ? true : false}
                  icon={UserIcon}
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
                required
                icon={Mail}
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
                  className="absolute inset-y-0 top-8 cursor-pointer right-4 flex items-center text-gray-600 hover:text-gray-800"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {/* Submit Button */}
              {!isloading && <Button
                type="submit"
                label={
                  step === 2 ? "Login" : "Sign Up"
                }
                className="cursor-pointer"
              />}
              {
                isloading &&
                <Button
                  label={
                    'Please Wait...'
                  }
                  diabled={true}
                  className="bg-gray-400 text-white cursor-not-allowed"
                />
              }
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

            <div className="w-full flex items-center justify-center my-4">
              <hr className="flex-grow border-gray-300" />
              <p className="mx-4 text-gray-500 font-medium">Or</p>
              <hr className="flex-grow border-gray-300" />
            </div>
            {
              step === 0 ? <ThirdPartyAuth method={"signup"} /> : <ThirdPartyAuth method={"login"} />
            }
          </div>
        ) : (
          <div className="flex justify-center items-center lg:pt-0 py-4">
            <div>
              {/* <h1 className="font-bold text-brand-navy text-3xl pb-4">
                  {" "}
                  Enter OTP & Continue{" "}
                </h1> */}
              <p className="text-soft-gray text-center">
                Please verify otp to complete <br /> signup process
              </p>
              <Enterotp setUserOtp={setUserOtp} />
              <div className="flex mt-8 gap-8">
                <button
                  onClick={() => setStep(0)}
                  className="w-full py-3 hover:text-dark-blue bg-bg text-primary rounded-lg shadow-md font-bold text-lg  transition duration-300"
                >
                  Back
                </button>
                {
                  !isloading ? <button
                    onClick={VerifyOtpOnClick}
                    className="w-full py-3 hover:bg-light-blue bg-primary text-bg rounded-lg shadow-md font-bold text-lg  transition duration-300"
                  >
                    Verify
                  </button>
                    :
                    <button
                      onClick={VerifyOtpOnClick}
                      className="w-full py-3 hover:bg-light-blue bg-primary text-bg rounded-lg shadow-md font-bold text-lg  transition duration-300"
                    >
                      Verifying
                    </button>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;
