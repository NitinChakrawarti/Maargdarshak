import { useEffect, useState } from "react";

function Enterotp({ setUserOtp }) {
  const [userOTP, setUserOTP] = useState(""); // Stores the OTP
  const [errorMessage, setErrorMessage] = useState(""); // Error message state

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (value.match(/[^0-9]/)) return; // Allow only digits

    // Update the OTP state with the new value
    const otpArray = userOTP.split("");
    otpArray[index] = value;
    setUserOTP(otpArray.join(""));
    setErrorMessage(""); // Reset error message
    if (value && index < 4) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  useEffect(() => {
    setUserOtp({ userOTP });
  }, [userOTP]);

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const otpArray = userOTP.split("");
      // If the current input is not empty, clear it
      if (otpArray[index]) {
        otpArray[index] = "";
        setUserOTP(otpArray.join(""));
      } else if (index > 0) {
        // If empty, move to the previous input
        document.getElementById(`otp-input-${index - 1}`).focus();
      }
    }
  };

  return (
    <div className="flex justify-center space-x-2 my-5">
      {Array.from({ length: 4 }).map((_, index) => (
        <input
          key={index}
          id={`otp-input-${index}`}
          value={userOTP[index] || ""}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          type="text"
          maxLength="1"
          className="w-12 h-12 text-center text-xl border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="—"
        />
      ))}
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </div>
  );
}

export default Enterotp;
