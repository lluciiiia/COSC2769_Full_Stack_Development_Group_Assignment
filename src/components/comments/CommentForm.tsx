import React from "react";
import { CommentFormProps } from "../../interfaces/Comments";

const CommentForm: React.FC<CommentFormProps> = ({
  newComment,
  onCommentChange,
  onSubmit,
}) => (
  <form onSubmit={onSubmit} className="mt-10 flex flex-col items-center">
    <textarea
      value={newComment}
      onChange={onCommentChange}
      placeholder="Add a comment..."
      className="w-full rounded-md border border-gray-300 p-2"
      rows={4}
    />
    <button
      type="submit"
      className="mt-2 rounded-md bg-[#FFC123] px-4 py-2 text-white"
    >
      Post Comment
    </button>
  </form>
);

export default CommentForm;
