import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostParams } from "../../interfaces/Posts.tsx";
import { AppDispatch, AppState } from "../../app/store";
import { useParams } from "react-router-dom";
import Post from "../post/Post.tsx";
import { fetchPosts, getPostListById } from "../../features/postsSlice.ts";

const PostsList = () => {
  const { userId } = useParams();
  const dispatch: AppDispatch = useDispatch();
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

  const postList = filteredPosts.map((p: PostParams) => (
    <Post key={p.id} {...p} />
  ));

  return (
    <div id="postList" className="space-y-6 pt-12">
      {postList.length > 0 ? postList : <h1>Loading...</h1>}
    </div>
  );
};

export default PostsList;
