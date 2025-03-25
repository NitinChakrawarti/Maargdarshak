import Mentor from "../models/mentor.model.js";
import User from "../models/user.model.js";
import nodemailer from 'nodemailer'

class Otp {

    async Generateotp({ email, role }) {
        const otp = Math.floor(1000 + Math.random() * 9000);
        const expireTime = Date.now() + 10 * 60 * 1000; // 10 minutes from now

        // Use environment variables for security
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL, // Use env variables instead of hardcoding
                pass: process.env.PASSWORD,
            },
        });

        const mailOptions = {
            from: "Maargdarshak <no-reply@maargdarshak.com>",
            to: email,
            subject: "OTP Verification for Maargdarshak",
            html: `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f9f9f9;
                    margin: 0;
                    padding: 0;
                }
                .email-container {
                    max-width: 400px;
                    margin: 20px auto;
                    background-color: #ffffff;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    text-align: center;
                }
                .header {
                    background-color: #4caf50;
                    color: #ffffff;
                    padding: 10px 0;
                    border-radius: 8px 8px 0 0;
                }
                .header h1 {
                    margin: 0;
                    font-size: 18px;
                }
                .content {
                    margin: 20px 0;
                    color: #333333;
                    font-size: 16px;
                }
                .otp {
                    font-size: 24px;
                    font-weight: bold;
                    color: #4caf50;
                    margin: 10px 0;
                }
                .footer {
                    margin-top: 20px;
                    font-size: 12px;
                    color: #777777;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="header">
                    <h1>Maargdarshak OTP Verification</h1>
                </div>
                <div class="content">
                    <p>Your One-Time Password (OTP) is:</p>
                    <div class="otp"> ${otp} </div>
                    <p>Please use this code to complete your verification. This code is valid for 10 minutes.</p>
                </div>
                <div class="footer">
                    <p>If you did not request this, please ignore this email.</p>
                    <p>&copy; ${new Date().getFullYear()} Maargdarshak</p>
                </div>
            </div>
        </body>
        </html>`,
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

        try {
            let info = await transporter.sendMail(mailOptions);
            if (info.accepted.includes(email)) {
                console.log("OTP sent successfully to:", email);
                return "OTP sent successfully";
            } else {
                console.log("Mail not accepted:", info);
                return "Mail sending failed";
            }
        } catch (error) {
            console.error("Error in sending mail:", error);
            return "Error in sending mail";
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
            return "Invalid Credentials. Try again";
        }

        try {
            const updatedUser = await userModel.findOneAndUpdate(
                { email },
                { $set: { isverified: true } },
                { new: true }
            );
            if (!updatedUser) {
                throw new Error("User not found or update failed");
            }
            return updatedUser.isverified;
        } catch (error) {
            console.error("Error updating user:", error);
            return false;
        }
    }

}

export default new Otp();