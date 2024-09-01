import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { UserType } from '../../interfaces/Users';
import { AppState } from '../../app/store';
import React from 'react';

export default function Member() {
  const users: UserType[] = useSelector((state: AppState) => state.user.users);
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

  return (
    <div className="flex justify-center">
      <div className="space-y-4 p-4 max-w-xl w-full">
        {users.map((user: UserType) => (
          <div key={user._id} className="flex items-center justify-between relative">
            <div className="flex items-center">
              <img
                src='/cat.png'
                alt={user.name}
                className="w-12 h-12 rounded-full border-2 border-black"
              />
              <span className="ml-4 text-lg font-bold">{user.name}</span>
            </div>
            <button
              className="text-black text-2xl focus:outline-none ml-8"
              onClick={() => toggleDropdown(user._id)} 
            >
              ...
            </button>
            {dropdownOpen === user._id && ( 
              <div
                ref={dropdownRef} 
                className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded-md shadow-lg z-10"
              >
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  onClick={() => {
                    console.log('Delete user:', user.name);
                    setDropdownOpen(null);
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

