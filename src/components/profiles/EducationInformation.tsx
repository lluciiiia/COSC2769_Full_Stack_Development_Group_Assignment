import educationIcon from "../../assets/icons/profileIcon/educationIcon.png";

import React from "react";

const EducationInformation = ({ user }) => {
  return (
    <div className="flex flex-col gap-8 p-4">
      <div className="p-4">
        <div className="mb-6 flex items-center">
          <img
            src={educationIcon}
            alt="Education Icon"
            className="mr-4 h-10 w-10"
          />
          <h3 className="text-3xl font-bold text-gray-800">Education</h3>
        </div>
        <div className="rounded-md border border-gray-300 bg-[#FFF2CA] p-4 shadow-inner">
          <div className="mb-4">
            <p className="text-xl font-semibold text-gray-900">
              {user?.education || "Unavailable"}
            </p>
            <p className="text-lg text-gray-700">
              {user?.degree || "Unavailable"}
            </p>
          </div>
          <div className="mb-4">
            <p className="text-lg text-gray-700">
              {user?.years || "Unavailable"}
            </p>
          </div>
          <div>
            <p className="text-base text-gray-600">
              {user?.educationDescription || "Unavailable"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationInformation;
