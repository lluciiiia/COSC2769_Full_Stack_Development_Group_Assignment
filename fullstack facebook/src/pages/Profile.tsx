import { useSelector } from "react-redux";
import { UserType } from "../features/userSlice";
import { AppState } from "../app/store";

const Profile = () => {
  //this is the test profile for all users,
  //later on, create the User component to test each user
  const users: UserType[] = useSelector((state: AppState) => state.users);

  return (
    <div>
      <h1>Profile for all users</h1>
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
