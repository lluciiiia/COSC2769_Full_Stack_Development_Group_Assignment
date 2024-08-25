import mongoose from "mongoose";

const notificationSchema= new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, ref: 'User',required: true},
    message:{type: String, required: true},
    type:{type: String, required: true},
    dataCreated: {type: Date, default: Date.now},
    isSeen: {type: Boolean, required: true}
})

export default notificationSchema;