import React, { useState } from "react";
import { updateComment } from "../../controllers/comments";

interface CommentEditorProps {
  commentId: string;
  initialContent: string;
  onSave: () => void;
  onCancel: () => void;
}

const CommentEditor: React.FC<CommentEditorProps> = ({
  commentId,
  initialContent,
  onSave,
  onCancel,
}) => {
  const [content, setContent] = useState(initialContent);

  const handleSave = async () => {
    try {
      if (commentId == undefined)
        alert("An error occurred while trying to update the comment.");

      const response = await updateComment({ id: commentId, content });
      if (!response) {
        alert("Failed to update the comment. Please try again.");
      } else {
        onSave();
      }
    } catch (error) {
      console.error("Error updating comment:", error);
      alert("An error occurred while trying to update the comment.");
    }
  };

  return (
    <div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full rounded-md border-gray-300 p-2 text-sm text-gray-800"
        rows={1}
        style={{ resize: "vertical" }} // Allow vertical resizing
        onInput={(e) => {
          e.currentTarget.style.height = "auto"; // Reset height
          e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`; // Adjust height based on content
        }}
      />
      <div className="mt-2 flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="rounded-md bg-gray-300 px-2 py-1 text-sm text-gray-700"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="rounded-md bg-[#FFC123] px-2 py-1 text-sm text-black"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CommentEditor;
