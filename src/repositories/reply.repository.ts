import { Discussion, Reply, Vote } from '../models';
import { ReplyInterface, ReplyUpdateInterface } from '../interfaces';
import { ErrorResponse } from '../utils';


//Dealing with data base operations
class ReplyRepository {

    async GetReplies(): Promise<any>  {
        try{
            const replies = await Reply.find()
                      .populate({
                        path: 'votes',
                      });
            return replies
        }catch(error){
            throw new ErrorResponse(error.message, 400)
        }
    }

    async AddReply(newReply: ReplyInterface): Promise<any>  {
        const { author, textBody, discussionId, courseId } = newReply
        try{
            const reply = await Reply.create({
                author, textBody, discussionId, courseId
            })

            const discussion = await Discussion.findOne({ _id: discussionId })
            if(!discussion) {
                throw new ErrorResponse("Discussion not found", 400)
            }
            
            const replies = discussion.replies
            await Discussion.updateOne({ _id: discussionId },
                {
                    $set: {
                        replies:[...replies, reply._id ]
                    }
                });
            return reply
        }catch(error){
            throw new ErrorResponse(error.message, 400)
        }
    }

    async UpdateReply(replyInfo: ReplyUpdateInterface): Promise<any>  {
        const { _id, textBody } = replyInfo
        try{
            const reply = await Reply.findOne({_id})
            if(!reply) {
                throw new ErrorResponse("Reply not found", 400)
            }
            await Reply.updateOne({ _id },
                        {
                            $set: {
                                textBody
                            }
                        });
            return reply
        }catch(error){
            throw new ErrorResponse(error.message, 400)
        }
    }

    async DeleteReply(_id: string): Promise<any>  {
        try{
            const reply = await Reply.findOne({_id})
            if(!reply) {
                throw new ErrorResponse("Reply not found", 400)
            }

            await Vote.deleteMany({ courseId: _id })

            const { discussionId } = reply
            
            const discussion = await Discussion.findOne({ _id: discussionId })
            if(!discussion) {
                throw new ErrorResponse("Discussion not found", 400)
            }
            
            discussion.replies = discussion.replies.filter((replyId) => replyId.toString() !== _id)
            await discussion.save()

            await Vote.deleteMany({ replyId: _id})
            const status = await Reply.deleteOne({_id})
            return status
        }catch(error){
            throw new ErrorResponse(error.message, 400)
        }
    }
 
}

export default ReplyRepository;