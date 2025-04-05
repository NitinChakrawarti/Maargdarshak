import express from 'express';
import asyncHandler from '../../utils/asyncHandler.js';
import userController from '../../controllers/user.controller.js';
import upload from '../../../storage/storage.js';

const router = express.Router();


router.route('/register-user').post(asyncHandler(userController.createUser));
router.route('/login-user').post(asyncHandler(userController.loginUser));    

export default router;