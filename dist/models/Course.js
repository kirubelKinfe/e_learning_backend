"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CourseSchema = new mongoose_1.default.Schema({
    title: { type: String, required: [true, "Please provide a title"] },
    subtitle: { type: String },
    category: { type: String, required: [true, "Please provide department"] },
    instructorId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: [true, "Please provide instructorId"] },
    description: { type: String },
    thumbnail: {
        type: String,
        default: 'https://res.cloudinary.com/dzxqdo1ub/image/upload/v1685406241/Courses/placeholder_xp6dle.jpg'
    },
    public_id: {
        type: String,
        default: ''
    },
    objectives: [{ type: { objective: { type: String } } }],
    requirements: [{ type: { requirement: { type: String } } }],
    intendedlearners: [{ type: { learner: { type: String } } }],
    duration: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    status: { type: String, default: "not published" },
    students: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' }],
    modules: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Module' }],
    reviews: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Review' }],
    discussions: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Discussion' }]
}, { timestamps: true });
const Course = mongoose_1.default.model("Course", CourseSchema);
exports.default = Course;
// model Course {
//     id            Int       @id @default(autoincrement())
//     title         String    @db.VarChar(255)
//     subtitle      String?
//     category      String
//     instructorId  Int       // Assuming instructorId refers to an integer user ID
//     description   String?
//     thumbnail     String?   @db.VarChar(255) // Adjust type and length as needed
//     public_id     String?   @db.VarChar(255)
//     // Nested arrays are not directly supported in Prisma
//     // You may need to redesign these fields depending on your needs
//     objectives    Json?
//     requirements  Json?
//     intendedLearners Json?
//     duration      Int?      @default(0)
//     rating        Float?    @default(0)
//     status        String?   @default("not published")
//     // Define relationships to other models
//     students      User[]    @relation("CourseStudents", fields: [id], references: [id])
//     modules       Module[]  @relation("CourseModules")
//     reviews       Review[]  @relation("CourseReviews")
//     discussions   Discussion[] @relation("CourseDiscussions")
//     createdAt     DateTime  @default(now())
//     updatedAt     DateTime  @updatedAt
//   }
