import { ResourceService } from "../services";
import {ErrorResponse} from "../utils";
import { Request, Response, NextFunction } from "express";
import { validateResource, validateUpdateResource } from "../validations";
import { ResourceInterface, ResourceUpdateInterface } from "../interfaces";

interface CustomRequest extends Request {
    body: ResourceInterface;
}

interface CustomUpdateRequest extends Request {
    body: ResourceUpdateInterface;
    params: {
        resourceId: string
    }
}

const service = new ResourceService()

export const getResources = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const { data } = await service.GetResources();
        return res.json(data);
    } catch (error) {
        next(error)
    }
}

export const addResource = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        await validateResource(req.body)
        const { data } = await service.AddResource(req.body);
        return res.json(data);  
    } catch (error) {
        next(error)
    }
}

export const updateResource = async (req: CustomUpdateRequest, res: Response, next: NextFunction) => {
    try {
        await validateUpdateResource(req.body)
        const { data } = await service.UpdateResource(req.body);
        return res.json(data);  
    } catch (error) {
        next(error)
    }
}


export const deleteResource = async (req: CustomUpdateRequest, res: Response, next: NextFunction) => {
    const { resourceId } = req.params

    try {
        if(!resourceId) {
            throw new ErrorResponse("resourceId is required", 400)
        }
        const { data } = await service.DeleteResource(resourceId);
        return res.json(data);
    } catch (error) {
        next(error)
    }
}

