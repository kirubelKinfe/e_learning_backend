
import { ModuleInterface } from '../interfaces'
import mongoose from 'mongoose'

const ModuleSchema = new mongoose.Schema<ModuleInterface>({
    title: {
        type: String,
        required: [true, "Please provide a title"]
    },
    description: {
        type: String
    },
    lectures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lecture'  }],
    quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz'  }],
    courseId: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'Course', 
        required: [true, "Please provide a courseId"] 
    }
})

const Module = mongoose.model<ModuleInterface>("Module", ModuleSchema)
export default Module