import express from 'express'
import authController from '../../controllers/auth.controller.js'

const router = express.Router();

router.route('/verify-otp').post(authController.verifyOtp);
router.route('/verify-token').post(authController.verifyToken);
router.route('/chat-details').post(authController.chatDetails);
router.route('/logout').post(authController.logout);

export default router;