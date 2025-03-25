import User from "../models/user.model.js";
import APIError from "../utils/APIError.js";
import statusCodeUtility from "../utils/statusCodeUtility.js";

class UserService {

    // ----------------- 1. user registration ----------------- //
    async createUser(data) {
        const { email, password, name, phone, profile } = data;
        const previous_user = await User.findOne({
            email
        });
        if (previous_user) {
            throw new APIError(statusCodeUtility.Conflict, "This account already register...");
        }
        else {
            const new_user = await User.create({
                email,
                password,
                name,
                phone,
                profile,
                isverified: false
            });
            return new_user;
        }
    }
}

export default new UserService();