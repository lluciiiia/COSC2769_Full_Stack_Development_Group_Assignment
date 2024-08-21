import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PostParams } from "../../interfaces/Posts.tsx";
import { AppState } from "../../app/store";
import { UserType } from "../../interfaces/Users";
import { getUserById } from "../../features/userSlice";
import { useParams } from "react-router-dom";
import Post from "../Post/Post.tsx";

const PostsList = () => {
  const { userId } = useParams();
  const user: UserType | undefined = useSelector((state: AppState) =>
    getUserById(state, Number(userId)),
  );
  const [posts, setPosts] = useState<PostParams[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/sample-data.json");
        const data: PostParams[] = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, []);

  const filteredPosts = posts.filter((post) => post.profileName === user?.name);

  return (
    <>
      <div className="flex h-screen">
        <div className="mt-[64px] flex-1 overflow-y-auto">
          {filteredPosts.length > 0 ? (
            <div className="flex flex-col items-center gap-6">
              {filteredPosts.map((post) => (
                <Post
                  key={post.id}
                  id={post.id}
                  profileImage={post.profileImage}
                  profileName={post.profileName}
                  postContent={post.postContent}
                  postImage={post.postImage}
                  profileLink={post.profileLink}
                  isDetail={false}
                />
              ))}
            </div>
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-center">No posts available</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PostsList;
