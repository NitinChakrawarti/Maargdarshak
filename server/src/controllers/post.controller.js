import fs from 'fs';
import postSchema from '../models/post.model.js'
import authService from '../services/auth.service.js'
import postService from '../services/post.service.js';
import { log } from 'console';

class postController {

    async createpost(request, response) {
        try {
            const { originalname, filename } = request.file;
            const parts = originalname.split('.');
            const ext = parts[parts.length - 1];
            const newPath = filename + '.' + ext
            const { title, summary, content, userId } = request.body;
            const postItem = await postSchema.create(
                {
                    title,
                    summary,
                    content,
                    cover: newPath,
                    author: userId
                })

            response.status(200).json(postItem)
        }
        catch (err) {
            console.log(err);
            response.status(400).json({
                message: "Error in creating new Vlog",
                err,
                success: false
            })
        }
    }

    //------------------get all post ---------------------------//
    async getallpost(request, response, next) {
        try {
            const allPost = await postSchema.find({}).populate('author').sort({ createdAt: -1 }).limit(20);
            return response.status(200).json({ message: "data fetched", data: allPost })
        }
        catch (error) {
            next(error);
        }
    }

    //---------------------post by id fetch ------------------//
    async postById(request, response, next) {
        const { id } = request.params
        try {
            const postdoc = await postService.getpostById(id);
            if (postdoc != null) {
                return response.status(200).json({ postdoc });
            }
            else {
                return response.status(404).json({ message: "invalid post id" })
            }

        } catch (error) {
            next(error)
        }
    }

    //-----------------------edit post --------------------//
    async editPost(request, response, next) {
        let newPath;
        if (request.file) {
            const { originalname, path } = request.file;
            const parts = originalname.split('.');
            const ext = parts[parts.length - 1];
            newPath = filename + '.' + ext
        }

        // const { logintoken } = request.cookies;
        const { _id, title, summary, content } = request.body
        // const info = await authService.tokenverify(logintoken);
        // const postdoc = await postSchema.findById(_id);

        if (JSON.stringify(postdoc.author) === JSON.stringify(info.id)) {
            const post = await postSchema.updateOne({
                title,
                summary,
                content,
                cover: newPath ? newPath : postdoc.cover
            })
            return response.status(200).json(post);
        }
        else {
            return response.status(400).json("you are not the autor of this post");
        }
    }
}

export default new postController;

