import mongoose, { Schema, model, Document } from "mongoose";

export interface ISkill extends Document{
    belongsTo : mongoose.Types.ObjectId,
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

const SkillModel = model<ISkill>("Skill", SkillSchema);

export default SkillModel