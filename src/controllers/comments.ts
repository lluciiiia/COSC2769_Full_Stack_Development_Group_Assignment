export const createComment = async (comment: any) => {
  return await fetch(import.meta.env.VITE_BACKEND_URL + `/api/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });
};

export const updateComment = async (updatedComment: {
  id: string;
  content: string;
}) => {
  const response = await fetch(
    import.meta.env.VITE_BACKEND_URL + `/api/comments`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedComment),
      credentials: "include",
    },
  );

  return response.ok
    ? true
    : (console.error("Failed to update the comment", response.statusText),
      false);
};

export const deleteCommentById = async (id: String | undefined) => {
  if (id == undefined) return false;

  const response = await fetch(
    import.meta.env.VITE_BACKEND_URL + `/api/comments/${id}`,
    {
      method: "DELETE",
    },
  );

  return response.ok
    ? true
    : (console.error("Failed to delete the comment", response.statusText),
      false);
};
