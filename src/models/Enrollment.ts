import { EnrollmentInterface } from '../interfaces'
import mongoose from 'mongoose'

const EnrollmentSchema = new mongoose.Schema<EnrollmentInterface>({
    courseId: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'Course',
        required: [true, "Please provide courseId"] 
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: [true, "Please provide userId"] 
    }
}, { timestamps: true })



const Enrollment = mongoose.model<EnrollmentInterface>("Enrollment", EnrollmentSchema)
export default Enrollment