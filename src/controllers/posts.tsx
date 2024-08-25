import { createAsyncThunk } from "@reduxjs/toolkit";
import { PostParams } from "../interfaces/Posts";

const BACKEND_URL = "http://localhost:8080";

export const getPosts = createAsyncThunk<PostParams[], string | undefined>(
  "posts/getPosts",
  async (userId) => {
    const response = await fetch(BACKEND_URL + `/api/posts/all/${userId}`, {
      method: "GET",
    });

    if (!response.ok) {
      console.error("Failed to fetch posts:", response.statusText);
      throw new Error("Failed to fetch posts");
    }

    const data: PostParams[] = await response.json();
    return data;
  },
);

export const getPostById = async (id: String | undefined) => {
  if (id == undefined) return;

  const response = await fetch(BACKEND_URL + `/api/posts/${id}`, {
    method: "GET",
  });

  console.log("response: " + JSON.stringify(response));

  if (!response.ok) {
    console.error("Failed to fetch posts:", response.statusText);
    throw new Error("Failed to fetch posts");
  }

  const data: PostParams = await response.json();
  return data;
};
