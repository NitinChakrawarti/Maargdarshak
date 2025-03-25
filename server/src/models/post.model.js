import mongoose, { Schema } from 'mongoose';

//------------post schema ---------------//

const post = new mongoose.Schema(
    {
        title: String,
        summary: String,
        content: String,
        cover: String,
        author: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
);

const postSchema = mongoose.model('Post', post);
export default postSchema;

