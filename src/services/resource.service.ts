import { ResourceRepository } from "../repositories";
import { ErrorResponse, FormateData } from "../utils";
import { ResourceInterface, ResourceUpdateInterface } from "../interfaces";


// All Business logic will be here
class ResourceService {
  repository: ResourceRepository
  
  constructor() {
    this.repository = new ResourceRepository()
  }

  async GetResources(): Promise<any> {
    
    try {
      const resources = await this.repository.GetResources();
      return FormateData({status: true, data: resources });
    } catch (error: any) {
        throw new ErrorResponse(error.message, 400)
    }
  }

  async AddResource(newResource: ResourceInterface): Promise<any> {
    
    try {
      const resource = await this.repository.AddResource(newResource);
      return FormateData({status: true, data: resource });
    } catch (error: any) {
        throw new ErrorResponse(error.message, 400)
    }
  }

  async UpdateResource(updateResource: ResourceUpdateInterface): Promise<any> {
    
    try {
      const resource = await this.repository.UpdateResource(updateResource);
      return FormateData({status: true, data: resource });
    } catch (error: any) {
        throw new ErrorResponse(error.message, 400)
    }
  }

  async DeleteResource(_id: string): Promise<any> {
    
    try {
      const data = await this.repository.DeleteResource(_id);
      return FormateData(data);
    } catch (error: any) {
      throw new ErrorResponse(error.message, 400)
    }
  }
}


export default ResourceService;