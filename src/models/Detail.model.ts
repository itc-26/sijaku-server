import mongoose, { Schema, model } from "mongoose";


export interface IDetailSchema { 
    belongsTo : mongoose.Types.ObjectId,
    description: String,
    instagram: String,
    linkedin: String,
    picture: String
    github: String,
    email: String
    web: String,
}

const DetailSchema = new Schema<IDetailSchema>({
    belongsTo : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true,
        unique : true,
    },
    description : {
        type : String,
        maxLength : 180,
    },
    instagram : {
        type : String,
        maxLength : 100,
    },
    linkedin : {
        type : String,
        maxLength : 100,
    },
    github : {
        type : String,
        maxLength : 100,
    },
    email : {
        type : String,
        maxLength : 100,
    },
    web : {
        type : String,
        maxLength : 100,
    },
    picture : {
        type : String
    }
})



const DetailModel = model<IDetailSchema>("Detail", DetailSchema);

export default DetailModel;