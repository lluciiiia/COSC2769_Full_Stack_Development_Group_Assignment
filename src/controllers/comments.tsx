import { BACKEND_URL } from "./posts";

export const createComment = async (comment: any) => {
  return await fetch(BACKEND_URL + `/api/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });
};
