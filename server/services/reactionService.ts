import Comment from "../models/comment";
import Reaction from "../models/reactions";

export const commentReaction = async (postId: string,userId: string ,reactionType: string )=>{
    try{

        const post = await Comment.findById(postId);
        const newReaction = new Reaction({
            userId: userId,
            reactionType: reactionType,
            createdAt: new Date(),
        })

        post?.reactions.push(newReaction.id);

        await post?.save();

        return {message:"Reaction addded successfully"}

    }catch(error){
        console.error("Error adding reaction", error);
        throw new Error("Failed to add react");
    }
}