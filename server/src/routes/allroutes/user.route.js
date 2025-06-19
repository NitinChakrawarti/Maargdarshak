import express from 'express';
import UserToken from '../../middlewares/auth.middleware.js';
import asyncHandler from '../../utils/asyncHandler.js';
import userController from '../../controllers/user.controller.js';

const router = express.Router();


router.route('/register-user').post(asyncHandler(userController.createUser));
router.route('/login-user').post(asyncHandler(userController.loginUser));
router.route('/add-course').post(asyncHandler(userController.addCourse));
router.route('/add-favorite').post(asyncHandler(userController.addFavorite));
router.route('/fetch-favorites').post(asyncHandler(userController.fetchFavorites));
router.route('/get-progress').get( asyncHandler(userController.getCourseProgress));
router.route('/update-progress').post(asyncHandler(userController.updateCourseProgress));
router.route('/eligible-for-certificate').get(asyncHandler(userController.checkEligibilityForCertificate));
router.route('/generate-certificate').post(asyncHandler(userController.generateCertificate));
router.route('/verify-certificate').get(asyncHandler(userController.verifyCertificate));
router.route('/get-user-details').get(asyncHandler(userController.getUserDetails));


export default router;