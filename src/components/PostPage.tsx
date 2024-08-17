import  Post  from "./Post.tsx";

const postsData = [
    {
        profileImage: "profile1.jpg",
        profileName: "User1",
        postContent: "This is the first post",
        postImage: "post1.jpg",
        profileLink: "/user1"
    },
    {
        profileImage: "profile2.jpg",
        profileName: "User2",
        postContent: "This is the second post",
        postImage: "post2.jpg",
        profileLink: "/user2"
    },
    // Add more posts as needed
];

const PostsPage: React.FC = () => {
    return (
        <div className="max-w-md mx-auto h-screen overflow-y-auto bg-gray-100 p-4">
            {postsData.map((post, index) => (
                <Post
                    key={index}
                    profileImage={post.profileImage}
                    profileName={post.profileName}
                    postContent={post.postContent}
                    postImage={post.postImage}
                    profileLink={post.profileLink}
                />
            ))}
        </div>
    );
};

export default PostsPage;