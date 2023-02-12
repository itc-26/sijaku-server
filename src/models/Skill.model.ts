import { Schema, model, Document, Types } from "mongoose";

export interface ISkill extends Document{
    belongsTo : Types.ObjectId,
    skillName: String,
    percentage :  Number
}

const SkillSchema = new Schema<ISkill>({
    belongsTo : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    skillName : {
        type : String,
        minLength : 2,
        maxLength : 100,
        required : true
    },
    percentage : {
        type : Number,
        min : 0,
        max : 100
    }
})

const UserSkill = model<ISkill>("Skill", SkillSchema);

export default UserSkill