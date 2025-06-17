import express from 'express'
import asyncHandler from '../../utils/asyncHandler.js';
import authController from '../../controllers/auth.controller.js'
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';

const router = express.Router();

router.route('/verify-otp').post(asyncHandler(authController.verifyOtp));
router.route('/verify-token').post(ClerkExpressWithAuth(), asyncHandler(authController.verifyToken));
router.route('/chat-details').post(asyncHandler(authController.chatDetails));
router.route('/logout').post(asyncHandler(authController.logout));

export default router;