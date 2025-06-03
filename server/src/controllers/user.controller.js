import APIError from "../utils/APIError.js";
import userService from "../services/user.service.js";
import FileRename from "../utils/filerename.js";
import statusCodeUtility from "../utils/statusCodeUtility.js";
import ResponseHandler from "../utils/APIResponse.js";
import Otp from "../utils/generateotp.js";
import authService from "../services/auth.service.js";
import User from "../models/user.model.js";

class UserController {

    // ----------------- User Registration -----------------
    async createUser(request, response) {

        if (!request.body) {
            return new APIError(statusCodeUtility.BadRequest, "NO data Provided");
        }
        const { email, password, name } = request.body;
        const userData = await userService.createUser({ email, password, name });

        const otpresponse = await Otp.Generateotp({
            email: userData.email,
            role: userData.role
        });

        if (otpresponse != null) {
            return ResponseHandler(
                statusCodeUtility.Success,
                "otp sent to your email",
                {
                    email: userData.email,
                    role: userData.role
                },
                response,
            );
        }
        else {
            return ResponseHandler(
                statusCodeUtility.Success,
                "User created successfully",
                userData,
                response
            );
        }
    }

    // ----------------- User Login -----------------
    async loginUser(request, response) {
        if (!request.body) {
            return new APIError(statusCodeUtility.BadRequest, "No data Provided");
        }

        const { email, password } = request.body;
        const userData = await userService.loginUser({ email, password });

        if (userData.UserNotVerified) {
            return ResponseHandler(
                statusCodeUtility.Unathorized,
                "User not verified",
                userData,
                response
            );
        }

        const userDatanew = {
            ...userData._doc,
            password: undefined,
            otp: undefined
        };

        const token = await authService.userToken(userData);

        // Set token in HTTP-only cookie with 30-day expiration
        response.cookie("userToken", token, {
            httpOnly: true,   // Prevents client-side access
            secure: process.env.NODE_ENV === "production", // Secure only in production
            sameSite: "None", // Prevent CSRF attacks
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
        });

        return ResponseHandler(
            statusCodeUtility.Success,
            "User Login Successfully",
            {
                token: "Token set in HTTP-only cookie",
                userData: userDatanew
            },
            response
        );
    }

    // ----------------- Add Course -----------------

    async addCourse(request, response) {
        if (!request.body) {
            return new APIError(statusCodeUtility.BadRequest, "No data Provided");
        }

        const { courseName, description, courseId , userId} = request.body;
        const courseData = await userService.addCourse({ courseName, description, courseId, userId });

        return ResponseHandler(
            statusCodeUtility.Success,
            "Course added successfully",
            courseData,
            response
        );
    }

}

export default new UserController();