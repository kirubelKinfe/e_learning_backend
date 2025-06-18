import { Request, Response, NextFunction } from "express";

interface CustomResponse extends Response {
  results : {
    total: number,
    pagination: {
      next?: {
        page: number,
        limit: number,
      }
      prev?: {
        page: number,
        limit: number,
      }
    },
    results: number,
    status: string,
    message: string,
    data: any,
  };
}


export const advancedResults = (model: any, populate?: any) => {
  return async (req: Request, res: CustomResponse, next: NextFunction) => {
    let ModelsQuery = model.find();
    //convert query strings to number
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 2;
    const skip = (page - 1) * limit;
    const total = await model.countDocuments();
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    //populate
    if (populate) {
      ModelsQuery = ModelsQuery.populate(populate);
    }

    //Filtering/searching

    if (req.query.name) {
      ModelsQuery = ModelsQuery.find({
        name: { $regex: req.query.name, $options: "i" },
      });
    }

    //pagination results
    let pagination = {};
    //add next
    if (endIndex < total) {
      pagination = {
        ...pagination,
        next : {
          page: page + 1,
          limit,
        }
      };
    }

    //add prev
    if (startIndex > 0) {
      pagination = {
        ...pagination,
        prev : {
          page: page - 1,
          limit,
        }
      };
    }

    // //Execute query
    const retults = await ModelsQuery.find().skip(skip).limit(limit);

    res.results = {
      total,
      pagination,
      results: retults.length,
      status: "success",
      message: "Data fetched successfully",
      data: retults,
    };

    next();
  };
};


