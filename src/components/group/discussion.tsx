import React, { useEffect, useState } from "react";
import { PostParams2 } from "../../interfaces/Posts";
import Post from "../post/Post";
import { AppState } from "../../app/store";
import { useSelector } from "react-redux";
import { ProfileSectionParams } from "../../interfaces/Posts";

export default function Discussion() {
  // const [posts, setPosts] = useState<PostParams[]>([]);
  const posts = useSelector((state: AppState) => state.posts.groupPost);
  console.log(posts);
  const postList = posts.map((p: PostParams2) => (
    <Post
      key={p._id}
      creatorId={p.creatorId?._id || ""}
      content={p.content}
      imageURL={p.imageURL}
      profileSection={{
        profileImage: p.creatorId?.profilePictureURL, // Correct field name
        profileName: p.creatorId?.name, // Correct field name
        postId: p._id,
      }}
      isDetail={p.isDetail}
      visibility={p.visibility}
    />
  ));
  

  console.log(JSON.stringify(posts) + "Gadfkakljslksdnadlk");
  // console.log(JSON.stringify(postList)+" hello post list");
  return (
    <div>
      <div className="flex h-screen">
        <div className="flex-1 overflow-y-auto">
          {posts.length > 0 ? (
            <div className="flex flex-col items-center gap-6">
              {postList.length > 0 ? postList : <h1>Loading...</h1>}
            </div>
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-center">No posts available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
