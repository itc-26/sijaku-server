import { Schema, model, Document, Types } from "mongoose";

export interface IProject extends Document {
    belongsTo: Types.ObjectId,
    name: String,
    description: String,
    link: String
}

const ProjectSchema = new Schema<IProject>({
    belongsTo : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    name : {
        type: String,
        required: true,
    },
    description: {
        type: String, 
        required: true
    },
    link: {
        type: String,
        required: true
    }
})


const Project = model<IProject>("Project", ProjectSchema);


export default Project;