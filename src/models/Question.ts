import { QuestionInterface } from "../interfaces";
import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema<QuestionInterface>({
    courseId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Course', 
        required: [true, "Please provide courseId"]
    },
    moduleId: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'Module', 
        required: [true, "Please provide moduleId"]  
    },
    quizId: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', 
        required: [true, "Please provide quizId"] 
    },
    title: { 
        type: String, 
        required: [true, "Plese provide title"] 
    },
    answer: { 
        type: String, 
        required: [true, "Please provide answer"] 
    },
    choices: [{ 
        type: { 
            choice: { type: String }
        } 
    }]

}, { timestamps: true });
 
const Question = mongoose.model<QuestionInterface>('Question', QuestionSchema);
export default Question