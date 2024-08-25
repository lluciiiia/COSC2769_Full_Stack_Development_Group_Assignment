import exp from "constants";
import mongoose from "mongoose";


const groupSchema= new mongoose.Schema({
    groupAdmin :{type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true},
    name: {type: String, required: true},
    dataCreated: {type: Date, default:Date.now()},
    visibility: {type: String, required: true},
    members:[{type:mongoose.Schema.Types.ObjectId, ref:'User'}]
})

const Group = mongoose.model('Group');
export default Group;