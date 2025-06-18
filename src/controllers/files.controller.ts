
import { NextFunction, Request, Response } from "express";
import { FilesService } from "../services";

interface CustomRequest extends Request {
    body: {
        public_id: string
    }
}


const service = new FilesService()

export const deleteFile = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { public_id } = req.body
    console.log(public_id)
    try {
        const { data } = await service.DeleteFile(public_id);
        return res.json(data);
    } catch (error) {
        next(error)
    }
}