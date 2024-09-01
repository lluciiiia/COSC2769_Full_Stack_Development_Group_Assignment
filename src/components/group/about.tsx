import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppState } from "../../app/store";
import { selectGroupById } from "../../features/groupSlice";

const About: React.FC = () => {
  // Use useParams to get groupId from the URL
  const { groupId } = useParams<{ groupId: string }>();

  // Fetch the group from the Redux store
  const group = useSelector((state: AppState) =>
    selectGroupById(state, groupId)
  );

  // Check if the group exists and fetch its description
  const description = group?.description || "No description available.";

  return (
    <div className="mx-auto flex max-w-3xl rounded-lg bg-yellow-50 p-6">
      <div className="flex-shrink-0 rounded-l-lg border-r border-gray-300 px-4 py-2 font-semibold text-yellow-900">
        Overview
      </div>

      <div className="ml-4 text-gray-800">
        <p>{description}</p>
        
      </div>
    </div>
  );
};

export default About;
