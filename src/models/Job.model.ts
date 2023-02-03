import { Schema, model, Document } from "mongoose";

export interface IJobVacancy extends Document {
    title : String,
    description : String,
    reqruiter : String,
    region : String,
    category : String,
    salary : {
        from : Number,
        to: Number
    },
    more: String
}

const JobVacancySchema = new Schema<IJobVacancy>({
    title : {
        type : String,
        required : [true,"title required"],
		maxLength : 40
    },
    description : {
        type : String,
        maxLength : [250, "must be less than 250"]
    },
    reqruiter : {
        type : String,
        required : [true,"Reqruiter required"],
		maxLength : [30,"must be less than 30"]
    },
    region : {
        type : String,
        required : [true,"Region required"],
		maxLength : [30,"must be less than 30"]
    },
    category : {
        type : String,
        required : [true,"Category required"],
		maxLength : [30,"must be less than 30"]
    },
    salary : {
        from : {
            type : Number,
            required : [true,"from required"]
        },
        to : {
            type : Number,
            required : [true,"to required"]
        }
    },
    more : {
        type : String,
        required : [true,"more required"]
    }
})


const JobVacancyModel = model<IJobVacancy>("Jobvacancy", JobVacancySchema);

export default JobVacancyModel;