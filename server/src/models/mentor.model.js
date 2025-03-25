import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [4, "Name must be at least 4 characters long"],
        maxlength: [25, "Name must be less than 25 characters"],
        trim: true,
    },

    profile: {
        type: String,
        default: "",
    },

    role:{
        type: String,
        default: "mentor",
    },

    social: {
        type: Array,
        default: [],
        required: [true, "Social links required"],
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
    },
    otp: {
        type: Object,
        default: {
            code: "",
            expire_at: Date
        }
    },
    domains: {
        type: Array,
        default: [],
    },

    expertiese: {
        type: String,
    },
    experience:{
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        default: "inactive",
        enum: ["active", "inactive"]
    },

},
    {
        timestamps: true
    }
);

const Mentor = mongoose.model('Mentor', mentorSchema);

export default Mentor;