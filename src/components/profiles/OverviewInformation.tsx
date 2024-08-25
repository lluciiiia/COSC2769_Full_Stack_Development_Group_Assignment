import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import educationIcon from "../../assets/icons/profileIcon/educationIcon.png";
import homeUserIcon from "../../assets/icons/profileIcon/homeUserIcon.png";
import jobsIcon from "../../assets/icons/profileIcon/jobsIcon.png";
import phoneIcon from "../../assets/icons/profileIcon/phoneIcon.png";
import relationshipIcon from "../../assets/icons/profileIcon/relationshipIcon.png";
import { AppState } from "../../app/store";
import { UserType } from "../../interfaces/Users";
import { getUserById } from "../../features/userSlice";
import React from "react";

interface OverviewItemProps {
  defaultText: string;
  icon: string;
  data: string | undefined;
}

const OverviewInformation = () => {
  const { userId } = useParams();

  const user: UserType | undefined = useSelector((state: AppState) => {
    return getUserById(state, Number(userId));
  });

  return (
    <div className="flex flex-col justify-center gap-8 text-lg">
      <OverviewItem
        defaultText="Goes to"
        icon={educationIcon}
        data={user?.education}
      />
      <OverviewItem
        defaultText="Lives in"
        icon={homeUserIcon}
        data={user?.location}
      />
      <OverviewItem
        defaultText="+"
        icon={phoneIcon}
        data={user?.phoneNumber}
      />
      <OverviewItem
        defaultText=""
        icon={relationshipIcon}
        data={user?.relationship}
      />
      <OverviewItem
        defaultText="Works at"
        icon={jobsIcon}
        data={user?.job}
      />
    </div>
  );
};

const OverviewItem: React.FC<OverviewItemProps> = ({
  defaultText,
  icon,
  data,
}) => {
  return (
    <div className="flex items-center">
      <img src={icon} alt="" className="h-8" />
      <div className="ml-2">
        <span className="opacity-50">{data ? defaultText : ""}</span>
        <span className="font-medium">{" " + (data || "Unavailable")}</span>
      </div>
    </div>
  );
};

export default OverviewInformation;
