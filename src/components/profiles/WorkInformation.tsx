import jobsIcon from "../../assets/icons/profileIcon/jobsIcon.png";

const WorkInformation = ({ user }) => {
  return (
    <div className="flex flex-col gap-8 p-4 text-lg">
      <div className="p-4">
        <div className="mb-4 flex items-center">
          <img src={jobsIcon} alt="Job Icon" className="mr-2 h-8 w-8" />
          <h3 className="text-2xl font-bold">Works at {user?.job} </h3>
        </div>
        <div
          className="rounded-md border border-gray-300 p-4"
          style={{ backgroundColor: "#FFF2CA" }}
        >
          <p>{user?.jobDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default WorkInformation;
