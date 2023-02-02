import { Response } from "express";

const errorHandler = (error: Record<any, any>, res: Response)  => {

    const errorResponse = (code=501,name="Internal Error",message="internal error occured") => {
        return res.status(code).json({
            ok : false,
            name : name,
            message : message
        })
    }

    switch(error?.name){
        case "ValidationError":
            const validatorKeys = Object.keys(error.errors) || []
            let message = `${error?._message || "validation error"} in ${validatorKeys.join(",")}`

            return errorResponse(403,error.name, message);
        case "MongoServerError":
            switch(error.code){
                case 11000:
                    let keyValue = Object.keys(error.keyValue);
                    let message = `there ${keyValue.length > 1 ? "are" : "is"} duplicate in ${keyValue.join(",")}`

                    return errorResponse(403,error.name,message);
                default:

                    return errorResponse();
            }
        case "CastError":

            return errorResponse(403,error.name,"request not valid")

        case "UNF":
            return errorResponse(403,error.name,"user not found")

        case "DNF":
            return errorResponse(403,error.name,"Data not found")

        case "Error":
            switch(error.message){
                case "OIA":
                    return errorResponse(403,error.message, "Only Images are allowed");

                case "FTL":
                    return errorResponse(403,error.message,"File too Large")

                default:
                    return errorResponse();

            }
        case "TokenExpiredError" :
            return res.status(401).json({
                ok : false,
                failedLoginRelated : true,
                message : "Session expired"
            });
        case "JsonWebTokenError":
            return res.status(401).json({
                ok : false,
                failedLoginRelated : true,
                message : error.message
            })
        case "PVF":
            return errorResponse(403, "Password validation failed", "password should contain lowercase,uppercase,number, and symbol")
        case "MongooseError":
            return errorResponse(501, error.name, "connection failed due to wrong database uri")
        default:
            return errorResponse();
    }
}

export default errorHandler;