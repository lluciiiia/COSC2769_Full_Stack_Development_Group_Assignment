import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { PostParams } from "../interfaces/Posts";
import CommentContainer from "../components/comments/CommentContainer";
import { getPostById } from "../controllers/posts";
import Post from "../components/post/Post";
import LoadingSpinner from "../assets/icons/Loading";

const PostDetail: React.FC = () => {
  const [post, setPost] = useState<PostParams | null>(null);
  const [loading, setLoading] = useState(true);
  const { userId, postId } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await getPostById(postId);
        if (post) setPost(post);
      } catch (error) {
        console.error("Error fetching post details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="mt-[120px] flex h-full items-center justify-center overflow-y-auto">
        <div className="mr-[300px] flex items-center justify-center gap-28">
          {post && (
            <>
              <Post
                _id={post._id}
                creatorId={post.creatorId}
                profileSection={post.profileSection}
                content={post.content}
                imageURL={post.imageURL}
                createdAt={post.createdAt}
                visibility={post.visibility}
                comments={post.comments}
                reactions={post.reactions}
                isDetail={true}
              />
              <CommentContainer
                initComments={post.comments}
                userId={userId}
                postId={post._id}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PostDetail;
