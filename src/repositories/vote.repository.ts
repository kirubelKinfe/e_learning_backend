import {  Reply, Vote } from '../models';
import { VoteInterface } from '../interfaces';
import { ErrorResponse } from '../utils';


//Dealing with data base operations
class VoteRepository {

    async GetVotes(): Promise<any>  {
        try{
            const votes = await Vote.find()
            return votes
        } catch(error: any){
            throw new ErrorResponse(error.message, 400)
        }
    }

    async AddVote(newVote: VoteInterface): Promise<any>  {
        const { vote, userId, replyId, discussionId, courseId } = newVote
        try{
            const vot = await Vote.create({
                vote, userId, replyId, discussionId, courseId
            })

            const reply = await Reply.findOne({ _id: replyId })
            if(!reply) {
                throw new ErrorResponse("Reply not found", 400)
            }
            
            const votes = reply.votes
            await Reply.updateOne({ _id: replyId },
                {
                    $set: {
                        votes:[...votes, vot._id ]
                    }
                });
            return vot
        } catch(error: any){
            throw new ErrorResponse(error.message, 400)
        }
    }

  
    async DeleteVote(_id: string): Promise<any>  {
        try{
            const vote = await Vote.findOne({_id})
            if(!vote) {
                throw new ErrorResponse("Vote not found", 400)
            }
            const { replyId } = vote
            
            const reply = await Reply.findOne({ _id: replyId })
            if(!reply) {
                throw new ErrorResponse("Reply not found", 400)
            }
            
            reply.votes = reply.votes.filter((voteId) => voteId.toString() !== _id)
            await reply.save()

            const status = await Vote.deleteOne({_id})
            return status
        } catch(error: any){
            throw new ErrorResponse(error.message, 400)
        }
    }
 
}

export default VoteRepository;