import APIError from "../utils/APIError.js";
import userService from "../services/user.service.js";
import FileRename from "../utils/filerename.js";
import statusCodeUtility from "../utils/statusCodeUtility.js";
import ResponseHandler from "../utils/APIResponse.js";
import Otp from "../utils/generateotp.js";

class UserController {

    // ----------------- User Registration -----------------
    async createUser(request, response) {

        if (!request.body) {
            return new APIError(statusCodeUtility.BadRequest, "NO data Provided");
        }
        const newPath = FileRename(request.file);
        const { email, password, name, phone } = request.body;
        const userData = await userService.createUser({ email, password, name, phone, profile: newPath });

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
    
}

export default new UserController();