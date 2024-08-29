import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { PostParams } from "../interfaces/Posts";
import CommentContainer from "../components/comments/CommentContainer";
import { getPostById } from "../controllers/posts";
import Post from "../components/post/Post";
import {  useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { fetchSess } from "../features/authSlice";
const PostDetail: React.FC = () => {
  const [post, setPost] = useState<PostParams | null>(null);
  const { userId, postId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  // const {  isAuthenticated } = useSelector(selectAuthState);
  useEffect(() => {
    // Fetch the session data when the component mounts
    const fetchSessionAndPost = async () => {
      try {
        await dispatch(fetchSess());

        if ( postId) {
          const post = await getPostById(postId);
          if (post) {
            setPost(post);
          } else {
            console.error("Post not found");
          }
        } else {
          console.error("User not authenticated");
        }
      } catch (error) {
        console.error("Error fetching session or post details:", error);
      }
    };

    fetchSessionAndPost();
  }, [dispatch, postId]);
  if (!post) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="mt-[120px] flex h-full items-center justify-center overflow-y-auto">
        <div className="mr-[300px] flex items-center justify-center gap-28">
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
        </div>
      </div>
    </>
  );
};

export default PostDetail;
