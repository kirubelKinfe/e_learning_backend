import { VoteInterface } from "../interfaces";
import mongoose from "mongoose";

const VoteSchema = new mongoose.Schema<VoteInterface>({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'User', 
        required: [true, "Please provide userId"]
    },
    discussionId: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'Discussion', 
        required: [true, "Please provide discussionId"]
    },
    courseId: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'Course', 
        required: [true, "Please provide courseId"] 
    },
    replyId: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'Reply', 
        required: [true, "Please provide replyId"]
    },
    vote: { 
        type: Boolean, 
        required: [true, "Please provide voteType"]
    }
}, { timestamps: true });
 
const Vote = mongoose.model<VoteInterface>('Vote', VoteSchema);
export default Vote