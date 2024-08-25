import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppState } from "../../app/store";
import { UserType } from "../../interfaces/Users";
import { getUserById } from "../../features/userSlice";
import relationshipIcon from "../../assets/icons/profileIcon/relationshipIcon.png";

const RelationshipInformation = () => {
  const { userId } = useParams();
  const user: UserType | undefined = useSelector((state: AppState) =>
    getUserById(state, Number(userId)),
  );

  return (
    <div className="flex flex-col gap-8 p-4">
      <div className="p-4">
        <div className="mb-6 flex items-center">
          <img
            src={relationshipIcon}
            alt="Relationship Icon"
            className="mr-4 h-10 w-10"
          />
          <h3 className="text-3xl font-bold text-gray-800">Relationship</h3>
        </div>
        <div className="rounded-md border border-gray-300 bg-[#FFF2CA] p-4 shadow-inner">
          <p className="text-xl font-semibold text-gray-900">
            {user?.relationship || "Unavailable"}
          </p>
          {user?.relationship === "In a relationship" && user?.inRelationship ? (
            <p className="mt-2 text-lg text-gray-700">
              With: {user?.inRelationship || "Unavailable"}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default RelationshipInformation;
