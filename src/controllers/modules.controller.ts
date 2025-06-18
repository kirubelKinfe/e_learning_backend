import { ModuleService } from '../services';
import { ErrorResponse } from "../utils";
import { Request, Response, NextFunction } from "express";
import { validateModule, validateModuleUpdate } from '../validations';
import { ModuleInterface, ModuleUpdateInterface } from '../interfaces';

interface CustomRequest extends Request {
    body: ModuleInterface;
}

interface CustomUpdateRequest extends Request {
    body: ModuleUpdateInterface
    params: {
        moduleId: string
    }
}

const service = new ModuleService()

export const getModules = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const { data } = await service.GetModules();
        return res.json(data);
    } catch (error) {
       next(error) 
    }
}

export const addModule = async (req: CustomRequest, res: Response, next: NextFunction) => {
    
    try{
        await validateModule(req.body)
        const { data } = await service.AddModule(req.body);
        return res.json(data);
    } catch (error) {
        next(error)
    }
}

export const updateModule = async (req: CustomUpdateRequest, res: Response, next: NextFunction) => {
    try {
        await validateModuleUpdate(req.body)
        const { data } = await service.UpdateModule(req.body);
        return res.json(data);
    } catch (error) {
        next(error)
    }
}

export const deleteModule = async (req: CustomUpdateRequest, res: Response, next: NextFunction) => {
    const { moduleId } = req.params
    try{
        if(!moduleId) {
            throw new ErrorResponse("_id is required", 400)
        }
        const { data } = await service.DeleteModule(moduleId);
        return res.json(data);
    } catch (error) {
        next(error)
    }
}