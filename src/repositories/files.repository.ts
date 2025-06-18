
import { ErrorResponse } from '../utils';
import cloudinary from 'cloudinary'

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
//Dealing with data base operations
class FilesRepository {

    async DeleteFile(public_id: string): Promise<any>  {
        try {
            const response = await cloudinary.v2.uploader.destroy(public_id, (error: any,result: any) => {
                if(error) {
                    throw new ErrorResponse(error.message, 400)
                }
                console.log(result) 
                return  result
            })
            return response    
        } catch(error: any){
            throw new ErrorResponse(error.message, 400)
        }  
    }
 
}

export default FilesRepository;