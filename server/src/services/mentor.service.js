import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import Mentor from '../models/mentor.model.js';
import nodemailer from 'nodemailer'
import APIError from '../utils/APIError.js';
import statusCodeUtility from '../utils/statusCodeUtility.js';

const salt = bcrypt.genSaltSync(10);

class Mentorservice {

    async registerMentor(data) {
        const { name, domains, experience, social, email, mobile, password, expertiese, profile } = data;
        const previous_mentor = await Mentor.findOne({ email });

        if (previous_mentor) {
            throw new APIError(statusCodeUtility.Conflict, "This account already register...")
        }

        const hashedPassword = bcrypt.hashSync(password, salt);
        const new_mentor = await Mentor.create({
            name,
            domains,
            experience,
            social,
            profile,
            email,
            mobile,
            password: hashedPassword,
            expertiese,
            status: "inactive",
            isverified: false
        });
        return new_mentor;
    }


    async loginMentor(email, password) {
        const mentor = await Mentor.findOne({ email });
        if (!mentor) {
            throw new APIError(statusCodeUtility.NotFound, "Mentor not found");
        }
        if (mentor.isverified != true) {
            return {
                UserNotVerified: true,
                data: {
                    email: mentor.email,
                    role: mentor.role
                }
            }
        }
        const isMatch = await bcrypt.compare(password, mentor.password);
        if (!isMatch) {
            throw new APIError(statusCodeUtility.BadRequest, "Invalid password");
        }
        return mentor;
    }



    async getMentors() {
        const mentors = await Mentor.find({ status: "active" });
        if (!mentors) {
            throw new APIError(statusCodeUtility.NotFound, "No mentors found");
        }
        return mentors;
    }

    async updateMentor(id, data) {
        const mentor = await Mentor.findByIdAndUpdate(id
            , data
            , { new: true });
        if (!mentor) {
            throw new APIError(statusCodeUtility.NotFound, "Mentor not found");
        }
        return mentor;
    }

    async getMentorById(id) {
        const mentor = await Mentor.findById(id);
        if (!mentor) {
            throw new APIError(statusCodeUtility.NotFound, "Mentor not found");
        }
        mentor.password = undefined; // Remove password from the response
        mentor.__v = undefined; // Remove version key from the response
        mentor.otp = undefined; // Remove OTP from the response
        return mentor;
    }

}

export default new Mentorservice();