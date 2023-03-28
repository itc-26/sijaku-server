import errorHandler from "../utils/handler.utils";

import { IRequest } from "../interfaces/global.interface";

import { Request, Response } from "express";
import User from "../models/User.model";
import UserCert, { ICertificate } from "../models/Cert.model";
import Project, { IProject } from "../models/Project.model";
import UserSkill, { ISkill } from "../models/Skill.model";
import { Types, UpdateWriteOpResult } from "mongoose";

// =========================== POST ===================== //

export const post = async (req: Request, res: Response) => {
    try{

        const customReq = req as IRequest;
        const {uid} = customReq.userCred;
        const {type} = customReq.params;
        const user = customReq.user;

        let bucket: ICertificate | IProject | ISkill | null;
    
        switch(type){

            case "certificate":
                bucket  = new UserCert(customReq.body);
                user.certificates.push(bucket._id);
                break;

            case "project":
                bucket = new Project(customReq.body);
                user.projects.push(bucket._id);
                break;

            case "skill":
                bucket = new UserSkill(customReq.body);
                user.skills.push(bucket._id);
                break

            default:
                return res.status(403).json({
                    ok: false,
                    message: "invalid method"
                })
        }
        bucket.belongsTo = user._id;

        await bucket.save();
        await user.save();

        return res.status(200).json({
            ok: true,
            message : "successfully added",
            data : bucket
        })
    
        throw({"name" : "UNF"})
    }catch(e){
        return errorHandler(e as Error, res);
    }

}


// =========================== get ===================== //
export const me = async (req: Request, res: Response) => {
    try{
        const customReq = req as IRequest;
        const {uid} = customReq.userCred;
        const user = await User.findOne({_id : uid})
            .populate("skills")
            .populate("certificates")
            .populate("projects")
            .populate("details")
            .select({password : 0})
            .lean();

        if(user){
            return res.status(200).json({
                ok: true,
                data: user
            })
        }

        throw({"name" : "UNF"})

    }catch(e){
        return errorHandler(e as Error, res);
    }
}

export const get = async (req: Request, res: Response) => {
    try{
        const customReq = req as IRequest;
        const {uid} = customReq.userCred;
        const {type} = req.params;

        let bucket: ((IProject | ICertificate | ISkill) & {_id: Types.ObjectId; })[] = [];
        const filter = {belongsTo : uid}

        switch(type){

            case "certificate":
                bucket  = await UserCert.find(filter);
                break;

            case "project":
                bucket = await Project.find(filter);
                break;

            case "skill":
                bucket = await UserSkill.find(filter);
                break

            default:
                return res.status(403).json({
                    ok: false,
                    message: "invalid method"
                })
        }


        return res.status(200).json({
            ok: true,
            message : "data added",
            data : bucket
        })

    }catch(e){
        return errorHandler(e as Error, res);
    }
}

// =========================== edit ===================== //
export const edit = async (req: Request, res: Response) => {
    try{
        const customReq = req as IRequest;

        const {uid} = customReq.userCred;
        const {type, id} = req.params;
        const body = customReq.body;

        const filter = {
            belongsTo : uid,
            _id : id
        }

        const validator = {
            runValidators : true,
            new: true
        }

        let bucket: UpdateWriteOpResult;

        switch(type){
            case "certificate":
                bucket  = await UserCert.updateOne(filter, body, validator);
                break;

            case "project":
                bucket = await Project.updateOne(filter, body, validator);
                break;

            case "skill":
                bucket = await UserSkill.updateOne(filter, body, validator);
                break

            default:
                return res.status(403).json({
                    ok: false,
                    message: "invalid method"
                })
        }

        if(bucket.matchedCount > 0){
            return res.status(200).json({
                ok: true,
                message: "updated"
            })
        }

        throw({"name" : "DNF"})


    }catch(e){
        return errorHandler(e as Error, res);
    }
}

// =========================== delete ===================== //

export const del = async (req: Request, res: Response) => {
    try{
        const customReq = req as IRequest;

        const {uid} = customReq.userCred;
        const {type, id} = req.params;
        const user = customReq.user;

        const filter = {
            belongsTo : uid,
            _id : id
        }

        const validator = {
            runValidators : true,
            new: true
        }

        let bucket;

        switch(type){
            case "certificate":
                bucket  = await UserCert.deleteOne(filter, validator);
                user.certificates.filter(i => String(i._id) !== id);
                break;

            case "project":
                bucket = await Project.deleteOne(filter, validator);
                user.projects.filter(i => String(i._id) !== id);
                break;

            case "skill":
                bucket = await UserSkill.deleteOne(filter, validator);
                user.skills.filter(i => String(i._id) !== id);
                break

            default:
                return res.status(403).json({
                    ok: false,
                    message: "invalid method"
                })
        }


        if(bucket?.deletedCount){
            await user.save();

            return res.status(200).json({
                ok: true,
                message: "data deleted"
            })
        }

        throw({"name" : "DNF"})


    }catch(e){
        return errorHandler(e as Error, res);
    }
}