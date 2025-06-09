import express from 'express'
import authController from '../../controllers/auth.controller.js'
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';

const router = express.Router();

router.route('/verify-otp').post(authController.verifyOtp);
router.route('/verify-token').post(ClerkExpressWithAuth(),authController.verifyToken);
router.route('/chat-details').post(authController.chatDetails);
router.route('/logout').post(authController.logout);

export default router;