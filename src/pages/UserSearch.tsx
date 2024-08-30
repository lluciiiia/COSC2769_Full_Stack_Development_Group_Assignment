import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppState } from "../app/store";
import { getAllUsers } from "../controllers/user";
import { UserType } from "../interfaces/Users";

const UserSearch = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state: AppState) => state.user.users);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(getAllUsers()); // Fetch users when component mounts
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
    ? users.filter((user: UserType) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

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
          className="rounded-md border px-4 py-2 w-full"
        />
      </div>

      {/* User cards */}
      {searchQuery && (
        <div className="space-y-4">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user: UserType) => (
              <div
                key={user._id}
                onClick={() => handleUserClick(user._id)}
                className="flex items-center border rounded-lg p-4 shadow-md w-full cursor-pointer"
              >
                {/* User Profile Picture */}
                <img
                  src={user.profilePictureURL || "/default-profile.png"} // Fallback image if no profile picture
                  alt={`${user.name}'s profile`}
                  className="w-24 h-24 rounded-full object-cover mr-4"
                />
                {/* User Info */}
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">{user.name}</h2>
                  {user.location && (
                    <p className="text-sm text-gray-600">Location: {user.location}</p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No users found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserSearch;
