import { NextFunction, Request, Response } from "express";
import { GenerateCertificateService } from "../services";

interface CustomRequest extends Request {
    body: {
        courseId: string,
        userId: string
    };
  }

const service = new GenerateCertificateService()

export const generateCertificate = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const { data } = await service.GenerateCertificate(req.body);
        return res.json(data);
    } catch (error) {
        next(error)
    }
}