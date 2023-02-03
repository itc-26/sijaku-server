import mongoose, { Schema, model, Document } from "mongoose";
import jwt from "jsonwebtoken";

export interface IUser extends Document {
    _id?: String 
    name : String,
    password: String,
    grade: "X_SIJA_1" | "X_SIJA_2" |  "XI_SIJA_1" | "XI_SIJA_2" | "XII_SIJA_1" | "XII_SIJA_2" | "XIII_SIJA_1" | "XIII_SIJA_2",
    username: String,
    detail: mongoose.Types.ObjectId,
    certificate: Schema.Types.ObjectId[],
    project: Schema.Types.ObjectId[],
    skill: Schema.Types.ObjectId[],
    privateMessage: Schema.Types.ObjectId[]
}

const UserSchema = new Schema<IUser>({
    name : {
        type : String,
        required : true,
        minLength : 3
    },
    password : {
        type : String,
        required : true,
    },
    grade : {
        type : String,
        required : true,
        enum : [
            "X_SIJA_1",
            "X_SIJA_2", 
            "XI_SIJA_1",
            "XI_SIJA_2",
            "XII_SIJA_1",
            "XII_SIJA_2",
            "XIII_SIJA_1",
            "XIII_SIJA_2"
        ]
    },
    username : {
        type : String,
        required : true,
        unique : true
    },
    detail : {
        type : Schema.Types.ObjectId,
        ref : "Detail"
    },
    certificate : [
        {
            type : Schema.Types.ObjectId,
            ref : "Cert"
        }
    ],
    project : [
        {
            type : Schema.Types.ObjectId,
            ref : "Project"
        }
    ],
    skill : [{
        type : Schema.Types.ObjectId,
        ref : "Skill"
    }],
    privateMessage: [
        {
            type: Schema.Types.ObjectId,
            ref : "PrivateMessage"
        }
    ]
})

UserSchema.methods = {
    createAccessToken : function (){
        try{
            const {_id} = this;
            const detailkutoken = jwt.sign({
                "uid" : _id
            },process.env.SECRET_AT!,{
                expiresIn : "2d"
            });

            return detailkutoken;

        }catch(e){
            return false
        }
    }
}

const UserModel = model<IUser>("User", UserSchema);

export default UserModel;