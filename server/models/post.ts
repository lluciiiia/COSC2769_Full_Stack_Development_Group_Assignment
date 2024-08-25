import mongoose  from "mongoose";

const postSchema = new mongoose.Schema({
    creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },  // Assuming posts belong to groups
    content: { type: String, required: true },
    imageURL: { type: String },
    dateCreated: { type: Date, default: Date.now },
    visibility: { type: String, enum: ['PUBLIC', 'FRIEND_ONLY', 'GROUP'], default: 'PUBLIC' },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comments' }] ,
    reactions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Reactions'}]
})

const Post= mongoose.model('Post',postSchema);

export default Post;