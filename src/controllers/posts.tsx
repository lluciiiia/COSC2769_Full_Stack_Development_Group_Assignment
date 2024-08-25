import { PostParams } from "../interfaces/Posts";

export const getPosts = async () => {
  const response = await fetch("http://localhost:8080/api/posts", {
    method: "GET",
  });

  if (!response.ok) {
    console.error("Failed to fetch posts:", response.statusText);
    throw new Error("Failed to fetch posts");
  }

  const data: PostParams[] = await response.json();
  return data;
};

export const getPostById = async (id: String | undefined) => {
  if (id == undefined) return;

  const response = await fetch(`http://localhost:8080/api/posts/${id}`, {
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
