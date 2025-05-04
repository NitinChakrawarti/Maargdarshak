//-------this is controller for mentors ----------//
import APIError from "../utils/APIError.js";
import ResponseHandler from "../utils/APIResponse.js";
import statusCodeUtility from "../utils/statusCodeUtility.js";
import Otp from "../utils/generateotp.js";
import authService from "../services/auth.service.js";
import User from "../models/user.model.js";
import Mentor from "../models/mentor.model.js";
import chatdetails from "../utils/chatdetails.js";

class authController {

    async verifyOtp(request, response) {
        if (!request.body) {
            return new APIError(statusCodeUtility.BadRequest, "No data Provided");
        }
        const { email, otp, role } = request.body;
        const verifyotp = await Otp.verifyOtp({ email, otp, role });
        if (verifyotp === true) {
            return ResponseHandler(
                statusCodeUtility.Success,
                "Otp Verified",
                verifyotp,
                response,
            );
        } else {
            return ResponseHandler(
                statusCodeUtility.BadRequest,
                "Error in verifying otp",
                verifyotp,
                response,
            );
        }
    }

    async verifyToken(request, response) {
        const token = request.cookies.userToken || request.cookies.mentorToken;
        if (!token) {
            return ResponseHandler(
                statusCodeUtility.BadRequest,
                "No token provided",
                null,
                response,
            );
        }
        const verifyToken = await authService.tokenverify(token);
        const user = await User.findById(verifyToken.id) || await Mentor.findById(verifyToken.id);
        if (!user) {
            return ResponseHandler(
                statusCodeUtility.BadRequest,
                "User not found",
                null,
                response,
            );
        }
        const userData = {
            ...user._doc,
            password: undefined,
            otp: undefined,
        };
        return ResponseHandler(
            statusCodeUtility.Success,
            "Token verified",
            userData,
            response,
        );
    }

    async chatDetails(request, response) {
        if (!request.body) {
            return new APIError(statusCodeUtility.BadRequest, "No data Provided");
        }
        const { userIds } = request.body;
        const userslist = userIds.userslist;
        const userDetails = await chatdetails.chat(userslist);
        if (userDetails) {
            return ResponseHandler(
                statusCodeUtility.Success,
                "User Details",
                userDetails,
                response,
            );
        } else {
            return ResponseHandler(
                statusCodeUtility.BadRequest,
                "Error in fetching user details",
                userDetails,
                response,
            );
        }
    }

    async logout(request, response) {
        const token = request.cookies.userToken || request.cookies.mentorToken;
        const role = request.body.role;
        if (role) {
            if (role === "user") {
                response.cookie("userToken", "", {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "none",
                    maxAge: 0,
                    expires: new Date(0)
                });
            }

            if (role === "mentor") {
                response.cookie("mentorToken", "", {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "none",
                    maxAge: 0,
                    expires: new Date(0)
                });
            }

            return ResponseHandler(
                statusCodeUtility.Success,
                "Logout successful",
                null,
                response,
            );
        }
        return ResponseHandler(
            statusCodeUtility.BadRequest,
            "No role provided",
            null,
            response,
        );
    }
}
export default new authController();