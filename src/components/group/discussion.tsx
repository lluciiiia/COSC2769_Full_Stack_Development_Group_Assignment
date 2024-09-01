import React, { useEffect } from "react";
import { GroupPostParams } from "../../interfaces/Posts";
import PostContainer from "../post/PostContainer";
import { AppState } from "../../app/store";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectAuthState } from "../../features/authSlice";
import { selectGroupById } from "../../features/groupSlice"; 

export default function Discussion() {
  const posts = useSelector((state: AppState) => state.posts.groupPost);
  const { groupId } = useParams<{ groupId: string }>(); 
  const { id } = useSelector(selectAuthState);
  
  const group = useSelector((state: AppState) =>
    selectGroupById(state, groupId)
  );

  const [canViewPosts, setCanViewPosts] = React.useState(false);

  useEffect(() => {
    if (group) {
      if (group.visibility === "Public") {
        // Public groups allow all users to view posts
        setCanViewPosts(true);
        console.log("This is public! You can see everything!!");
      } else if (group.visibility === "Private") {
        // Private groups require membership to view posts
        if (id && group.members.includes(id)) {
          setCanViewPosts(true);
          console.log("You're in the group, you can see the posts.");
        } else {
          setCanViewPosts(false);
          console.log("You're not in the group.");
        }
      }
    }
  }, [group, id]);

  const postList = posts.map((p: GroupPostParams) => (
    <PostContainer
      key={p._id}
      _id={p._id}
      creatorId={p.creatorId?._id || ""}
      groupId={p.groupId || ""}
      content={p.content}
      images={p.images || []}
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
      {canViewPosts ? (
        posts.length > 0 ? (
          <div className="flex h-screen">
            <div className="flex-1 overflow-y-auto">
              <div className="flex flex-col items-center gap-6">{postList}</div>
            </div>
          </div>
        ) : (
          <p className="mt-12 text-center">No posts available</p>
        )
      ) : (
        <p className="mt-12 text-center">
          You're not in the group :)) Please consider signing up.
        </p>
      )}
    </div>
  );
}
