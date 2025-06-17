import { envProvider } from "../constants.js";
import Mentor from "../models/mentor.model.js";
import User from "../models/user.model.js";
import nodemailer from 'nodemailer'
import APIError from "./APIError.js";
import { otpEmailTemplate } from "../helper/otpEmailTemplate.js";
import statusCodeUtility from "./statusCodeUtility.js";

class Otp {

    async Generateotp({ email, role }) {
        const otp = Math.floor(1000 + Math.random() * 9000);
        const expireTime = Date.now() + 10 * 60 * 1000; // 10 minutes from now

        // Use environment variables for security
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: envProvider.EMAIL, // Use env variables instead of hardcoding
                pass: envProvider.PASSWORD,
            },
        });

        const mailOptions = {
            from: "Maargdarshak <no-reply@maargdarshak.com>",
            to: email,
            subject: "OTP Verification for Maargdarshak",
            html: otpEmailTemplate(otp)
        };

        let userModel = role === "mentor" ? Mentor : User;

        let user = await userModel.findOneAndUpdate(
            { email },
            {
                $set: {
                    "otp.code": otp,
                    "otp.expire_at": expireTime,
                },
            },
            { new: true }
        );

        if (!user) {
            console.log("Error: User not found for email:", email);
            return "Error in generating OTP";
        }

        if (!user) {
            throw new APIError(statusCodeUtility.NotFound, "User not found");
        }

        else {
            let info = await transporter.sendMail(mailOptions);
            if (info.accepted.includes(email)) {
                console.log("OTP sent successfully to:", email);
                return "OTP sent successfully";
            } else {
                throw new APIError(statusCodeUtility.InternalServerError, "Failed to send OTP email");
            }
        }
    }


    async verifyOtp({ email, otp, role }) {
        const currentTime = Date.now();
        let userModel = role === "mentor" ? Mentor : User;

        const user = await userModel.findOne({
            email,
            "otp.code": otp,
            "otp.expire_at": { $gt: currentTime }
        });

        if (!user) {
            throw new APIError(statusCodeUtility.BadRequest, "Invalid OTP or OTP expired");
        }

        const updatedUser = await userModel.findOneAndUpdate(
            { email },
            { $set: { isverified: true } },
            { new: true }
        );
        if (!updatedUser) {
            throw new APIError(statusCodeUtility.BadRequest, "User not found or update failed");
        }

        if (!updatedUser.isverified) {
            throw new APIError(statusCodeUtility.BadRequest, "User is not verified");
        }

        return updatedUser.isverified;
    }
}

export default new Otp();