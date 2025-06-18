import { DiscussionInterface } from '../interfaces';
import mongoose from 'mongoose';

const DiscussionSchema = new mongoose.Schema<DiscussionInterface>({
    author: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'User', 
        required: [true, "Please provide author"]
    },
    courseId: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'Course', 
        required: [true, "Please provide courseId"] 
    },
    title: { 
        type: String, 
        required: [true, "Please provide title"] 
    },
    textBody: { 
        type: String, 
        required: [true, "Please provide body"] 
    },
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reply' }]
}, { timestamps: true });


const Discussion = mongoose.model<DiscussionInterface>('Discussion', DiscussionSchema);
export default Discussion