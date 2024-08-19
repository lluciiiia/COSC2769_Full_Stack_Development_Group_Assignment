import { useEffect,useState } from 'react';
import { PostParams } from '../../interfaces/Posts';
import Post from '../Post/Post';
export default function Discusstion() {
    const [posts, setPosts] = useState<PostParams[]>([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            // const response = await fetch("/api/posts");
            // const data = await response.json();
            // TODO: replace Sample data version
            const response = await fetch("/sample-data.json");
            const data: PostParams[] = await response.json();
            setPosts(data);
          } catch (error) {
            console.error("Error fetching posts:", error);
          }
        };
    
        fetchData();
      }, []);
  return (
    <div>
     <div className="flex h-screen">
        <div className=" flex-1 overflow-y-auto">
          {posts.length > 0 ? (
            <div className="flex flex-col items-center gap-6">
              {posts.map((post) => (
                <Post
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
    </div>
  )
}
