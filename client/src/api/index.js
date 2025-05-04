import instance from "./axios";
import axios from "axios";

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

export const MentorChatList = async (data) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_CHAT_URL}/api/chat/chat-list/?userId=${data}`, {},
      {
        withCredentials: true,
      });
    return response;
  } catch (error) {
    return error.response.data;
  }
}

export const MentorChatHistory = async (data) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_CHAT_URL}/api/chat/history?userId1=${data.userId1}&userId2=${data.userId2}`, {},
      {
        withCredentials: true,
      });
    return response;
  } catch (error) {
    return error.response.data;
  }
}


export const chatDetails = async (data) => {
  try {
    const response = await instance.post(`/auth/chat-details`, {
      userIds: data,
    }, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    return error.response.data;
  }
}

export const LogOutFunc = async (data) => {
  const { role } = data;
  try {
    const response = await instance.post("/auth/logout", {
      role: role,
    }, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    return error.response.data;
  }
}