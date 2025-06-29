import mongoose from 'mongoose';


const progressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    progress: {
        type: Map,
    }
});

const Progress = mongoose.model('Progress', progressSchema);

export default Progress;