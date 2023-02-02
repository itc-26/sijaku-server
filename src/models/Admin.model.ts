import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";

export interface Iadmin {
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
    createAccessToken : async function(){
        try{
            const {_id} = this;
            const detailkutoken = await jwt.sign({
                "uid" : _id
            },process.env.SECRET_AT,{
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