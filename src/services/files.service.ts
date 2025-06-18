import { FilesRepository } from "../repositories";
import { ErrorResponse, FormateData } from "../utils";


// All Business logic will be here
class FilesService {
  repository: FilesRepository
  
  constructor() {
    this.repository = new FilesRepository()
  }

  async DeleteFile(public_id: string): Promise<any> {
    
    try {
      const data = await this.repository.DeleteFile(public_id);
      return FormateData({ status: true, data});
    } catch (error: any) {
      throw new ErrorResponse(error.message, 400)
    }
  }
}


export default FilesService;