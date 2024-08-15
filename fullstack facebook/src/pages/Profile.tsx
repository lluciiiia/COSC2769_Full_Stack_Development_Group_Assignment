import { useSelector } from "react-redux";
import { UserType } from "../features/userSlice";
import { AppState } from "../app/store";

const Profile = () => {
  
  const users: UserType[] = useSelector((state: AppState) => state.users);

  return (
    <div>
      <h1 className="text-3xl">Profile for all users</h1>
      <ul>
        {users.map((user: UserType) => {
          return (
            <li key={user.id}>
              id: {user.id}, name: {user.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Profile;
