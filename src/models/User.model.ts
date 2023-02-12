import { Schema, model, Document, Types } from "mongoose";

export interface IUser extends Document {
    name: String,
    password: string,
    grade: "X_SIJA_1" | "X_SIJA_2" | "XI_SIJA_1" | "XI_SIJA_2" | "XII_SIJA_1" | "XII_SIJA_2" | "XIII_SIJA_1" | "XIII_SIJA_2"
    username: String,
    details : Types.ObjectId,
    certificates : Array<Types.ObjectId>,
    projects : Array<Types.ObjectId>
    skills : Array<Types.ObjectId>
    privateMessages : Array<Types.ObjectId>
}

const UserSchema = new Schema<IUser>({
    name:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    grade: {
        type: String,
        required: true,
        enum: [
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
    username: {
        type: String,
        required: true
    },
    details: {
        type : Schema.Types.ObjectId,
        ref: "Detail",
        required: true
    },
    certificates: [
        {
            type: Schema.Types.ObjectId,
            ref: "Certificate",
            required: true
        }
    ],
    projects : [
        {
            type: Schema.Types.ObjectId,
            ref: "Project",
            required: true
        }
    ],
    skills : [
        {
            type: Schema.Types.ObjectId,
            ref: "Skill",
            required: true
        }
    ],
    privateMessages : [
        {
            type: Schema.Types.ObjectId,
            ref : "PrivateMessage",
            required: true
        }
    ]
})


const User = model<IUser>("User", UserSchema);

export default User