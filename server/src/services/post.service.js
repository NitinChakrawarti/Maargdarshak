import fs from 'fs';
import postSchema from '../models/post.model.js'
import { log } from 'console';


class postService {


       //-----------get post by its id ------------//
       async getpostById(_id) {
              const result = await postSchema.findById(_id).populate('author');
              return result;
       }
}

export default new postService();