import { LectureInterface } from '../interfaces';
import mongoose from 'mongoose';

const LectureSchema = new mongoose.Schema<LectureInterface>({
    title: {
        type: String,
        required: [true, "Please provide a title"]
    },
    description: {
        type: String,
        default: ""
    },
    article: {
        type: String,
        default: ""
    },
    videoUrl: {
        type: String,
        default: ""
    },
    public_id: { 
        type: String,
        default: ""
    },
    duration: {
        type: Number,
        default: 0
    },
    moduleId: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'Module',
        required: [true, "Please provide a moduleId"]
    },
    courseId: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'Course',
        required: [true, "Please provide a courseId"]
    },
    resources: [{ 
        type: mongoose.Schema.Types.ObjectId, ref: 'Resource'
    }]

}, { timestamps: true })

const Lecture = mongoose.model<LectureInterface>("Lecture", LectureSchema)
export default Lecture