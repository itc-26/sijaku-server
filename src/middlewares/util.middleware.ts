import { NextFunction, Request, Response } from "express";

export const strictBelongsTo = (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    if(body.hasOwnProperty("belongsTo")){
        return res.status(403).json({
            ok: false,
            message: "illegal activity"
        })
    }

    return next()
}