import React, { useRef, useEffect } from 'react';
import { PostParams } from "../../interfaces/Posts";
import { AppDispatch, AppState } from "../../app/store";
import Post from './Post';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../../features/postsSlice';

function PostList() {
  const dispatch: AppDispatch = useDispatch();
  const posts = useSelector((state: AppState) => {
    return state.posts.posts;
  });
  
  const postList = posts.map((p: PostParams) => <Post key={p.id} {...p} />);
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      dispatch(fetchPosts());
      firstRender.current = false;
    }
  }, []);
  return (
    <div id="postList" className="space-y-6">
      {posts.length > 0 ? postList : <h1>Loading...</h1>}
    </div>
  );
}


export default PostList;
