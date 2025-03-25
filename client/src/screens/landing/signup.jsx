import Layoutcomponent from '../../layout/landing/layoutcomponent';
import { useState } from 'react';

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

    //---------------otp  handle ---------------//
    const setUserOtp = (otp) => {
        setotpverification({
            otp: otp.userOTP
        })
    }

    return (
        <Layoutcomponent >

        </Layoutcomponent >
    )
}

export default SignUp;