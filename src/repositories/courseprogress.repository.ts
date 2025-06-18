// @ts-nocheck
import { CourseProgress } from '../models';
import { ErrorResponse } from '../utils';
import { LectureProgressInterface } from '../interfaces';


//Dealing with data base operations
class CourseProgressRepository {

    async GetCourseProgress(courseId: string, userId: string): Promise<any>  {
        try{
            const courseProgress = await CourseProgress.findOne({  userId, courseId });

            if (!courseProgress) {
                throw new ErrorResponse('Course progress not found.', 400)
            }

            return courseProgress
        } catch(error: any){
            throw new ErrorResponse(error.message, 400)
        }
    }

    async UpdateCourseProgress(courseId: string, userId: string, lectureId: any, progress: number): Promise<any>  {
           
        try{
            const courseProgress = await CourseProgress.findOne({ userId, courseId });

            if (!courseProgress) {
              throw new ErrorResponse("CourseProgress not found.", 400)
            }
        
            const { lectureProgress } = courseProgress
        
            const lectureIndex = lectureProgress.findIndex(
              (lp: LectureProgressInterface) => lp.lectureId.toString() === lectureId
            );
        
            if (lectureIndex === -1) {
              lectureProgress.push({ lectureId: lectureId, progress } as LectureProgressInterface);
            } else {
              lectureProgress[lectureIndex].progress = progress;
            }
        
            const overallProgress = lectureProgress.reduce((acc: number, curr: { progress: number }) => acc + curr.progress, 0) / lectureProgress.length;
            courseProgress.progress = overallProgress
            
            await courseProgress.save();

            return lectureProgress
        } catch(error: any){
            throw new ErrorResponse(error.message, 400)
        }
    }
    
 
}

export default CourseProgressRepository;