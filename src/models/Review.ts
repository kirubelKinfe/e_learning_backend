import { ReviewInterface } from '../interfaces';
import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema<ReviewInterface>({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        unique: false,
        required: [true, "Please provide userId"]  
    },
    courseId: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'Course',
        required: [true, "Please provide courseId"] 
    },
    rating: { 
        type: Number, 
        required: [true, "Please provide rating"] 
    },
    comment: { type: String }
}, { timestamps: true });

const Review = mongoose.model<ReviewInterface>('Review', ReviewSchema);
export default Review
