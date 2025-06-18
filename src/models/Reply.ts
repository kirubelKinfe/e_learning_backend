import { ReplyInterface } from "../interfaces";
import mongoose from "mongoose";


const ReplySchema = new mongoose.Schema<ReplyInterface>({
    author: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'User', 
        required: [true, "Please provide author"]
    },
    discussionId: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'Discussion', 
        required: [true, "Please provide discussionId"]
    },
    courseId: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'Course', 
        required: [true, "Please provide courseId"] 
    },
    textBody: { 
        type: String, 
        required: [true, "Please provide body"] 
    },
    votes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vote' }]
}, { timestamps: true });
 
const Reply = mongoose.model<ReplyInterface>('Reply', ReplySchema);
export default Reply