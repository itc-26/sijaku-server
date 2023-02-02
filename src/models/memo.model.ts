import { Schema, model } from "mongoose";

export interface IMemo {
    sender: String,
    message: String
}

const MemoSchema = new Schema<IMemo>({
    sender : {
        type: String,
        default : "Anon",
        maxLength: 25
    },
    message: {
        type: String,
        maxLength: 255,
        required: [true, "message must be filled"]
    }
})

const MemoModel = model<IMemo>("memo", MemoSchema);

export default MemoModel;

