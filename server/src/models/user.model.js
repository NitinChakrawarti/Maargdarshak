import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            minlength: [4, "Name must be at least 4 characters long"],
            maxlength: [25, "Name must be less than 25 characters"],
            trim: true,
        },
        profile: {
            type: String,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/\S+@\S+\.\S+/, "Please provide a valid email address"],
        },
        mobile: {
            type: Number,
            default: ""
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Password must be at least 8 characters long"],
        },
        isverified: {
            type: Boolean,
            default: false,
        },
        otp: {
            type: Object,
            default: {
                code: "",
                expire_at: Date
            }
        },
        role: {
            type: String,
            enum: ["user", "mentor", "admin"],
            default: "user",
        },
        domains: {
            type: Array,
            default: [],
        },
        savedItems: {
            type: Array,
            default: []
        },
        courses: {
            type: Array,
            default: [
                {
                    courseName: "",
                    description: "",
                    courseId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'Courses',
                        unique: true
                    }
                }
            ]
        },
    },
    { timestamps: true }
)

const User = mongoose.model('User', userSchema);

export default User;