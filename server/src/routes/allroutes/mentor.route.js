import express from "express"
import mentorController from '../../controllers/mentor.controller.js'
import asyncHandler from "../../utils/asyncHandler.js"
import upload from '../../config/storage.config.js'

const router = express.Router();

router.get('/get-mentor', asyncHandler(mentorController.getMentors));
router.post('/register-mentor', upload.single('profile'), asyncHandler(mentorController.addMentors));
router.post('/login-mentor', asyncHandler(mentorController.loginMentor));
router.put('/update-mentor/:id', upload.single('profile'), asyncHandler(mentorController.updateMentor));
router.get('/get-mentor/:id', asyncHandler(mentorController.getMentorById));

export default router;