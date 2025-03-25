import bcryptjs from 'bcryptjs';
import User from "../models/user.model.js";
import jwt from 'jsonwebtoken'
const salt = bcryptjs.genSaltSync(10);

class authService {

    //-------------user token generation ---------//
    async userToken(user) {
        const secret = process.env.JWT_PRIVATE_KEY
        const token = jwt.sign({
            id:user._id,
            email: user.email,
            name: user.name
        }, secret);
        return token
    }

    //---------------user token verification--------//
    async tokenverify(token) {
        try {
            const secret = process.env.JWT_PRIVATE_KEY;
            const info = jwt.verify(token, secret); // Synchronous verification
            return info;
        } catch (err) {
            throw new Error("Token verification failed");
        }
    }
}

export default new authService();