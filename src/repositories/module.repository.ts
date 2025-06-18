import { Module, Course, Lecture, Question, Quiz, Resource } from '../models';
import { ModuleInterface, ModuleUpdateInterface } from '../interfaces';
import { ErrorResponse } from '../utils';


//Dealing with data base operations
class ModuleRepository {

    async GetModules(): Promise<any>  {
        try{
            const modules = await Module.find()
                      .populate({
                        path: 'lectures',
                        populate: { path: 'resources' }
                      });
            return modules
        } catch(error: any){
            throw new ErrorResponse(error.message, 400)
        }
    }

    async AddModule(newModule: ModuleInterface): Promise<any>  {
        const { title, description, courseId } = newModule
        try{
            const module = await Module.create({
                title, description, courseId
            })

            const course = await Course.findOne({ _id: courseId })
            if(!course) {
                throw new ErrorResponse("Course not found", 400)
            }
            
            const modules = course.modules
            await Course.updateOne({ _id: courseId },
                {
                    $set: {
                        modules:[...modules, module._id ]
                    }
                });
            
            return module
        } catch(error: any){
            throw new ErrorResponse(error.message, 400)
        }
    }

    async UpdateModule(moduleInfo: ModuleUpdateInterface): Promise<any>  {
        const { _id, title, description} = moduleInfo
        try{
            const module = await Module.findOne({_id})
            if(!module) {
                throw new ErrorResponse("Module not found", 400)
            }
            module.title = title
            module.description = description
            await module.save()
            
            return module
        } catch(error: any){
            throw new ErrorResponse(error.message, 400)
        }
    }

    async DeleteModule(_id: string): Promise<any>  {
        try{
            const module = await Module.findOne({ _id })
            if(!module) {
                throw new ErrorResponse("Module not found", 400)
            }
            const { courseId } = module
            
            const course = await Course.findOne({ _id: courseId })
            if(!course) {
                throw new ErrorResponse("Course not found", 400)
            }
            course.modules = course.modules.filter((moduleId) => moduleId.toString() !== _id)
            await course.save()

            await Lecture.deleteMany({ moduleId: _id })
            await Resource.deleteMany({ moduleId: _id })
            await Quiz.deleteMany({ moduleId: _id })
            await Question.deleteMany({ moduleId: _id })
            const status = await Module.deleteOne({_id})
            console.log(status)
            return status
        } catch(error: any){
            throw new ErrorResponse(error.message, 400)
        }
    }
 
}

export default ModuleRepository;