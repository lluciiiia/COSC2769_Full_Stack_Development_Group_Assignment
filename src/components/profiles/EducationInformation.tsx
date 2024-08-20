import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppState } from "../../app/store";
import { UserType } from "../../interfaces/Users";
import { getUserById } from "../../features/userSlice";
import educationIcon from "../../assets/icons/profileIcon/educationIcon.png";

const EducationInformation = () => {
  const { userId } = useParams();
  const user: UserType | undefined = useSelector((state: AppState) => getUserById(state, Number(userId)));

  return (
    <div className="flex flex-col gap-8 p-4">
      <div className="p-4 ">
        <div className="flex items-center mb-6">
          <img src={educationIcon} alt="Education Icon" className="h-10 w-10 mr-4" />
          <h3 className="text-3xl font-bold text-gray-800">Education</h3>
        </div>
        <div className="p-4 rounded-md border border-gray-300 bg-[#FFF2CA] shadow-inner">
          <div className="mb-4">
            <p className="text-xl font-semibold text-gray-900">{user?.education}</p>
            <p className="text-lg text-gray-700">{user?.degree}</p>
          </div>
          <div className="mb-4">
            <p className="text-lg text-gray-700">{user?.years}</p>
          </div>
          <div>
            <p className="text-base text-gray-600">{user?.educationDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationInformation;
