//-------this is controller for mentors ----------//
import APIError from "../utils/APIError.js";
import ResponseHandler from "../utils/APIResponse.js";
import statusCodeUtility from "../utils/statusCodeUtility.js";
import Otp from "../utils/generateotp.js";

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

}
export default new authController();