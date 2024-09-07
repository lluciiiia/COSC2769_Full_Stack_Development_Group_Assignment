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
import AdminNavbar from "../components/AdminNavbar";
import LoadingSpinner from "../assets/icons/Loading";

const PostDetail: React.FC = () => {
  const [post, setPost] = useState<PostParams | null>(null);
  const [loading, setLoading] = useState(true);
  const { postId } = useParams();
  const { id, isAdmin } = useSelector(selectAuthState);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const fetchedPost = await getPostById(postId);
        if (fetchedPost) {
          setPost(fetchedPost);
        } else {
          console.error("Post not found");
        }
      } catch (error) {
        console.error("Error fetching post details:", error);
      } finally {
        setLoading(false);
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

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner /> {/* Display loading spinner */}
      </div>
    );
  }

  if (!post) return <p>Post not found.</p>;

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
                onReact={handleReaction}
              />
              <CommentContainer
                initComments={post.comments}
                userId={id}
                postId={post._id}
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
