import React, { useEffect, useRef, useState, useCallback } from "react";
import { PostParams } from "../../interfaces/Posts";
import { AppDispatch, AppState } from "../../app/store";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../../controllers/posts";
import PostContainer from "./PostContainer";
import LoadingSpinner from "../../assets/icons/Loading";
import { selectAuthState } from "../../features/authSlice";

function PostList() {
  const { id } = useSelector(selectAuthState);
  const dispatch: AppDispatch = useDispatch();
  const initialLoadRef = useRef(false);
  const pageLimit = 20;
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const posts = useSelector((state: AppState) => state.posts.posts);
  const containerRef = useRef<HTMLDivElement | null>(null); // Ref for the container

  const lastPostElementRef = useCallback(
    (node) => {
      if (loading || !hasMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          // Only set page if not loading to avoid triggering multiple times
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore],
  );

  // Initial load effect
  useEffect(() => {
    if (initialLoadRef.current) return; // Prevent re-running the initial load
    initialLoadRef.current = true; // Mark initial load as run

    console.log("Initial load effect");
    setLoading(true);
    dispatch(getPosts({ limit: pageLimit, offset: 0 }))
      .unwrap()
      .then((fetchedPosts) => {
        console.log(`Fetched posts on initial load: ${fetchedPosts.length}`);
        if (fetchedPosts.length < pageLimit) {
          setHasMore(false);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  // Subsequent page loads effect
  useEffect(() => {
    if (page === 0) return;

    console.log("NON-initial load effect");
    console.log(`Fetching posts with offset: ${page * pageLimit}`);

    setLoading(true);
    dispatch(getPosts({ limit: pageLimit, offset: page * pageLimit }))
      .unwrap()
      .then((fetchedPosts) => {
        console.log(`Fetched posts on page load: ${fetchedPosts.length}`);
        // Check if there are less than pageLimit posts, which indicates no more posts to load
        if (fetchedPosts.length < pageLimit) {
          setHasMore(false);
        }
        // Append the new posts to the existing posts in the Redux state
        if (fetchedPosts.length > 0) {
          dispatch({ type: "posts/appendPosts", payload: fetchedPosts });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page, dispatch]);

  return (
    <div ref={containerRef} id="postList" className="space-y-6 pt-20">
      {loading && page === 0 ? (
        <div className="flex h-[600px] items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : posts.length > 0 ? (
        posts.map((p: PostParams, index: number) => {
          if (posts.length === index + 1) {
            return (
              <div ref={lastPostElementRef} key={`${p._id}-${index}`}>
                <PostContainer {...p} />
              </div>
            );
          } else {
            return <PostContainer key={`${p._id}-${index}`} {...p} />;
          }
        })
      ) : (
        <div className="flex h-[600px] items-center justify-center">
          <h1 className="text-gray-500">No posts available</h1>
        </div>
      )}
      {loading && page > 0 && (
        <div className="flex h-[100px] items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}

export default PostList;
