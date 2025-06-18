import { ModuleRepository } from "../repositories";
import { ErrorResponse, FormateData } from "../utils";
import { ModuleInterface, ModuleUpdateInterface } from "../interfaces";


// All Business logic will be here
class ModuleService {
  repository: ModuleRepository
  
  constructor() {
    this.repository = new ModuleRepository()
  }

  async GetModules(): Promise<any> {
    
    try {
      const modules = await this.repository.GetModules();
      return FormateData({status: true, data: modules });
    } catch (error) {
        throw new ErrorResponse(error.message, 400)
    }
  }

  async AddModule(newModule: ModuleInterface): Promise<any> {
    
    try {
      const module = await this.repository.AddModule(newModule);
      return FormateData({status: true, data: module });
    } catch (error) {
        throw new ErrorResponse(error.message, 400)
    }
  }

  async UpdateModule(moduleInfo: ModuleUpdateInterface): Promise<any> {
    
    try {
      const updateStatus = await this.repository.UpdateModule(moduleInfo);
      return FormateData({status: true, data: updateStatus });
    } catch (error) {
        throw new ErrorResponse(error.message, 400)
    }
  }

  async DeleteModule(_id: string): Promise<any> {
    
    try {
      const data = await this.repository.DeleteModule(_id);
      return FormateData(data);
    } catch (error) {
      throw new ErrorResponse(error.message, 400)
    }
  }
}


export default ModuleService;