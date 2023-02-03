import { Schema, model, Document } from "mongoose";
import jwt from "jsonwebtoken";

export interface Iadmin extends Document{
    username : String,
    password: String
}

const AdminSchema = new Schema<Iadmin>({
    username : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    }
})

AdminSchema.methods = {
    createAccessToken : function(){
        try{
            const {_id} = this;
            const detailkutoken = jwt.sign({
                "uid" : _id
            },process.env.SECRET_AT!,{
                expiresIn : "1d"
            });

            return detailkutoken;
        }catch(e){
            return false
        }
    }
}

const AdminModel = model<Iadmin>("Admin", AdminSchema);

export default AdminModel;