
import { User } from '../models';
import { UserUpdate } from '../interfaces';
import { ErrorResponse } from '../utils';


//Dealing with data base operations
class UserRepository {

    async GetUsers(): Promise<any>  {
        try{
            const users = await User.find()
                                .populate({
                                    path: 'coursesCreated',
                                    populate: [
                                        {
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
                                        }, 
                                        {
                                            path: 'instructorId'
                                        }
                                    ]
                                    
                                })
                                .populate({
                                    path: 'coursesEnrolled',
                                    populate: [
                                        {
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
                                        }, 
                                        {
                                            path: 'instructorId'
                                        }
                                    ]
                                    
                                })
                                .populate({
                                    path: 'coursesCompleted',
                                    populate: [
                                        {
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
                                        }, 
                                        {
                                            path: 'instructorId'
                                        }
                                    ]
                                    
                                })
            return users
        }catch(error: any){
            throw new ErrorResponse(error.message, 400)
        }
    }

    async GetUserById(userId: string): Promise<any>  {
        try{
            const user = await User.findOne({ _id: userId })
                                    .populate({
                                        path: 'coursesCreated',
                                        populate: [
                                            {
                                                path: 'instructorId'
                                            },
                                            {
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
                                            },
                                            {
                                                path: 'reviews',
                                                populate: [
                                                    {
                                                        path: 'courseId'
                                                    },
                                                    {
                                                        path: 'userId'
                                                    }
                                                ]
                                            },
                                            {
                                                path: 'discussions',
                                                populate:[ 
                                                    { 
                                                        path: 'replies',
                                                        model: 'Reply',
                                                        populate: ({
                                                            path: 'author',
                                                            model: 'User'
                                                        })
                                                    },
                                                    {
                                                        path: 'author',
                                                        model: 'User',
                                                    },
                                                    {
                                                        path: 'courseId',
                                                        model: 'Course',
                                                    }
                                                ]
                                            }
                                        ]
                                        
                                    })
                                    .populate({
                                        path: 'coursesEnrolled',
                                        populate: [
                                            {
                                                path: 'instructorId'
                                            },
                                            {
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
                                            },
                                            {
                                                path: 'reviews',
                                                populate: [
                                                    {
                                                        path: 'courseId'
                                                    },
                                                    {
                                                        path: 'userId'
                                                    }
                                                ]
                                            },
                                            {
                                                path: 'discussions',
                                                populate:[ 
                                                    { 
                                                        path: 'replies',
                                                        model: 'Reply',
                                                        populate: ({
                                                            path: 'author',
                                                            model: 'User'
                                                        })
                                                    },
                                                    {
                                                        path: 'author',
                                                        model: 'User',
                                                    },
                                                    {
                                                        path: 'courseId',
                                                        model: 'Course',
                                                    }
                                                ]
                                            }
                                        ]
                                        
                                    })
                                    .populate({
                                        path: 'coursesCompleted',
                                        populate: [
                                            {
                                                path: 'instructorId'
                                            },
                                            {
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
                                            },
                                            {
                                                path: 'reviews',
                                                populate: [
                                                    {
                                                        path: 'courseId'
                                                    },
                                                    {
                                                        path: 'userId'
                                                    }
                                                ]
                                            },
                                            {
                                                path: 'discussions',
                                                populate:[ 
                                                    { 
                                                        path: 'replies',
                                                        model: 'Reply',
                                                        populate: ({
                                                            path: 'author',
                                                            model: 'User'
                                                        })
                                                    },
                                                    {
                                                        path: 'author',
                                                        model: 'User',
                                                    },
                                                    {
                                                        path: 'courseId',
                                                        model: 'Course',
                                                    }
                                                ]
                                            }
                                        ]
                                        
                                    })

            return user
        }catch(error: any){
            throw new ErrorResponse(error.message, 400)
        }
    }

    async UpdateUser(updateData: UserUpdate): Promise<any>  {
        const { _id, firstName, lastName, email, password, profilePic, role } = updateData
        console.log(password)
        try{
            const user = await User.findOne({_id})
            if(!user) {
                throw new ErrorResponse("User not found", 400)
            }
            await User.updateOne({ _id },
                        {
                            $set: {
                                firstName,
                                lastName,
                                email,
                                password,
                                profilePic,
                                role
                            }
                        });
            return user
        }catch(error: any){
            throw new ErrorResponse(error.message, 400)
        }
    }

    async DeleteUser(_id: string): Promise<any>  {
        try{
            const user = await User.findOne({_id})
            if(!user) {
                throw new ErrorResponse("User not found", 400)
            }
            user.active = "diactivated"
            await user.save()
            return {status: true, data: "User Diactivated" }
        }catch(error: any){
            throw new ErrorResponse(error.message, 400)
        }
    }
 
}

export default UserRepository;