import React from "react";

const About: React.FC = () => {
  return (
    <div className="mx-auto flex max-w-3xl rounded-lg bg-yellow-50 p-6">

      <div className="flex-shrink-0 rounded-l-lg border-r border-gray-300 px-4 py-2 font-semibold text-yellow-900">
        Overview
      </div>

      <div className="ml-4 text-gray-800">
        <p>
          The group was created exclusively for RMIT students. Activities
          include:
        </p>
        <ul className="mt-2 space-y-1">
          <li>- Study (Class Change, Group Assignment, Tutor Bio, etc.)</li>
          <li>- Accommodation</li>
          <li>- Trade</li>
          <li>- Lost and Found</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
