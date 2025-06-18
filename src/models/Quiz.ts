import { QuizInterface } from '../interfaces';
import mongoose from 'mongoose';

const QuizSchema = new mongoose.Schema<QuizInterface>({
    courseId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Course', 
        required: [true, "Please provide courseId"]
    },
    moduleId: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'Module', 
        required: [true, "Please provide moduleId"]  
    },
    title: { 
        type: String, 
        required: [true, "Please provide title"] 
    },
    description: { 
        type: String 
    },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }]

}, { timestamps: true });

 
const Quiz = mongoose.model<QuizInterface>('Quiz', QuizSchema);
export default Quiz