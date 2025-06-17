import express from 'express';
import asyncHandler from '../../utils/asyncHandler.js';
import userController from '../../controllers/user.controller.js';
import upload from '../../../storage/storage.js';

const router = express.Router();


router.route('/register-user').post(asyncHandler(userController.createUser));
router.route('/login-user').post(asyncHandler(userController.loginUser));
router.route('/add-course').post(asyncHandler(userController.addCourse));
router.route('/add-favorite').post(asyncHandler(userController.addFavorite));
router.route('/fetch-favorites').post(asyncHandler(userController.fetchFavorites));
router.route('/get-progress/:resourceId').get(asyncHandler(userController.getCourseProgress));
router.route('/update-progress').post(asyncHandler(userController.updateCourseProgress));
router.route('/eligible-for-certificate').get(asyncHandler(userController.checkEligibilityForCertificate));
router.route('/generate-certificate').post(asyncHandler(userController.generateCertificate));

export default router;