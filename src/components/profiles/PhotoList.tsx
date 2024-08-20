import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from '../../app/store';
import PhotoGrid from './PhotoGrid';
import { UserType } from '../../interfaces/Users';
import { PostParams } from '../../interfaces/Posts';
import { getUserById } from '../../features/userSlice';





const PhotoList: React.FC = () => {
  const { userId } = useParams();
  const user: UserType | undefined = useSelector((state: AppState) =>
    getUserById(state, Number(userId))
  );
  const [posts, setPosts] = useState<PostParams[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/sample-data.json");
        const data: PostParams[] = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, []);

  const filteredPosts = posts.filter((post) => post.profileName === user?.name);

  return (
    <PhotoGrid
      photos={filteredPosts.map((post) => ({
        id: post.id,
        src: post.postImage,
      }))}
    />
  );
};

export default PhotoList;
