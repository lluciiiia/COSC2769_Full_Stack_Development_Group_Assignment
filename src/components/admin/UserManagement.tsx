import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../app/store";

const UserManagement = () => {
  const users = useSelector((state: AppState) => state.user.users);
  
  console.log(users);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<"newest" | "oldest">("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // Handle input changes for search and sort options
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value as "newest" | "oldest");
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Filter and sort users based on search query and sort option
  const filteredUsers = users
    .filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime(); // Use createdAt instead of dateJoined
      const dateB = new Date(b.createdAt).getTime();
      return sortOption === "newest" ? dateB - dateA : dateA - dateB;
    });

  // Pagination calculations
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">All Users</h1>
      <h2 className="text-lg text-green-600">Active Members</h2>

      {/* Search and sort options */}
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

      {/* Users table */}
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                User Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Date Joined
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Phone Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Status
              </th>
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
                  <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${user.activeStatus ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                  >
                    {user.activeStatus ? "Active" : "Inactive"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-gray-700">
          Showing {indexOfFirstUser + 1} to {indexOfLastUser} of{" "}
          {filteredUsers.length} entries
        </span>
        <div className="xs:mt-0 mt-2 inline-flex">
          {/* {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`border-b border-t border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-600 ${currentPage === i + 1 ? "bg-gray-200" : ""}`}
            >
              {i + 1}
            </button>
          ))} */}
          {/* {currentPage < totalPages && (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="rounded-r border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-600"
            >
              {">"}
            </button>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
