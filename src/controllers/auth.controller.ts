import bcrypt from "bcrypt";
import errorHandler from "../utils/handler.utils";
import jwt from "jsonwebtoken";

import {Request, Response} from "express";
import {IUserLogin} from "../interfaces/global.interface";
import {Iadmin} from "../models/Admin.model";
import {IUser} from "../models/User.model";

import AdminModel from "../models/Admin.model";
import UserModel from "../models/User.model";

export const login = async (req: Request, res: Response) => {
    try{
        const body: IUserLogin = req.body;
        const {username, password} = body;

        const adminOrUser = req.path.split("/")[1]

        let person: IUser | Iadmin | null = null;

        switch(adminOrUser){
            case "user":
                person = await UserModel.findOne({
                    username : username
                })
                break;

            case "admin":
                person = await AdminModel.findOne({
                    username: username
                })
                break
        }
        
        if(person){
            const isMatch = await bcrypt.compare(password as string, person.password as string)
            if(isMatch){
                const sijakuToken = jwt.sign({
                    "uid" : person._id
                }, process.env.SECRET_AT!, {
                    expiresIn: "2d"
                })

                return res.status(200).json({
                    ok: true,
                    data: {
                        token : sijakuToken,
                    }
                })
            }
            return res.status(403).json({
                ok : false,
                message: "wrong password"
            })
        } 
        
        throw({name: "UNF"})

    }catch(e){
        const error = e as Error;
        return errorHandler(error, res);
    }
}