import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppState } from "../../app/store";
import { UserType } from "../../interfaces/Users";
import { getUserById } from "../../features/userSlice";
import phoneIcon from "../../assets/icons/profileIcon/phoneIcon.png";
import homeUserIcon from "../../assets/icons/profileIcon/homeUserIcon.png";
import React from "react";

const ContactInformation = () => {
  const { userId } = useParams();
  const user: UserType | undefined = useSelector((state: AppState) =>
    getUserById(state, Number(userId)),
  );

  return (
    <div className="flex flex-col gap-8 p-4">
      {/* Contact Information */}
      <div className="p-4">
        <div className="mb-6 flex items-center">
          <img src={phoneIcon} alt="Phone Icon" className="mr-4 h-10 w-10" />
          <h3 className="text-3xl font-bold text-gray-800">
            Contact Information
          </h3>
        </div>
        <div className="rounded-md border border-gray-300 bg-[#FFF2CA] p-4 shadow-inner">
          <div className="mb-4">
            <p className="text-xl font-semibold text-gray-900">Phone Number</p>
            <p className="text-lg text-gray-700">{user?.phoneNumber ?? "Unavailable"}</p>
          </div>
          <div className="mb-4">
            <p className="text-xl font-semibold text-gray-900">Address</p>
            <p className="text-lg text-gray-700">{user?.address ?? "Unavailable"}</p>
          </div>
        </div>
      </div>

      {/* Location Information */}
      <div className="p-4">
        <div className="mb-6 flex items-center">
          <img
            src={homeUserIcon}
            alt="Location Icon"
            className="mr-4 h-10 w-10"
          />
          <h3 className="text-3xl font-bold text-gray-800">Location</h3>
        </div>
        <div className="rounded-md border border-gray-300 bg-[#FFF2CA] p-4 shadow-inner">
          <div>
            <p className="text-xl font-semibold text-gray-900">Location</p>
            <p className="text-lg text-gray-700">{user?.location ?? "Unavailable"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;
