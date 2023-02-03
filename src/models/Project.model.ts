import mongoose, { Schema, model, Document } from "mongoose";

export interface IProject extends Document{
    belongsTo: mongoose.Types.ObjectId,
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
        type : String,
        required : true,
        maxLength : 40
    },
    description : {
        type : String,
        required : true,
        maxLength: 255
    },
    link : {
        type : String,
        required : true,
    }
})

const ProjectModel = model<IProject>("Project", ProjectSchema);

export default ProjectModel;