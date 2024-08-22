import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { PostParams } from "../../interfaces/Posts.tsx";
import { AppDispatch, AppState } from "../../app/store";
import { UserType } from "../../interfaces/Users";
import { getUserById } from "../../features/userSlice";
import { useParams } from "react-router-dom";
import Post from "../Post/Post.tsx";
import { fetchPosts, getPostListById } from "../../features/postsSlice.ts";

const PostsList = () => {
  const { userId } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const posts = useSelector((state: AppState) => {
    return state.posts.posts;
  });

  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      dispatch(fetchPosts());
      firstRender.current = false;
    }
  }, []);

  const filteredPosts: PostParams[] = useSelector(
    (state: AppState): PostParams[] => {
      return getPostListById(state, Number(userId));
    },
  );

  console.log(filteredPosts);
  const postList = filteredPosts.map((p: PostParams) => (
    <Post key={p.id} {...p} />
  ));

  return (
    <div id="postList" className="space-y-6 pt-12">
      {postList.length > 0 ? postList : <h1>Loading...</h1>}
    </div>
  );

  // return (
  //   <>
  //     <div className="flex h-screen">
  //       <div className="mt-[64px] flex-1 overflow-y-auto">
  //         {filteredPosts.length > 0 ? (
  //           <div className="flex flex-col items-center gap-6">
  //             {filteredPosts.map((post) => (
  //               <Post
  //                 key={post.id}
  //                 id={post.id}
  //                 profileImage={post.profileImage}
  //                 profileName={post.profileName}
  //                 postContent={post.postContent}
  //                 postImage={post.postImage}
  //                 profileLink={post.profileLink}
  //                 isDetail={false}
  //               />
  //             ))}
  //           </div>
  //         ) : (
  //           <div className="flex h-full items-center justify-center">
  //             <p className="text-center">No posts available</p>
  //           </div>
  //         )}
  //       </div>
  //     </div>
  //   </>
  // );
};

export default PostsList;
