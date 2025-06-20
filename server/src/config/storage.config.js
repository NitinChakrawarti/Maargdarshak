import { v2 as Cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import dotenv from 'dotenv'
import multer from 'multer';
import { envProvider } from '../constants.js';

dotenv.config();
Cloudinary.config({
    cloud_name: envProvider.CLOUD_NAME,
    api_key: envProvider.CLOUDINARY_KEY,
    api_secret: envProvider.CLOUDINARY_SECRET
})
const storage = new CloudinaryStorage({
    cloudinary: Cloudinary,
    params: async (req, file) => {
        let format;
        if (file.mimetype === 'image/jpeg') {
            format = 'jpeg';
        } else if (file.mimetype === 'image/png') {
            format = 'png';
        } else if (file.mimetype === 'image/gif') {
            format = 'gif';
        } else {
            format = 'jpg';
        }
        return {
            folder: 'Maargdarshak-blog',
            public_id: `${Date.now()}-${file.originalname.split('.')[0]}`,
            format: format,
        };
    },
});
const upload = multer({ storage });
export default upload;