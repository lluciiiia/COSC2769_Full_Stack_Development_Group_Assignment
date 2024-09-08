import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppState } from "../../../app/store";
import { selectGroupById } from "../../../features/groupSlice";

const About: React.FC = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const group = useSelector((state: AppState) =>
    selectGroupById(state, groupId ? groupId : ""),
  );

  const description = group?.description || "No description available.";

  return (
    <div className="mx-auto flex max-w-3xl rounded-lg bg-yellow-50 p-6">
      <div className="flex-shrink-0 rounded-l-lg border-r border-gray-300 px-4 py-2 font-semibold text-yellow-900">
        Overview
      </div>

      <div className="ml-4 flex-grow text-gray-800">
        <p>{description}</p>
      </div>
    </div>
  );
};

export default About;
