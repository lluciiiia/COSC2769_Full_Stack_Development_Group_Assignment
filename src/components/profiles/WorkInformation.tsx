import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppState } from "../../app/store";
import { UserType } from "../../interfaces/Users";
import { getUserById } from "../../features/userSlice";
import jobsIcon from "../../assets/icons/profileIcon/jobsIcon.png";

const WorkInformation = () => {
  const { userId } = useParams();
  const user: UserType | undefined = useSelector((state: AppState) => getUserById(state, Number(userId)));

  return (
    <div className="flex flex-col gap-8 text-lg p-4">
      <div className="p-4">
        <div className="flex items-center mb-4">
          <img src={jobsIcon} alt="Job Icon" className="h-8 w-8 mr-2" />
          <h3 className="text-2xl font-bold">Works at {user?.job}  </h3>
        </div>
        <div className=" p-4 rounded-md border border-gray-300" style={{ backgroundColor: '#FFF2CA' }}>
    
          <p>{user?.jobDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default WorkInformation;
