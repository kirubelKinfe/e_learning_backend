import { CourseProgressInterface } from '../interfaces';
import mongoose from 'mongoose';

const courseProgressSchema = new mongoose.Schema<CourseProgressInterface>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, "Please provide userId"]
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: [true, "Please provide courseId"]
  },
  lectureProgress: [{
    lectureId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lecture',
      required: [true, "Please provide lectureId"]
    },
    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
  }],
  progress: {
    type: Number,
    default: 0
  },
  certificateUrl: {
    type: String,
    default: ''
  },
}, { timestamps: true });

const CourseProgress = mongoose.model<CourseProgressInterface>('CourseProgress', courseProgressSchema);
export default CourseProgress