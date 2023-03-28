import { Request } from "express";
import { ICertificate } from "../models/Cert.model";
import { IDetailSchema } from "../models/Detail.model";
import { IPrivateMessage } from "../models/PrivateMessage.model";
import { IProject } from "../models/Project.model";
import { ISkill } from "../models/Skill.model";
import { IUser } from "../models/User.model";

export interface IUserLogin {
    username: String
    password: String
}

export interface IRequest extends Request {
    userCred: {
      uid: string,
      jwt: string
    },
    bucket: ICertificate | IProject | ISkill | IDetailSchema | IPrivateMessage | IDetailSchema | null,
    user: IUser
}

export interface IPublicDataAll {
    _id: string,
    count: number,
    link?: string
}