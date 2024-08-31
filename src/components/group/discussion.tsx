import React from "react";
import { GroupPostParams } from "../../interfaces/Posts";
import PostContainer from "../post/PostContainer";
import { AppState } from "../../app/store";
import { useSelector } from "react-redux";

export default function Discussion() {
  const posts = useSelector((state: AppState) => state.posts.groupPost);

  const postList = posts.map((p: GroupPostParams) => (
    <PostContainer
      _id={p._id}
      creatorId={p.creatorId?._id || ""}
      content={p.content}
      imageURL={p.imageURL}
      profileSection={{
        profileImage: p.creatorId?.profilePictureURL,
        profileName: p.creatorId?.name,
      }}
      isDetail={p.isDetail}
      visibility={p.visibility}
      createdAt={p.createdAt}
      comments={p.comments}
      history={p.history}
    />
  ));

  return (
    <div>
      {posts.length > 0 ? (
        <div className="flex h-screen">
          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col items-center gap-6">{postList}</div>
          </div>
        </div>
      ) : (
        <p className="mt-12 text-center">No posts available</p>
      )}
    </div>
  );
}
