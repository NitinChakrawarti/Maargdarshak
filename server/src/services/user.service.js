import User from "../models/user.model.js";
import APIError from "../utils/APIError.js";
import bcrypt from 'bcryptjs';
import statusCodeUtility from "../utils/statusCodeUtility.js";

const salt = bcrypt.genSaltSync(10);

class UserService {

    // ----------------- 1. user registration ----------------- //
    async createUser(data) {
        const { email, password, name } = data;
        const previous_user = await User.findOne({
            email
        });
        const hashedPassword = bcrypt.hashSync(password, salt);
        if (previous_user) {
            throw new APIError(statusCodeUtility.Conflict, "This account already register...");
        }

        else {
            const new_user = await User.create({
                email,
                password: hashedPassword,
                name,
                isverified: false
            });
            return new_user;
        }

    }

    // ----------------- 2. user login ----------------- //
    async loginUser(data) {
        const { email, password } = data;
        const user = await User.findOne({
            email
        });
        if (!user) {
            throw new APIError(statusCodeUtility.NotFound, "User not found");
        }
        if (user.isverified != true) {
            return {
                UserNotVerified: true,
                data: {
                    email: user.email,
                    role: user.role
                }
            }
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new APIError(statusCodeUtility.BadRequest, "Invalid password");
        }
        return user;
    }

    // ----------------- 3. add course ----------------- //
    async addCourse(data) {
        const { courseName, description, courseId, userId } = data;
        const response = await User.findByIdAndUpdate(
            userId,
            {
                $push: {
                    courses: {
                        courseName,
                        description,
                        courseId
                    }
                }
            },
            { new: true }
        );
        return response;
    }

    async addfavorite(data) {
        const { courseId, userId } = data;
        const existingFavorite = await User.findOne({ _id: userId, savedItems: courseId });
        if (existingFavorite) {
            throw new APIError(statusCodeUtility.Conflict, "Course already exists in favorites");
        }
        const response = await User.findByIdAndUpdate(
            userId,
            {
                $push: {
                    savedItems: courseId
                }
            },
            { new: true }
        );
        return response;
    }
}

export default new UserService();