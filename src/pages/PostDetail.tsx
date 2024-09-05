import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { PostParams } from "../interfaces/Posts";
import CommentContainer from "../components/comments/CommentContainer";
import { getPostById } from "../controllers/posts";
import PostContainer from "../components/post/PostContainer";
import { useSelector } from "react-redux";
import { selectAuthState } from "../features/authSlice";
import { createReaction } from "../controllers/reactions";
import { selectGroupById } from "../features/groupSlice";
import { AppState } from "../app/store";
import AdminNavbar from "../components/AdminNavbar";

const PostDetail: React.FC = () => {
  const [post, setPost] = useState<PostParams | null>(null);
  const { postId } = useParams();
  const { id,isAdmin } = useSelector(selectAuthState);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await getPostById(postId);
        if (post) {
          setPost(post);
        } else {
          console.error("Post not found");
        }
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    fetchPost();
  }, [postId]);

  const handleReaction = async (reaction: string) => {
    if (post) {
      try {
        await createReaction(reaction);
        console.log(`Reaction ${reaction} saved for post ${post._id}`);
      } catch (error) {
        console.error("Error saving reaction:", error);
      }
    }
  };

  if (!post) return <p>Loading...</p>;
  const groupId = post.groupId || "";

  return (
    <>
      {isAdmin ? <AdminNavbar /> : <Navbar />}
      <div className="mt-[120px] flex h-full items-center justify-center overflow-y-auto">
        <div className="mr-[300px] flex items-center justify-center gap-28">
          {post && (
            <>
              <PostContainer
                _id={post._id}
                creatorId={post.creatorId}
                groupId={post.groupId || ""}
                profileSection={post.profileSection}
                content={post.content}
                images={post.images}
                createdAt={post.createdAt}
                visibility={post.visibility}
                comments={post.comments}
                reactions={post.reactions}
                isDetail={true}
                history={post.history}
                onReact={handleReaction} // Pass the onReact function
              />
              <CommentContainer
                initComments={post.comments}
                userId={id}
                postId={post._id}
                onReact={handleReaction} // Pass the onReact function
                groupId={groupId} 
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PostDetail;
