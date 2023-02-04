import jwt from "jsonwebtoken";
import errorHandler from "../utils/handler.utils";


import { NextFunction, Response } from "express";
import { IRequest } from "../interfaces/global.interface";
import CertModel, { ICertificate } from "../models/Cert.model";
import ProjectModel, { IProject } from "../models/Project.model";
import SkillModel, { ISkill } from "../models/Skill.model";
import DetailModel, { IDetailSchema } from "../models/Detail.model";
import { IPrivateMessage } from "../models/PrivateMessage.model";

export const authenticate = (req: IRequest, res: Response, next: NextFunction) => {
    try{

        const {authorization} = req.headers;
    
        if(authorization){
            const authToken = authorization.split(" ")[1];
            return jwt.verify(authToken, process.env.SECRET_AT, async function (err, decoded) {
                if(err){
                    switch(err.name){
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
                                message : "Wrong Token Format"
                            })
                        default:
                            console.log(err);
                            return res.status(501).json({
                                ok : true,
                                message : "internal error"
                            })
                    }
                }
    
                req.userCred = {
                    uid: decoded?.includes,
                    jwt: authToken
                }
    
                return next();
            })
            
            
        }
        return res.status(404).json({
            ok: false,
            message: "token not found"
        })
    }catch(e){
        const error = e as Error;
        return errorHandler(error, res)
    }
}

export const authorization = async (req: IRequest, res: Response, next: NextFunction) => {
    try{

        const {uid} = req.userCred;
        const postType = req.url.split("/")[2];
        const {postId} = req.params;
    
        if(postId && postType){
            let bucket: ICertificate | IProject | ISkill | IDetailSchema | IPrivateMessage | IDetailSchema | null;
    
            switch(postType){
                case "cert":
                    bucket = await CertModel.findOne({_id: postId})
                    break;
    
                case "project":
                    bucket = await ProjectModel.findOne({_id: postId});
                    break;
    
                case "skill":
                    bucket = await SkillModel.findOne({_id: postId});
                    break;
    
                case "creds":
                    bucket = await DetailModel.findOne({_id: postId});
                    break;
                
                default:
                    return res.status(400).json({
                        ok: false,
                        message: "false postType format"
                    })
            }
    
            if(bucket){
                if(bucket.belongsTo.toString() === uid){
                    req.bucket = bucket
                    return next();
                }
    
                return res.status(401).json({
                    ok: false,
                    message: "not authorized"
                })
            }
            throw({"name" : "DNF"})
        }

    } catch(e){

    }
}