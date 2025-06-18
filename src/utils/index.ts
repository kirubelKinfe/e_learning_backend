export {default as ErrorResponse} from './error-response'
export {default as sendMail} from './sendEmail'

export const  FormateData = (data: any) => {
    if (data) {
      return { data };
    } else {
      throw new Error("Data Not found!");
    }
};