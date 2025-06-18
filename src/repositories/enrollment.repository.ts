import { Course, CourseProgress, Enrollment, User } from '../models';
import { CourseInterface, EnrollmentInterface, UserInterface } from '../interfaces';
import { ErrorResponse } from '../utils';
import { ObjectId } from 'mongoose';

interface CurrentLectureInterface {
    _id: ObjectId,
    title: string,
    description: string,
    article: string,
    videoUrl: string,
    public_id: string,
    duration: number,
    moduleId: ObjectId,
    courseId: ObjectId,
    resources: Array<ObjectId>
}

interface CurrentModuleInterface {
    _id: ObjectId,
    title: string,
    description: string,
    lectures: CurrentLectureInterface[],
    quizzes: Array<ObjectId>,
    courseId: ObjectId
}

interface CurrentCourseInterface {
    title: string,
    subtitle: string,
    category: String,
    instructorId: UserInterface,
    
    description: string,
    thumbnail: string,
    public_id: string,

    modules: CurrentModuleInterface[],
    reviews: Array<ObjectId>,
    discussions: Array<ObjectId>
    students: Array<ObjectId>,

    objectives: {
        objective: string
    }[],
    requirements: {
        requirement: string
    }[],
    intendedlearners: {
        learner: string
    }[],

    duration: number,
    rating: number,
    status: string,

}
//Dealing with data base operations
class EnrollmentRepository {

    async GetEnrollments(): Promise<any>  {
        try{
            const enrollments = await Enrollment.find()
            return enrollments
        }catch(error){
            throw new ErrorResponse(error.message, 400)
        }
    }

    async GetEnrollment(userId: string, courseId: string): Promise<any>  {
        try{
            const enrollments = await Enrollment.find({ userId, courseId })
            return enrollments
        }catch(error){
            throw new ErrorResponse(error.message, 400)
        }
    }

    async AddEnrollment(newVote: EnrollmentInterface): Promise<any>  {
        const { userId, courseId } = newVote
        try{
            const enrolledStatus = await Enrollment.findOne({ userId, courseId })
            if(enrolledStatus) {
                throw new ErrorResponse("User Already Enrolled", 400)
            }
            
            const course: CurrentCourseInterface = await Course.findOne<CurrentCourseInterface>({ _id: courseId }).populate({
                path: 'modules',
                populate: [
                    {
                        path: 'quizzes',
                        model: 'Quiz',
                        populate: {
                            path: 'questions',
                        }
                    },
                    { 
                        path: 'lectures', 
                        model: 'Lecture',
                        populate: 'resources'
                    }
                ]
              })
            if(!course) {
                throw new ErrorResponse("Course not found", 400)
            }
            
            let lectureProgress = [] as { lectureId: ObjectId, progress: number }[]
            
            course?.modules.forEach((module) => {
                module?.lectures.forEach((lecture) => (
                    lectureProgress.push({ lectureId: lecture._id, progress: 0})
                ))
            })
            
            await CourseProgress.create({
                userId,
                courseId,
                lectureProgress
            })

            
            const students = course.students
            await Course.updateOne({ _id: courseId },
                {
                    $set: {
                        students:[...students, userId ]
                    }
            }); 

            const user = await User.findOne({ _id: userId })
            if(!user) {
                throw new ErrorResponse("User not found", 400)
            }
            
            const coursesEnrolled = user.coursesEnrolled
            await User.updateOne({ _id: userId },
                {
                    $set: {
                        coursesEnrolled:[...coursesEnrolled, courseId ]
                    }
                });
            
               
                   
            const enrollment = await Enrollment.create({
                userId, courseId
            })
            return enrollment
        }catch(error){
            throw new ErrorResponse(error.message, 400)
        }
    }

  
    async DeleteEnrollment(_id: string): Promise<any>  {
        try{
            const enrollment = await Enrollment.findOne({_id})
            if(!enrollment) {
                throw new ErrorResponse("Enrollment not found", 400)
            }
            const { userId, courseId } = enrollment
            
            const user = await User.findOne({ _id: userId })
            if(!user) {
                throw new ErrorResponse("User not found", 400)
            }
            
            user.coursesEnrolled = user.coursesEnrolled.filter((courseId) => courseId.toString() !== _id)
            await user.save()

            const course = await Course.findOne({ _id: courseId })
            if(!course) {
                throw new ErrorResponse("Course not found", 400)
            }
                
            course.students = course.students.filter((studentId) => studentId !== userId)
            await course.save()

            const status = await Enrollment.deleteOne({_id})
            return status
        }catch(error){
            throw new ErrorResponse(error.message, 400)
        }
    }
 
}

export default EnrollmentRepository;