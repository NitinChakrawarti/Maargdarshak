import instance from "./axios";

// ------------------------------- Auth ------------------------------- //
export const VerifyOtp = async (data) => {
  try {
    const response = await instance.post("/auth/verify-otp", data);
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const VerifyToken = async () => {
  try {
    const response = await instance.post("/auth/verify-token", {}, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    return error.response.data;
  }
};


// ------------------------------- User ------------------------------- //
export const Signup = async (data) => {
  try {
    const response = await instance.post("/user/register-user", data);
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const Login = async (data) => {
  try {
    const response = await instance.post("/user/login-user", data, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    return error.response.data;
  }
};


// ------------------------------- Mentor ------------------------------- //
export const MentorSignup = async (data) => {
  try {
    const response = await instance.post("/mentor/register-mentor", data);
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const MentorLogin = async (data) => {
  try {
    const response = await instance.post("/mentor/login-mentor", data, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    return error.response.data;
  }
};
