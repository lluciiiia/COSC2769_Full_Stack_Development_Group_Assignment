import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, AppState } from "../app/store";
import { getAllViewedUsers } from "../controllers/users";
import { ViewedUser } from "../interfaces/Users";

const UserSearch = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state: AppState) => state.user.viewUsers);
  console.log(users);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(getAllViewedUsers()); // Fetch users when component mounts
  }, [dispatch]);

  // Handle input changes for search
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Handle user card click
  const handleUserClick = (userId: string) => {
    navigate(`/profile/${userId}`); // Navigate to user profile page
  };

  // Filter users based on search query
  const filteredUsers = searchQuery
    ? users.filter((user: ViewedUser) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : users;

  // Show only the first 10 users
  const displayedUsers = filteredUsers.slice(0, 10);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">User Search</h1>

      {/* Search input */}
      <div className="mb-4 mt-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full rounded-md border px-4 py-2"
        />
      </div>

      {/* User cards */}
      <div className="space-y-4">
        {displayedUsers.length > 0 ? (
          displayedUsers.map((user: ViewedUser) => (
            <div
              key={user._id}
              onClick={() => handleUserClick(user._id)}
              className="flex w-full cursor-pointer items-center rounded-lg border p-4 shadow-md"
            >
              {/* User Profile Picture */}
              <img
                src={user.profilePictureURL || "/default-profile.png"} // Fallback image if no profile picture
                alt={`${user.name}'s profile`}
                className="mr-4 h-24 w-24 rounded-full object-cover"
              />
              {/* User Info */}
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{user.name}</h2>
                {user.location && (
                  <p className="text-sm text-gray-600">
                    Location: {user.location}
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default UserSearch;
