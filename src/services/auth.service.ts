import { UserLogin, UserRegister } from "../interfaces";
import { AuthRepository } from "../repositories";
import { ErrorResponse, FormateData } from "../utils";



// All Business logic will be here
class AuthService {
  repository: AuthRepository
  
  constructor() {
    this.repository = new AuthRepository()
  }

  async Register(newUser: UserRegister): Promise<any> {
    
    try {
      const {user, token} = await this.repository.RegisterUser(newUser);
      return FormateData({status: true, token });
    } catch (error) {
      throw new ErrorResponse(error.message, 400)
    }
  }

  async Login(loginData: UserLogin): Promise<any> {
    try {
      const token = await this.repository.LoginUser(loginData);
      return FormateData( {status: true, token: token} );
    } catch (error) {
      throw new ErrorResponse(error.message, 400)
    }
  }

  async ForgotPassword(email: string): Promise<any> {
    try {
      const data = await this.repository.ForgotPassword(email);
      return FormateData( {status: true, data: data} );
    } catch (error) {
      throw new ErrorResponse(error.message, 400)
    }
  }

  async ResetPassword(password:string, email: string): Promise<any> {
    try {
      const data = await this.repository.ResetPassword(password, email);
      return FormateData( {status: true, data: data} );
    } catch (error) {
      throw new ErrorResponse(error.message, 400)
    }
  }
}



export default AuthService;
