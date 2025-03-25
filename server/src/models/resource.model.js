import mongoose from 'mongoose'

const resourceSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: [true, "Title is required"],
            minlength: [4, "Title must be at least 4 characters long"],
            maxlength: [50, "Title must be less than 25 characters"],
            trim: true,
        },
        description:{
            type: String,
            required: [true, "Description is required"],
            minlength: [4, "Description must be at least 4 characters long"],
            maxlength: [100, "Description must be less than 100 characters"],
            trim: true,
        },
        domain:{
            type:Array,
            default:[],
        },
        rating:{
            type:Number,
            default:5,
        },
        reviews:{
            type:Array,
            default:[],
        },
        banner:{
            type:String,
            default:""
        },
        resource : {
            type : Array,
            default: []
        },
        mentorId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Mentors'
        }
    }
);
const Resource = mongoose.model('Resource', resourceSchema);

export default Resource;