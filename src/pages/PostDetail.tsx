import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { PostParams } from "../interfaces/Posts";
import Post from "../components/post/Post";
import CommentContainer from "../components/comments/CommentContainer";

const PostDetail: React.FC = () => {
  const [post, setPost] = useState<PostParams | null>(null);
  const location = useLocation();
  const { postId } = useParams();

  useEffect(() => {
    // const queryParams = new URLSearchParams(location.search);
    // const postId = queryParams.get("id");
    const fetchPost = async () => {
      try {
        // const response = await fetch(`/api/posts/${postId}`);
        // const data: PostParams = await response.json();
        // TODO: replace Sample data version
        const response = await fetch("/sample-data.json");
        const data: PostParams[] = await response.json();
        const foundPost = data.find((post) => post.id === postId);

        if (foundPost) {
          setPost(foundPost);
        } else {
          console.error("Post not found");
        }
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    fetchPost();
  }, []);

  if (!post) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="mt-[120px] flex h-full items-center justify-center overflow-y-auto">
        <div className="mr-[300px] flex items-center justify-center gap-28">
          <Post
            id={post.id}
            profileImage={post.profileImage}
            profileName={post.profileName}
            postContent={post.postContent}
            postImage={post.postImage}
            profileLink={post.profileLink}
            isDetail={true}
          />
          <CommentContainer postId={post.id} />
        </div>
      </div>
    </>
  );
};

export default PostDetail;
