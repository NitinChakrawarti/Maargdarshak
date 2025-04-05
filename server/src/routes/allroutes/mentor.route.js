import express from "express"
import mentorController from '../../controllers/mentor.controller.js'
import upload from '../../../storage/storage.js';
import asyncHandler from "../../utils/asyncHandler.js"

const router = express.Router();

router.get('/get-mentor', mentorController.getMentors);
router.post('/register-mentor', upload.single('profile'), asyncHandler(mentorController.addMentors));
router.post('/login-mentor', asyncHandler(mentorController.loginMentor));
router.put('/update-mentor/:id', upload.single('profile'), asyncHandler(mentorController.updateMentor));

export default router;