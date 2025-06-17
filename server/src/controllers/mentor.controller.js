//-------this is controller for mentors ----------//
import APIError from "../utils/APIError.js";
import FileRename from "../utils/filerename.js";
import ResponseHandler from "../utils/APIResponse.js";
import statusCodeUtility from "../utils/statusCodeUtility.js";
import Mentorservice from "../services/mentor.service.js";
import Otp from "../utils/generateotp.js";
import authService from "../services/auth.service.js";

class mentorController {

    //---------this is get-mentor controller function --------//
    async getMentors(request, response, next) {
        const mentors = await Mentorservice.getMentors();
        return ResponseHandler(
            statusCodeUtility.Success,
            "Mentors fetched successfully",
            mentors,
            response
        );
    }

    //-----------this add mentor to db in mentors collection -------//
    async addMentors(request, response, next) {

        if (!request.body) {
            return new APIError(statusCodeUtility.BadRequest, "NO data Provided");
        }
        const newPath = FileRename(request.file);
        const { name, domains, experience, social, email, mobile, password, expertiese } = request.body;
        const registerMentor = await Mentorservice.registerMentor(
            {
                name,
                domains,
                experience,
                social,
                email,
                mobile,
                password,
                expertiese,
                profile: newPath
            });

        const otpresponse = await Otp.Generateotp({
            email: registerMentor.email,
            role: registerMentor.role
        });

        if (otpresponse != null) {
            return ResponseHandler(
                statusCodeUtility.Success,
                "otp sent to your email",
                {
                    email: registerMentor.email,
                    role: registerMentor.role
                },
                response,
            );

        }
    }

    //-----------this is login mentor controller function --------//
    async loginMentor(request, response, next) {
        const { email, password } = request.body;
        if (!email || !password) {
            return next(new APIError(statusCodeUtility.BadRequest, "Email and password are required"));
        }

        const mentorData = await Mentorservice.loginMentor(email, password);

        if (mentorData.UserNotVerified) {
            return ResponseHandler(
                statusCodeUtility.Unathorized,
                "User not verified",
                userData,
                response
            );
        }

        if (!mentorData) {
            return next(new APIError(statusCodeUtility.NotFound, "Mentor not found"));
        }

        const token = await authService.userToken(mentorData);

        const mentorDatanew = {
            ...mentorData._doc,
            password: undefined,
            otp: undefined,
        }

        // Set token in HTTP-only cookie with 30-day expiration
        response.cookie("mentorToken", token, {
            httpOnly: true,   // Prevents client-side access
            secure: process.env.NODE_ENV === "production", // Secure only in production
            sameSite: "None", // Prevent CSRF attacks
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
        });

        return ResponseHandler(statusCodeUtility.Success, "Mentor logged in successfully", {
            token: "Token set in HTTP-only cookie",
            mentorData: { ...mentorDatanew }
        }, response);
    }

    //-----------this is update mentor controller function --------//
    async updateMentor(request, response, next) {
        const { id } = request.params;
        const updatedData = request.body;
        if (!id) {
            return next(new APIError(statusCodeUtility.BadRequest, "Mentor ID is required"));
        }

        if (!request.body) {
            return next(new APIError(statusCodeUtility.BadRequest, "No data provided"));
        }

        const newPath = request.file ? FileRename(request.file) : undefined;

        if (newPath) {
            updatedData.profile = newPath;
        }

        const updateMentor = await Mentorservice.updateMentor(id, updatedData);
        return ResponseHandler(statusCodeUtility.Success, "Mentor updated successfully", updateMentor, response);
    }

    async getMentorById(request, response, next) {
        const { id } = request.params;
        if (!id) {
            return next(new APIError(statusCodeUtility.BadRequest, "Mentor ID is required"));
        }

        const mentor = await Mentorservice.getMentorById(id);
        return ResponseHandler(statusCodeUtility.Success, "Mentor fetched successfully", mentor, response);
    }

}

export default new mentorController();