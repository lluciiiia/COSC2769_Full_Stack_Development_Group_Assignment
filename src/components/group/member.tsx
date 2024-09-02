import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../app/store';
import React from 'react';
import { UserType } from '../../interfaces/Users';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
export default function Member() {
  const { groupId } = useParams<{ groupId: string }>(); 
  const group = useSelector((state: AppState) => state.groups.find(group => group._id === groupId));

  const members: UserType[] = group ? group.members : []; 
  console.log(members);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

const toggleDropdown = (id: string) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  if (!group) {
    return <p>Loading group data...</p>;
  }

  return (
    <div className="flex justify-center">
      <div className="space-y-4 p-4 max-w-xl w-full">
        {members.length === 0 ? (
          <p className="text-center text-gray-500">There are no members.</p>
        ) : (
          members.map((member: UserType) => (
            <div key={member._id} className="flex items-center justify-between relative">
              <div className="flex items-center">
                <img
                  src={member.profilePictureURL || '/src/assets/icons/default-profile.png'} 
                  alt={member.name}
                  className="w-12 h-12 rounded-full border-2 border-black"
                />
                <span className="ml-4 text-lg font-bold">{member.name}</span>
              </div>
              <button
                className="text-black text-2xl focus:outline-none ml-8"
                onClick={() => toggleDropdown(member._id)}
              >
                ...
              </button>
              {dropdownOpen === member._id && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded-md shadow-lg z-10"
                >
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    onClick={() => {
                      console.log('Delete member:', member.name);
                      setDropdownOpen(null);
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
