import { Course, Lecture, Module, Resource } from '../models';
import { LectureInterface, LectureUpdateInterface, VideoLectureUploadInterface } from '../interfaces';
import { ErrorResponse } from '../utils';


//Dealing with data base operations
class LectureRepository {

    async GetLectures(): Promise<any>  {
        try{
            const lectures = await Lecture.find()
                      .populate({
                        path: 'resources'
                      });
            return lectures
        }catch(error){
            throw new ErrorResponse(error.message, 400)
        }
    }

    async GetLectureWithId(lectureId: string): Promise<any>  {
        try{
            const lectures = await Lecture.find({ _id: lectureId })
                      .populate({
                        path: 'resources'
                      });
            return lectures
        }catch(error){
            throw new ErrorResponse(error.message, 400)
        }
    }

    async AddLecture(newLecture: LectureInterface): Promise<any>  {
        const { title, description, moduleId, courseId } = newLecture
        try{
            const lecture = await Lecture.create({
                title, description, moduleId, courseId
            })

            const module = await Module.findOne({ _id: moduleId })
            if(!module) {
                throw new ErrorResponse("Module not found", 400)
            }
            
            const lectures = module.lectures
            await Module.updateOne({ _id: moduleId },
                {
                    $set: {
                        lectures:[...lectures, lecture._id ]
                    }
                });
            return lecture
        }catch(error){
            throw new ErrorResponse(error.message, 400)
        }
    }

    async UploadVideoLecture(LectureInfo: VideoLectureUploadInterface): Promise<any>  {
        const { _id, courseId, moduleId, duration, videoUrl, public_id} = LectureInfo
        try{
            const lecture = await Lecture.findOne({_id})
            if(!lecture) {
                throw new ErrorResponse("Lecture not found", 400)
            }
            
            const updateStatus = await Lecture.updateOne({ _id },
                        {
                            $set: {
                                duration, 
                                videoUrl,
                                public_id
                            }
                        });
                const courseLectures = await Lecture.find({ moduleId })
                if(!courseLectures) {
                    throw new ErrorResponse("Lectures not found", 400)
                }
                
                let totalDuration = 0
                courseLectures?.forEach((lecture) => {
                    totalDuration += Number.parseFloat(lecture.duration.toString())
                })
    
                await Course.updateOne({ _id: courseId },
                    {
                        $set: {
                            duration: totalDuration
                        }
                    });
            return updateStatus
        }catch(error){
            throw new ErrorResponse(error.message, 400)
        }
    }
    async UpdateLecture(LectureInfo: LectureUpdateInterface): Promise<any>  {
        const { _id, title, article, description} = LectureInfo
        try{
            const lecture = await Lecture.findOne({_id})
            if(!lecture) {
                throw new ErrorResponse("Lecture not found", 400)
            }
            
            const updateStatus = await Lecture.updateOne({ _id },
                        {
                            $set: {
                                title,
                                article,
                                description
                            }
                        });
            return updateStatus
        }catch(error){
            throw new ErrorResponse(error.message, 400)
        }
    }

    async DeleteLecture(_id: string): Promise<any>  {
        try{
            const lecture = await Lecture.findOne({_id})
            if(!lecture) {
                throw new ErrorResponse("Lecture not found", 400)
            }

            await Resource.deleteMany({ courseId: _id })

            const { moduleId } = lecture
            
            const module = await Module.findOne({ _id: moduleId })
            if(!module) {
                throw new ErrorResponse("Module not found", 400)
            }
            module.lectures = module.lectures.filter((lectureId) => lectureId.toString() !== _id)
            console.log(module)
            await module.save()
                
            await Resource.deleteMany({ lectureId: _id })
            const status = await Lecture.deleteOne({_id})
            console.log(status)
            return status
        }catch(error){
            throw new ErrorResponse(error.message, 400)
        }
    }
 
}

export default LectureRepository;