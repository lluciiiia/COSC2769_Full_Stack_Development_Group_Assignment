import React from "react";
import { CommentProps } from "../../interfaces/Comments.tsx";
import { formatRelativeTime } from "../../utils/formatRelativeTime.ts";

const CommentItem: React.FC<CommentProps> = ({ comment }) => (
  <div className="rounded-md bg-white p-2 shadow-sm">
    <div className="flex">
      <div className="mr-2 flex-shrink-0">
        <img
          src={comment.profileImage}
          alt="Profile"
          className="h-[30px] w-[30px] rounded-full"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center">
          <div className="mr-2 font-bold">{comment.profileName}</div>
          <a
            href={comment.profileLink}
            className="text-sm text-gray-500 hover:underline"
          >
            @{comment.profileName}
          </a>
          <p className="ml-auto text-sm text-gray-500">
            {formatRelativeTime(comment.createdAt)}
          </p>
        </div>
        <p>{comment.content}</p>
      </div>
    </div>
  </div>
);

export default CommentItem;
