import errorHandler from "../utils/handler.utils";

import { Request, Response } from "express"
import UserModel, { IUser } from "../models/User.model";
import { IPublicDataAll } from "../interfaces/global.interface";
import JobVacancyModel from "../models/Job.model";
import MemoModel, { IMemo } from "../models/memo.model";
import PrivateMessageModel, {IPrivateMessage} from "../models/PrivateMessage.model";

export const allData = async (req: Request, res: Response) => {
    try{
        
        const aggregation = {
            $group: {
                _id : `$grade`,
                count : {$sum : 1}
            }
        }

        const data: IPublicDataAll[] = await UserModel.aggregate([aggregation]);
        const finalData: Record<string, any> = {}

        data.forEach((v) => {
            finalData[v._id] = Object.assign(v, {
                grade: v._id.replaceAll("_", " "), 
                link: `${req.baseUrl}/grade/${v._id}`
            })
        })
        
        return res.status(200).json({
            ok : true,
            data: finalData
        })

    }catch(e){
        const error = e as Error;
        return errorHandler(error, res);
    }
}

export const gradeBased = async (req: Request, res: Response) => {
    try{
        
        const grade = req.params.grade as String;
        const aggregation = [
            {
                $match : {
                    grade : grade
                }
            },
            {
                $unset: "password"
            }
        ]
        const data: Array<Omit<IUser ,"password">> = await UserModel.aggregate(aggregation)

        if(data.length > 0){
            return res.status(200).json({
                ok: true,
                data: {
                    grade : grade.replaceAll("_"," "),
                    students: data.map((v) => {
                        return {
                            ...v,
                            link: `${req.baseUrl}/user/${v.username}`
                        }
                    })
                }
            })
        }

        throw({name: "DNF"})


    }catch(e){
        const error = e as Error;
        return errorHandler(error, res);
    }
}

export const usernnameBased = async (req: Request, res: Response) => {
    try{
        const {username} = req.params;
        const aggregation = [
            {
                $match : {
                    username : username
                }
            },
            {
                $unset: "password"
            }
        ]
        const data = await UserModel.aggregate(aggregation)

        if(data.length > 0){
            return res.status(200).json({
                ok: true,
                data: data[0]
            })
        }
    }catch(e){
        const error = e as Error;
        return errorHandler(error, res);
    }
}

export const jobData = async (req: Request, res: Response) => {
    try{
        const data = await JobVacancyModel.find();

        return res.status(200).json({
            ok : true,
            data: data
        })
    }catch(e){
        const error = e as Error;
        return errorHandler(error, res);
    }
}

export const memo = async (req: Request, res: Response) => {
    try{

        const data = await MemoModel.find();

        return res.status(200).json({
            ok: true,
            data: data
        })

    }catch(e){
        const error = e as Error;
        return errorHandler(error, res);
    }
}


// post

export const postMemo = async (req: Request, res: Response) => {
    try{
        const body: IMemo = req.body;

        const data = new MemoModel(body);
        
        await data.save()

        return res.status(200).json({
            ok : true,
            data : data
        })


    }catch(e){
        const error = e as Error;
        return errorHandler(error, res);
    }
}

export const privateMessage = async (req: Request, res: Response) => {
    try{
        
        const {userId} = req.params;
        const body: IPrivateMessage = req.body;
        const user = await UserModel.findOne({_id: userId});

        if(user){

            const message = new PrivateMessageModel({
                ...body,
                belongsTo: user._id
            });

            user.privateMessage.push(message._id);

            await message.save();
            await user.save();

            return res.status(200).json({
                ok : true,
                message: "Message Was Sent"
            })

        }

        throw({name: "UNF"});


    }catch(e){
        const error = e as Error;
        return errorHandler(error, res);
    }
}