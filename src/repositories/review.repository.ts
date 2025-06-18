import { Course, Review } from '../models';
import { ReviewInterface, ReviewUpdateInterface } from '../interfaces';
import { ErrorResponse } from '../utils';


//Dealing with data base operations
class ReviewRepository {

    async GetReviews(): Promise<any>  {
        try{
            const reviews = await Review.find()
                                    .populate('userId')
                                    .populate('courseId')
            return reviews
        }catch(error){
            throw new ErrorResponse(error.message, 400)
        }
    }

    async GetCourseReviews(courseId: string): Promise<any>  {
        try{
            const reviews = await Review.find({ courseId })
                                    .populate('userId')
                                    .populate('courseId')
            return reviews
        }catch(error){
            throw new ErrorResponse(error.message, 400)
        }
    }

    async AddReview(newReview: ReviewInterface): Promise<any>  {
        const { comment, rating, userId, courseId } = newReview
        try{
            const review = await Review.create({ 
                comment, rating, userId, courseId
            })
        
            const course = await Course.findOne({ _id: courseId })
            if(!course) {
                throw new ErrorResponse("Course not found", 400)
              }
            
            const reviews = course.reviews
            const courseReviews = await Review.find({ courseId })
            if(!courseReviews) {
                throw new ErrorResponse("Reviews not found", 400)
            }
            let totalRating = 0
            let count = 0
            courseReviews?.map((review) => {
                totalRating += Number.parseFloat(review.rating.toString())
                count++
                return totalRating
            })
            const newRating = Math.round((totalRating / count) * 100) / 100
            

            await Course.updateOne({ _id: courseId },
                {
                    $set: {
                        reviews:[...reviews, review._id ],
                        rating: newRating
                    }
                });
            return review
        }catch(error){
            throw new ErrorResponse(error.message, 400)
        }
    }

    async UpdateReview(reviewInfo: ReviewUpdateInterface): Promise<any>  {
        const { _id, comment, rating} = reviewInfo
        console.log(reviewInfo)
        
        try{
            const review = await Review.findOne({_id})
            if(!review) {
                throw new ErrorResponse("Review not found", 400)
            }
            await Review.updateOne({ _id },
                        {
                            $set: {
                                rating,
                                comment
                            }
                        });
            const { courseId } = review
            const courseReviews = await Review.find({ courseId })
            if(!courseReviews) {
                throw new ErrorResponse("Reviews not found", 400)
            }
            let totalRating = 0
            let count = 0
            courseReviews?.map((review) => {
                totalRating += Number.parseFloat(review.rating.toString())
                count++
                return totalRating
            })
            const updatedRating = Math.round((totalRating / count) * 100) / 100
            await Course.updateOne({ _id: courseId },
                {
                    $set: {
                        rating: updatedRating
                    }
                });
            return review
        }catch(error){
            throw new ErrorResponse(error.message, 400)
        }
    }

    async DeleteReview(_id: string): Promise<any>  {
        try{
            const review = await Review.findOne({_id})
            if(!review) {
                throw new ErrorResponse("Review not found", 400)
            }
            const { rating, courseId } = review
            
            const course = await Course.findOne({ _id: courseId })
            if(!course) {
                throw new ErrorResponse("Course not found", 400)
            }
            course.reviews = course.reviews.filter((reviewId) => reviewId.toString() !== _id)
            await course.save()

            const status = await Review.deleteOne({ _id })

            const reviews = await Review.find()
            if(!reviews) {
                throw new ErrorResponse("Reviews not found", 400)
            }
            let totalRating = 0
            let count = 0
            reviews?.map((review) => {
                totalRating += Number.parseFloat(review.rating.toString())
                count++
                return totalRating
            })
            const newRating = Math.round((totalRating / count) * 100) / 100
            await Course.updateOne({ _id: courseId },
                {
                    $set: {
                        rating: newRating
                    }
                });
        
            return status
        }catch(error){
            throw new ErrorResponse(error.message, 400)
        }
    }
 
}

export default ReviewRepository;