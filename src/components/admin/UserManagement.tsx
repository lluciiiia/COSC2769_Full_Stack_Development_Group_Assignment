import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../../app/store";
import { getAllUsers } from "../../controllers/users";
import { resumeUser, suspendUser } from "../../controllers/admins";

const UserManagement = () => {
  const dispatch: AppDispatch = useDispatch();
  const users = useSelector((state: AppState) => state.admin.users);
  console.log("user", users);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<"newest" | "oldest">("newest");
  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 10;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value as "newest" | "oldest");
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleStatusToggle = async (userId: string, currentStatus: boolean) => {
    if (currentStatus) {
      dispatch(suspendUser(userId)).then(() => {
        dispatch(getAllUsers());
      });
    } else {
      dispatch(resumeUser(userId)).then(() => {
        dispatch(getAllUsers());
      });
    }
    // try {
    //   console.log(
    //     `Toggling status for user ${userId}. Current status: ${currentStatus}`,
    //   );
    //   const action = updateUser({
    //     userId,
    //     userData: { activeStatus: !currentStatus },
    //   });
    //   console.log("Dispatching action:", action);
    //   await dispatch(action as any);
    //   console.log(`Status for user ${userId} updated successfully.`);
    //   window.location.reload();
    // } catch (error) {
    //   console.error("Failed to update user:", error);
    // }
  };

  const filteredUsers = users
    .filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOption === "newest" ? dateB - dateA : dateA - dateB;
    });

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">All Users</h1>
      <h2 className="text-lg text-green-600">Active Members</h2>

      <div className="mb-4 mt-4 flex items-center justify-between">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="rounded-md border px-4 py-2"
        />
        <select
          value={sortOption}
          onChange={handleSortChange}
          className="rounded-md border px-4 py-2"
        >
          <option value="newest">Sort by Newest</option>
          <option value="oldest">Sort by Oldest</option>
        </select>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "User Name",
                "Date Joined",
                "Phone Number",
                "Email",
                "Location",
                "Status",
              ].map((info) => {
                return (
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    {info}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {currentUsers.map((user) => (
              <tr key={user._id}>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                  {user.name}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {user.phoneNumber}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {user.location || "N/A"}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <button
                    onClick={() =>
                      handleStatusToggle(user._id, user.activeStatus)
                    }
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      user.activeStatus
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.activeStatus ? "Active" : "Inactive"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-gray-700">
          Showing {indexOfFirstUser + 1} to {indexOfLastUser} of{" "}
          {filteredUsers.length} entries
        </span>
        <div className="xs:mt-0 mt-2 inline-flex">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`border-b border-t border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-600 ${
                currentPage === i + 1 ? "bg-gray-200" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}
          {currentPage < totalPages && (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="rounded-r border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-600"
            >
              {">"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
