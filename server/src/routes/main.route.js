import express from 'express';
import mentorRoute from './allroutes/mentor.route.js'
import authRoute from './allroutes/auth.route.js'
import postRoute from './allroutes/post.route.js'
import resources from './allroutes/resource.route.js'
// import userRoute from './allroutes/user2.route.js'
import userRoute from './allroutes/user.route.js'

//--------------router from express js ----------//
const router = express.Router();

router.use('/mentor', mentorRoute);
router.use('/auth', authRoute);
router.use('/post', postRoute)
router.use('/user', userRoute)
router.use('/resource', resources )

export default router;