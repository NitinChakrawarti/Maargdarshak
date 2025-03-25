import express from 'express'
import authController from '../../controllers/auth.controller.js'

const router = express.Router();

router.route('/verify-otp').post(authController.verifyOtp);

export default router;