import { LectureRepository } from "../repositories";
import { ErrorResponse, FormateData } from "../utils";
import { LectureInterface, LectureUpdateInterface, VideoLectureUploadInterface } from "../interfaces";


// All Business logic will be here
class LectureService {
  repository: LectureRepository
  
  constructor() {
    this.repository = new LectureRepository()
  }

  async GetLectures(): Promise<any> {
    
    try {
      const lectures = await this.repository.GetLectures();
      return FormateData({status: true, data: lectures });
    } catch (error) {
        throw new ErrorResponse(error.message, 400)
    }
  }

  async GetLectureWithId(lectureId: string): Promise<any> {
    
    try {
      const lectures = await this.repository.GetLectureWithId(lectureId);
      return FormateData({status: true, data: lectures });
    } catch (error) {
        throw new ErrorResponse(error.message, 400)
    }
  }

  async AddLecture(newLecture: LectureInterface): Promise<any> {
    
    try {
      const lecutre = await this.repository.AddLecture(newLecture);
      return FormateData({status: true, data: lecutre });
    } catch (error) {
        throw new ErrorResponse(error.message, 400)
    }
  }

  async UploadVideoLecture(lectureInfo: VideoLectureUploadInterface): Promise<any> {
    
    try {
      const updateStatus = await this.repository.UploadVideoLecture(lectureInfo);
      return FormateData({status: true, data: updateStatus });
    } catch (error) {
        throw new ErrorResponse(error.message, 400)
    }
  }
  async UpdateLecture(lectureInfo: LectureUpdateInterface): Promise<any> {
    
    try {
      const updateStatus = await this.repository.UpdateLecture(lectureInfo);
      return FormateData({status: true, data: updateStatus });
    } catch (error) {
        throw new ErrorResponse(error.message, 400)
    }
  }

  async DeleteLecture(_id: string): Promise<any> {
    
    try {
      const data = await this.repository.DeleteLecture(_id);
      return FormateData(data);
    } catch (error) {
      throw new ErrorResponse(error.message, 400)
    }
  }
}


export default LectureService;