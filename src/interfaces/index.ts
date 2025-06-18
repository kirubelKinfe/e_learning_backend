import { ObjectId } from "mongoose";

export interface UserInterface extends Document {
    firstName: string;
    lastName: string;
    profilePic: string;
    email: string;
    active: string,
    password: string,
    role: string,
    coursesCreated: Array<ObjectId>,
    coursesEnrolled: Array<ObjectId>,
    coursesCompleted: Array<ObjectId>,
    resetPasswordToken: string,
    resetPasswordExpire: Date
    
    matchPasswords: (pw: string) => Promise<boolean>
    getSignedToken: () => {}
    getResetPasswordToken: () => {}
}

export interface UserRegister {
    firstName: string,
    lastName: string,
    profilePic: string,
    email: string,
    password: string,
    role: string
  }
  
export interface UserLogin {
    email: string,
    password: string
  }
  
export interface UserUpdate {
    _id: ObjectId,
    firstName?: string,
    lastName?: string,
    profilePic?: string,
    email?: string,
    password?: string,
    role?: string
}

export interface UserForgotPassword {
    email: string
}

export interface UserResetToken {
    resetToken: string
}


export interface CourseInterface extends Document {
    title: string,
    subtitle: string,
    category: String,
    instructorId: ObjectId,
    
    description: string,
    thumbnail: string,
    public_id: string,

    modules: Array<ObjectId>,
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

export interface CreateCourseInterface extends Document {
    title: string,
    category: String,
    instructorId: ObjectId,
    status: string,
}

export interface PublishCourseInterface extends Document {
    _id: ObjectId,
    title: string,
    subtitle: string,
    category: String,
    status: string,
    
    description: string,
    thumbnail: string,
    public_id: string,

    objectives: {
        objective: string
    }[],
    requirements: {
        requirement: string
    }[],
    intendedlearners: {
        learner: string
    }[]
}


export interface LectureProgressInterface extends Document {
    lectureId: ObjectId,
    progress?: number,
}


export interface CourseProgressInterface extends Document {
    userId: ObjectId,
    courseId: ObjectId,
    lectureProgress: LectureProgressInterface[]
    progress: number
    certificateUrl: string
}



export interface EnrollmentInterface extends Document {
    courseId: ObjectId,
    userId: ObjectId,
}

export interface ModuleInterface extends Document {
    title: string,
    description: string,
    lectures: Array<ObjectId>,
    quizzes: Array<ObjectId>,
    courseId: ObjectId
}

export interface ModuleUpdateInterface extends Document {
    _id: ObjectId,
    title: string,
    description: string
}


export interface LectureInterface extends Document {
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

export interface VideoLectureUploadInterface extends Document {
    _id: ObjectId,
    moduleId: ObjectId,
    courseId: ObjectId,
    videoUrl: string,
    public_id: string,
    duration: number
}

export interface LectureUpdateInterface extends Document {
    _id: ObjectId,
    title: string,
    article?: string,
    description?: string,
}

export interface ResourceInterface extends Document {
    title: string,
    url: string,
    public_id: string,
    lectureId: ObjectId,
    moduleId: ObjectId,
    courseId: ObjectId
}

export interface ResourceUpdateInterface extends Document {
    _id: ObjectId,
    title: string,
    url: string,
    public_id: string
}


export interface ReviewInterface extends Document {
    userId: ObjectId,
    courseId: ObjectId,
    rating: number,
    comment: string
}

export interface ReviewUpdateInterface extends Document {
    _id: string,
    rating?: number,
    comment?: string
}

export interface QuizInterface extends Document {
    courseId: ObjectId,
    moduleId: ObjectId,
    title: string,
    description?: string,
    questions: Array<ObjectId>
}

export interface QuizUpdateInterface extends Document {
    _id: ObjectId,
    title: string,
    description: string
}


export interface QuestionInterface extends Document {
    courseId: ObjectId,
    moduleId: ObjectId,
    quizId: ObjectId,
    title: string,
    answer: string,
    choices: {
        choice: string
    }[],
}

export interface QuestionUpdateInterface extends Document {
    _id: ObjectId,
    title: string,
    answer: string,
    choices: {
        choice: string
    }[],
}


export interface DiscussionInterface extends Document {
    author: ObjectId,
    courseId: ObjectId,
    textBody: string,
    title: string,
    replies: Array<ObjectId>
}

export interface DiscussionUpdateInterface extends Document {
    _id: ObjectId,
    textBody: string,
    title: string,
}

export interface ReplyInterface extends Document {
    courseId: ObjectId,
    author: ObjectId,
    discussionId: ObjectId,
    textBody: string,
    votes: Array<ObjectId>
}

export interface ReplyUpdateInterface extends Document {
    _id: ObjectId,
    textBody: string
}

export interface VoteInterface extends Document {
    courseId: ObjectId,
    discussionId: ObjectId,
    userId: ObjectId,
    replyId: ObjectId,
    vote: Boolean
}


export interface IApiError {
    message: string;
    description: string;
    statusCode: string | number;
  }

export interface RequestQueryInterface {
    page: string
    limit: string
    category: string
    name: string
    instructor: string
}