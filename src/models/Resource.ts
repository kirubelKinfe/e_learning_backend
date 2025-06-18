import { ResourceInterface } from "../interfaces";
import mongoose from "mongoose";

const ResourceSchema = new mongoose.Schema<ResourceInterface>({
    title: { 
        type: String, 
        required: [true, "Please provide title"] 
    },
    url: { 
        type: String, 
        required: [true, "Please provide url"] 
    },
    public_id: {
        type: String, 
        required: [true, "Please provide public_id"] 
    },
    lectureId: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'Lecture', 
        required: [true, "Please provide lectureId"]  
    },
    moduleId: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'Module', 
        required: [true, "Please provide a moduleId"] 
    },
    courseId: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'Course', 
        required: [true, "Please provide a courseId"] 
    }
}, { timestamps: true });
  

  
const Resource = mongoose.model<ResourceInterface>('Resource', ResourceSchema);
export default Resource