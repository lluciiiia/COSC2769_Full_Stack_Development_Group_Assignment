import React, { useEffect } from "react";
import { GroupPostParams } from "../../interfaces/Posts";
import PostContainer from "../post/PostContainer";
import { AppState } from "../../app/store";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { selectAuthState } from "../../features/authSlice";
import { selectGroupById } from "../../features/groupSlice";

export default function Discussion() {
  const posts = useSelector((state: AppState) => state.posts.groupPost);
  const { groupId } = useParams<{ groupId: string }>();
  const { id } = useSelector(selectAuthState);
  const location = useLocation();
  const group = useSelector((state: AppState) =>
    selectGroupById(state, groupId),
  );
  const isDiscussionTab = location.pathname.includes("discussion");
 
  const [canViewPosts, setCanViewPosts] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false); // State to check if the user is admin
  useEffect(() => {
  if (group) {
    let shouldSetCanViewPosts = false;
    let shouldSetIsAdmin = false;

    if (id === group.groupAdmin) {
      shouldSetIsAdmin = true;
      shouldSetCanViewPosts = true;
    } else if (group.visibility === "Public") {
      shouldSetCanViewPosts = true;
    } else if (group.visibility === "Private") {
      const memberIds = group.members.map((member) => member._id);
      if (id && memberIds.includes(id)) {
        shouldSetCanViewPosts = true;
      }
    }

    // Only set state if necessary to avoid infinite loops
    if (shouldSetIsAdmin !== isAdmin) {
      setIsAdmin(shouldSetIsAdmin);
    }

    if (shouldSetCanViewPosts !== canViewPosts) {
      setCanViewPosts(shouldSetCanViewPosts);
    }
  }
}, [group, id, isAdmin, canViewPosts]);


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
      isDiscussionTab = {isDiscussionTab}
    />
  ));

  return (
    <div>
      {canViewPosts ? (
        <>
          {isAdmin && (
            <div className="mt-12 text-center text-xl font-bold text-green-600">
              Welcome Admin
            </div>
          )}
          {posts.length > 0 ? (
            <div className="flex h-screen">
              <div className="flex-1 overflow-y-auto">
                <div className="flex flex-col items-center gap-6">
                  {postList}
                </div>
              </div>
            </div>
          ) : (
            <p className="mt-12 text-center">No posts available</p>
          )}
        </>
      ) : (
        <p className="mt-12 text-center">
          You're not in the group! Please consider signing up.
        </p>
      )}
    </div>
  );
}
