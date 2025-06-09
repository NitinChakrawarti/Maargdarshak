import User from "../models/user.model.js";
import APIError from "../utils/APIError.js";
import bcrypt from 'bcryptjs';
import statusCodeUtility from "../utils/statusCodeUtility.js";
import Resource from "../models/resource.model.js";

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
                isverified: false,
                authType:"manual"
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

    
    // ----------------- 2.5. user login with third party ----------------- //
    async loginWithThirdParty(data) {
        const { clerkId,email, name, profile, role, isVerified ,authType} = data;
        const newUser = await User.create({
            clerkId,
            email,
            name,
            profile,
            role,
            isVerified,
            authType
        });
        if (!newUser) {
            throw new APIError(statusCodeUtility.InternalServerError, "Failed to create user with third party authentication");
        }
        return newUser;
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
            const response = await User.findByIdAndUpdate(
                userId,
                {
                    $pull: {
                        savedItems: courseId
                    }

                },
                { new: true }
            );
            return { removed: true, favorites: response.savedItems, message: "Course removed from favorites successfully" };
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
        return { added: true, favorites: response.savedItems, message: "Course added to favorites successfully" };
    }

    async fetchFavorites(data) {
        const { ids } = data;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            throw new APIError(statusCodeUtility.BadRequest, "No favorite IDs provided");
        }
        const response = await Resource.find({ _id: { $in: ids } },
            {
                _id: 1,
                title: 1,
                description: 1,
                domain: 1,
            }
        );
        return response;
    }
}

export default new UserService();