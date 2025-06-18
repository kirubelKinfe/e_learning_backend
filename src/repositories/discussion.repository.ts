import { Course, Discussion, Reply, Vote } from '../models';
import { DiscussionInterface, DiscussionUpdateInterface } from '../interfaces';
import { ErrorResponse } from '../utils';


//Dealing with data base operations
class DiscussionRepository {

    async GetDiscussions(): Promise<any>  {
        try{
            const discussions = await Discussion.find()
                                    .populate({
                                        path: 'replies',
                                        populate: { path: 'votes' }
                                    })
                                    .populate('author')
                                    .populate('courseId')
                      
            return discussions
        }catch(error){
            throw new ErrorResponse(error.message, 400)
        }
    }

    async AddDiscussion(newDiscussion: DiscussionInterface): Promise<any>  {
        const { author, title, textBody, courseId } = newDiscussion
        try{
            const discussion = await Discussion.create({
                author, title, textBody, courseId
            })

            const course = await Course.findOne({ _id: courseId })
            if(!course) {
                throw new ErrorResponse("Course not found", 400)
            }
            
            const discussions = course.discussions
            await Course.updateOne({ _id: courseId },
                {
                    $set: {
                        discussions:[...discussions, discussion._id ]
                    }
                });
            return discussion
        }catch(error){
            throw new ErrorResponse(error.message, 400)
        }
    }

    async UpdateDiscussion(discussionInfo: DiscussionUpdateInterface): Promise<any>  {
        const { _id, title, textBody} = discussionInfo
        try{
            const discussion = await Discussion.findOne({_id})
            if(!discussion) {
                throw new ErrorResponse("Discussion not found", 400)
            }
            
            await Discussion.updateOne({ _id },
                        {
                            $set: {
                                title, 
                                textBody
                            }
                        });
            return discussion
        }catch(error){
            throw new ErrorResponse(error.message, 400)
        }
    }

    async DeleteDiscussion(_id: string): Promise<any>  {
        try{
            const discussion = await Discussion.findOne({_id})
            if(!discussion) {
                throw new ErrorResponse("Discussion not found", 400)
            }

            await Reply.deleteMany({ courseId: _id })
            await Vote.deleteMany({ courseId: _id })

            const { courseId } = discussion
            
            const course = await Course.findOne({ _id: courseId })
            if(!course) {
                throw new ErrorResponse("Course not found", 400)
            }
            course.discussions = course.discussions.filter((discussionId) => discussionId.toString() !== _id)
            await course.save()

            await Reply.deleteMany({ discussionId: _id })
            await Vote.deleteMany({ discussionId: _id })
            const status = await Discussion.deleteOne({_id})
            return status
        }catch(error){
            throw new ErrorResponse(error.message, 400)
        }
    }
 
}

export default DiscussionRepository;