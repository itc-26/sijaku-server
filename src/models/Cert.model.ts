import { Schema, model, Document, Types } from "mongoose";

export interface ICertificate extends Document {
    belongsTo : Types.ObjectId,
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

const UserCert = model<ICertificate>("Certificate", CertSchema);

export default UserCert;
