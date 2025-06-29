import APIError from "../utils/APIError.js";
import userService from "../services/user.service.js";
import FileRename from "../utils/filerename.js";
import statusCodeUtility from "../utils/statusCodeUtility.js";
import ResponseHandler from "../utils/APIResponse.js";
import Otp from "../utils/generateotp.js";
import authService from "../services/auth.service.js";
import User from "../models/user.model.js";
import { paginate } from "../utils/pagination.js";
import progressService from "../services/progress.service.js";
import certificateService from "../services/certificate.service.js";
import userModel from "../models/user.model.js";

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

        const { courseName, description, courseId, userId } = request.body;
        const courseDataresponse = await userService.addCourse({ courseName, description, courseId, userId });
        const courseData = {
            courseId: courseDataresponse.courseId,
            courseName: courseDataresponse.courseName,
            description: courseDataresponse.description
        };


        return ResponseHandler(
            statusCodeUtility.Success,
            "Course added successfully",
            courseData,
            response
        );
    }

    async addFavorite(request, response) {
        if (!request.body) {
            return new APIError(statusCodeUtility.BadRequest, "No data Provided");
        }
        const { courseId, userId } = request.body;
        const favoriteData = await userService.addfavorite({ courseId, userId });

        return ResponseHandler(
            statusCodeUtility.Success,
            favoriteData.removed ? "Favorite removed successfully" : "Favorite added successfully",
            favoriteData,
            response
        );
    }

    async fetchFavorites(request, response) {
        if (!request.body.ids) {
            return new APIError(statusCodeUtility.BadRequest, "No saved items provided");
        }
        const { ids } = request.body;
        const { page = 1, limit = 9 } = request.query;
        const { skip, totalPages, totalItems, currentPage } = paginate(ids.length, page, limit);

        const favoritesData = await userService.fetchFavorites({ ids, skip, limit });
        return ResponseHandler(
            statusCodeUtility.Success,
            "Fetched Bookmarks Successfully",
            {
                favorites: favoritesData,
                pagination: {
                    totalItems,
                    totalPages,
                    currentPage
                }
            },
            response
        );

    }

    async getCourseProgress(request, response) {
        const { resourceId, userId } = request.query;
        if (!resourceId || !userId) {
            return new APIError(statusCodeUtility.BadRequest, "No resource ID or user ID provided");
        }

        const progressData = await userService.getCourseProgress(resourceId, userId);

        return ResponseHandler(
            statusCodeUtility.Success,
            "Fetched Course Progress Successfully",
            progressData,
            response
        );
    }

    async updateCourseProgress(request, response) {
        if (!request.body) {
            return new APIError(statusCodeUtility.BadRequest, "No data Provided");
        }

        const { userId, courseId, progress } = request.body;
        if (!userId || !courseId || !progress) {
            return new APIError(statusCodeUtility.BadRequest, "Missing required fields");
        }

        const progressData = await userService.updateCourseProgress({ userId, courseId, Progressdata: progress });

        return ResponseHandler(
            statusCodeUtility.Success,
            "Course progress updated successfully",
            progressData,
            response
        );
    }


    async checkEligibilityForCertificate(request, response) {
        const { userId, courseId } = request.query;
        if (!userId || !courseId) {
            return new APIError(statusCodeUtility.BadRequest, "Missing required fields");
        }
        const isEligible = await userService.checkEligibilityForCertificate({ userId, courseId });

        return ResponseHandler(
            statusCodeUtility.Success,
            "User is eligible for a certificate",
            { eligible: isEligible.eligible },
            response
        );
    }
    async generateCertificate(request, response, next) {
        try {
            const { userId, courseId } = request.body;
            if (!userId || !courseId) {
                throw new APIError(statusCodeUtility.BadRequest, "Missing required fields");
            }

            const isEligible = await userService.checkEligibilityForCertificate({ userId, courseId });
            if (!isEligible.eligible) {
                throw new APIError(statusCodeUtility.BadRequest, "User is not eligible for a certificate");
            }

            const pdfBuffer = await userService.generateCertificate({ userId, courseId });

            response.set({
                "Content-Type": "application/pdf",
                "Content-Disposition": `inline; filename="certificate.pdf"`, // ⬅ change "attachment" to "inline"
            });
            return response.send(pdfBuffer);
        } catch (err) {
            next(err); // assuming you're using centralized error handling
        }
    }

    async verifyCertificate(request, response) {
        const { certificateId } = request.query;

        if (!certificateId) {
            return new APIError(statusCodeUtility.BadRequest, "No certificate ID provided");
        }

        const isValid = await certificateService.verifyCertificate(certificateId);

        if (!isValid) {
            return new APIError(statusCodeUtility.NotFound, "Certificate not found or invalid");
        }

        return ResponseHandler(
            statusCodeUtility.Success,
            "Certificate is valid",
            isValid,
            response
        );
    }

    async getUserDetails(request, response) {
        
        const { userId } = request.query;
        console.log("Fetching user details for userId:", userId);
        
        if (!userId) {
            return new APIError(statusCodeUtility.BadRequest, "No user ID provided");
        }

        const progressSummary = await Promise.all([
            progressService.getProgressSummary(userId),
            progressService.recentLearnings(userId),
            certificateService.getUserCertificates(userId)
        ]);


        if (!progressSummary) {
            return new APIError(statusCodeUtility.NotFound, "User not found");
        }

        return ResponseHandler(
            statusCodeUtility.Success,
            "Fetched User Details Successfully",
            {
                user: await userModel.findById(userId).select("name email role"),
                progressSummary: progressSummary[0],
                recentLearnings: progressSummary[1],
                certificates: progressSummary[2]
            },
            response
        );
    }

}

export default new UserController();