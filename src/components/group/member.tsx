import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, AppState } from "../../app/store";
import React from "react";
import { UserType } from "../../interfaces/Users";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchGroups, removeMemberFromGroup } from "../../controllers/group";
import { selectAuthState } from "../../features/authSlice";

export default function Member() {
  const dispatch: AppDispatch = useDispatch();

  const { groupId } = useParams<{ groupId: string }>();

  const group = useSelector((state: AppState) =>
    state.groups.find((group) => group._id === groupId),
  );

  const { id } = useSelector(selectAuthState);
  const isAdmin = id === group?.groupAdmin;

  const members: UserType[] = group ? group.members : [];

  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();

  const toggleDropdown = (id: string) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  const handleDeleteMember = (userId: string) => {
    dispatch(removeMemberFromGroup({ groupId, userId })).then(() => {
      dispatch(fetchGroups());
    });
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  if (!group) {
    return <p>Loading group data...</p>;
  }

  const isMember = members.some((member) => member._id === id);
  if (group.visibility === "Private" && !isAdmin && !isMember) {
    return (
      <div className="flex justify-center">
        <p>This is private, you're not in the group. Please consider signing up.</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-xl space-y-4 p-4">
        {members.length === 0 ? (
          <p className="text-center text-gray-500">There are no members.</p>
        ) : (
          members.map((member: UserType) => (
            <div
              key={member._id}
              className="relative flex items-center justify-between"
            >
              <div className="flex items-center">
                <img
                  src={
                    member.profilePictureURL ||
                    "/src/assets/icons/default-profile.png"
                  }
                  alt={member.name}
                  className="h-12 w-12 rounded-full border-2 border-black"
                />
                <span className="ml-4 text-lg font-bold">{member.name}</span>
              </div>
              <button
                className="ml-8 text-2xl text-black focus:outline-none"
                onClick={() => toggleDropdown(member._id)}
              >
                ...
              </button>
              {dropdownOpen === member._id && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 z-10 mt-2 w-32 rounded-md border border-gray-300 bg-white shadow-lg"
                >
                  <button
                    className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                    onClick={() => {
                      navigate(`/profile/${member._id}`);
                      setDropdownOpen(null);
                    }}
                  >
                    View Profile
                  </button>
                  {isAdmin && (
                    <button
                      className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                      onClick={() => {
                        handleDeleteMember(member._id);
                        setDropdownOpen(null);
                      }}
                    >
                      Delete
                    </button>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
