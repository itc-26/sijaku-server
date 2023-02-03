import mongoose, { Schema, model, Document } from "mongoose";

export interface ICertificate extends Document {
    belongsTo : mongoose.Types.ObjectId,
    title: String,
    organizer : String,
    certID : String,
    certLink: String
}

const CertSchema = new Schema<ICertificate>({
    belongsTo : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    title : {
        type : String,
        required : true,
        maxLength : 150
    },
    organizer : {
        type : String,
        required : true,
        maxLength : 150
    },
    certID : {
        type : String,
        required : true,
    },
    certLink : {
        type : String
    }
})

const CertModel = model<ICertificate>("Cert", CertSchema);

export default CertModel