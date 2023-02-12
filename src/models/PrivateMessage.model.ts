import { Schema, model, Document, Types } from "mongoose";

export interface IPrivateMessage extends Document {
    from: String,
    email: String,
    belongsTo: Types.ObjectId,
    message: String
}

const PrivateMessageSchema = new Schema<IPrivateMessage>({
    from: {
        required: [true, "from must be filled"],
        type: String,
        maxLength: 100
    },
    email: {
        required: [true, "from must be filled"],
        type: String,
        validate : /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    belongsTo : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    message : {
        required: [true, "message must be filled"],
        type: String,
        maxLength: 255
    }
})

const PrivateMessage = model<IPrivateMessage>("PrivateMessage", PrivateMessageSchema);


export default PrivateMessage;