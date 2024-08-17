import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { PostParams } from "../interfaces/Posts";

const PostDetail: React.FC = () => {
  const [post, setPost] = useState<PostParams | null>(null);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const postId = queryParams.get("id");

    const fetchPost = async () => {
      try {
        // const response = await fetch(`/api/posts/${postId}`);
        // const data: PostParams = await response.json();
        const response = await fetch("/sample-data.json"); // Path to the static JSON file
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
  }, [location.search]);

  if (!post) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="mt-[70px] flex h-full flex-col items-center gap-6 overflow-y-auto">
        <div className="mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow-md">
          <div className="flex items-start p-6">
            <div className="mr-4 flex-shrink-0">
              <img
                src={post.profileImage}
                alt="Profile"
                className="h-[50px] w-[50px] rounded-full"
              />
            </div>
            <div>
              <div className="font-bold">{post.profileName}</div>
              <a
                href={post.profileLink}
                className="mt-1 text-sm text-gray-500 hover:underline"
              >
                @{post.profileName}
              </a>
            </div>
          </div>
          <div className="text-center">
            <p className="mb-2 ml-5 text-left text-lg font-semibold">
              {post.postContent}
            </p>
            <img
              src={post.postImage}
              alt="Post Content"
              className="h-[300px] w-full rounded-lg"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetail;
