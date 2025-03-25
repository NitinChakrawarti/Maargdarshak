import express from 'express';
import postController from '../../controllers/post.controller.js';
import upload from '../../../storage/storage.js';
// import { Tokenverify } from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/create-post', [upload.single('image')], postController.createpost);
router.get('/get-all-post', postController.getallpost);
router.get('/:id', postController.postById);
router.put('/edit-post/:id', upload.single('image'), postController.editPost);

export default router;