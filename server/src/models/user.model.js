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
            default: ""
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
            type: String,
            default: ""
        },
        password: {
            type: String,
            default: null, // Required conditionally
        },
        clerkId: {
            type: String,
            unique: true,
        },
        isverified: {
            type: Boolean,
            default: false,
        },
        otp: {
            type: Object,
            default: {
                code: "",
                expire_at: null,
            },
        },
        role: {
            type: String,
            enum: ["user", "mentor", "admin"],
            default: "user",
        },
        authType: {
            type: String,
            enum: ["manual", "oauth"],
            default: "manual"
        },
        domains: {
            type: [String],
            default: [],
        },
        savedItems: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Resources",
            default: [],
        },
        courses: {
            type: [
                {
                    courseName: String,
                    description: String,
                    courseId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Resources",
                    },
                },
            ],
            default: [],
        },
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);
