import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    courseName: {
        type: String,
        required: true,
        trim: true,
    },
    learnerName: {
        type: String,
        required: true,
        trim: true,
    },
    instructorName: {
        type: String,
        required: true,
        trim: true,
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    }
}, {
    timestamps: true,
});

const Certificate = mongoose.model("Certificate", certificateSchema);
export default Certificate;
