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

export const VerifyToken = async ({ token }) => {
  try {
    const response = await instance.post("/auth/verify-token", {}, {
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
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

export const IntializeChat = async (data) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_CHAT_URL}/api/chat/create`, data, {
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


export const GetMentorDetails = async () => {
  try {
    const response = await instance.get(`/mentor/get-mentor`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    return error.response.data;
  }
}

export const GetMentorById = async (mentorId) => {
  try {
    const response = await instance.get(`/mentor/get-mentor/${mentorId}`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    return error.response.data;
  }
}


export const AddResource = async (data) => {
  try {
    const response = await instance.post(`/resource/add-resource`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });

    return response;
  } catch (error) {
    return error.response?.data || { error: "Unknown error" };
  }
};



export const GetResources = async () => {
  try {
    const response = await instance.get(`/resource/get-resources`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    return error.response.data;
  }
}

export const GetResourceById = async (resourceId) => {
  try {
    const response = await instance.get(`/resource/get-resource/${resourceId}`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    return error.response.data;
  }
}


export const EnrollInCourse = async (data) => {
  try {
    const response = await instance.post(`/user/add-course`, { ...data }, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    return error.response.data;
  }
}

export const AddToFavorites = async (data) => {
  try {
    const response = await instance.post(`/user/add-favorite`, { ...data }, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    return error.response.data;
  }
}

export const FetchFavorites = async (data) => {

  try {
    const response = await instance.post(`/user/fetch-favorites`, { ids: data }, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    return error.response.data;
  }
}


export const verifyClerkToken = async (token) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_CLERK_URL}`, { token }, {
      headers: {
        'Authorization': `Bearer ${process.env.CLERK_PUBLISHABLE_KEY}`,
      },
      withCredentials: true,
    });
    return response;
  } catch (error) {
    return error.response.data;
  }
}