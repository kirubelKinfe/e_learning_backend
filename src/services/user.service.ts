import { UserRepository } from "../repositories";
import { ErrorResponse, FormateData } from "../utils";
import { UserUpdate } from "../interfaces";


// All Business logic will be here
class UserService {
  repository: UserRepository
  
  constructor() {
    this.repository = new UserRepository()
  }

  async GetUsers(): Promise<any> {
    
    try {
      const users = await this.repository.GetUsers();
      return FormateData({status: true, data: users });
    } catch (error) {
        throw new ErrorResponse(error.message, 400)
    }
  }

  async GetUserById(userId: string): Promise<any> {
    
    try {
      const user = await this.repository.GetUserById(userId);
      return FormateData({status: true, data: user });
    } catch (error) {
        throw new ErrorResponse(error.message, 400)
    }
  }

  async UpdateUser(updateData: UserUpdate): Promise<any> {
    
    try {
      const updateStatus = await this.repository.UpdateUser(updateData);
      return FormateData({status: true, data: updateStatus });
    } catch (error) {
        throw new ErrorResponse(error.message, 400)
    }
  }

  async DeleteUser(_id: string): Promise<any> {
    
    try {
      const data = await this.repository.DeleteUser(_id);
      return FormateData(data);
    } catch (error) {
      throw new ErrorResponse(error.message, 400)
    }
  }
}


export default UserService;