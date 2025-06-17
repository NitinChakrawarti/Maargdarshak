import express from 'express';
import asyncHandler from '../../utils/asyncHandler.js';
import upload from '../../config/storage.config.js'
import resourceController from '../../controllers/resource.controller.js';


const router = express.Router();

router.post('/add-resource', upload.single('banner') ,asyncHandler(resourceController.addResource));
router.route('/get-resources').get(asyncHandler(resourceController.getResources));
router.route('/get-resource/:id').get(asyncHandler(resourceController.getResource));


export default router;