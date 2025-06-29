// -------------------- PACKAGE IMPORT FILES -------------------- //
import jwt from 'jsonwebtoken'

// --------------- Importing Other Files --------------- //
import APIError from '../utils/APIError.js';
import ResponseHandler from '../utils/APIResponse.js';
import statusCodeUtility from '../utils/statusCodeUtility.js';
import { envProvider } from '../constants.js';


const moduleType = "Authentication Token";
const messages = {
    createdSuccess: `${moduleType} created Successfully `,
    notFound: `${moduleType} not Provided`,
    fetchMessages: [`${moduleType} fetched sucessfully`, `Something went wrong in  ${moduleType} verification`],
    alreadyExist: `${moduleType} already exist`,
    internalServerError: "Internal Server Error",
    deletionMessage: ["Account deleted Successfully", "Something went wrong in deletion"]
}

class UserToken {

    //-------------User token generation ---------//
    async generateToken(user) {
        const secret = envProvider.JWT_SECRET;
        if (!user || !user.id || !user.email || !user.name) {
            throw new APIError("Invalid user data for token generation");
        }
        const token = jwt.sign({
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
        }, secret);
        return token
    }

    //-------------User token verification ---------//
    async tokenverify(request, response, next) {
        let token = request.cookies.authToken;
        if (!token) {
            return ResponseHandler(
                statusCodeUtility.BadRequest,
                messages.notFound,
                null,
                response,
            );
        }

        try {
            const secret = envProvider.JWT_SECRET;
            let decoded = jwt.verify(token, secret);
            decoded = {
                id: decoded.id,
                email: decoded.email,
                name: decoded.name,
                role: decoded.role || "user",
            };
            request.decodedUser = decoded;
            next();
        } catch (error) {
            console.error("Token verification failed:", error);
            return ResponseHandler(
                statusCodeUtility.Unauthorized,
                messages.fetchMessages[1],
                null,
                response,
            );
        }
    }


    async UserTokenverify(request, response, next) {
        let token = request.cookies.userToken
        if (!token) {
            return ResponseHandler(
                statusCodeUtility.BadRequest,
                messages.notFound,
                null,
                response,
            );
        }

        try {
            const secret = envProvider.JWT_PRIVATE_KEY;
            let decoded = jwt.verify(token, secret);
            decoded = {
                id: decoded.id,
                email: decoded.email,
                name: decoded.name,
                role: decoded.role || "user",
            };
            request.decodedUser = decoded;
            next();
        } catch (error) {
            console.error("Token verification failed:", error);
            return ResponseHandler(
                statusCodeUtility.Unathorized,
                messages.fetchMessages[1],
                null,
                response,
            );
        }
    }


}

export default new UserToken();