
import { GenerateCertificateRepository } from "../repositories";
import { ErrorResponse, FormateData } from "../utils";


// All Business logic will be here
class GenerateCertificateService {
  repository: GenerateCertificateRepository
  
  constructor() {
    this.repository = new GenerateCertificateRepository()
  }

  async GenerateCertificate(certificateData: { courseId: string, userId: string }): Promise<any> {
    
    try {
      const data = await this.repository.GenerateCertificate(certificateData);
      return FormateData({status: true, data: data });
    } catch (error) {
        throw new ErrorResponse(error.message, 400)
    }
  }
}
export default GenerateCertificateService