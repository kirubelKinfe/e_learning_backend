import { Lecture, Resource } from '../models';
import { ResourceInterface, ResourceUpdateInterface } from '../interfaces';
import { ErrorResponse } from '../utils';


//Dealing with data base operations
class ResourceRepository {

    async GetResources(): Promise<any>  {
        try{
            const resources = await Resource.find()
            return resources
        } catch(error: any){
            throw new ErrorResponse(error.message, 400)
        }
    }

    async AddResource(newResource: ResourceInterface): Promise<any>  {
        const { title, url, public_id, lectureId, moduleId, courseId } = newResource
        console.log(newResource)
        try{
            const resource = await Resource.create({ 
                title, url, public_id, lectureId, moduleId, courseId
            })
        
            const lecture = await Lecture.findOne({ _id: lectureId })
            if(!lecture) {
                throw new ErrorResponse("Lecture not found", 400)
              }
            
            const resources = lecture.resources
            await Lecture.updateOne({ _id: lectureId },
                {
                    $set: {
                        resources:[...resources, resource._id ]
                    }
                });
            return resource
        } catch(error: any){
            throw new ErrorResponse(error.message, 400)
        }
    }

    async UpdateResource(updateResource: ResourceUpdateInterface): Promise<any>  {
        const { _id, title, url, public_id } = updateResource
        console.log(updateResource)

        try{
            const resource = await Resource.find({_id})
            if(!resource) {
                throw new ErrorResponse("Resource not found", 400)
            }
            await Resource.updateOne({ _id },
                        {
                            $set: {
                                title,
                                url,
                                public_id
                            }
                        });
            return resource
        } catch(error: any){
            throw new ErrorResponse(error.message, 400)
        }
    }

    async DeleteResource(_id: string): Promise<any>  {
        try{
            const resource = await Resource.findOne({_id})
            if(!resource) {
                throw new ErrorResponse("Resource not found", 400)
            }
            const { lectureId } = resource
            
            const lecture = await Lecture.findOne({ _id: lectureId })
            if(!lecture) {
                throw new ErrorResponse("Lecture not found", 400)
            }
            lecture.resources = lecture.resources.filter((resourceId) => resourceId.toString() !== _id)
            await lecture.save()
        
            const status = await Resource.deleteOne({ _id })
            return status
        } catch(error: any){
            throw new ErrorResponse(error.message, 400)
        }
    }
 
}

export default ResourceRepository;