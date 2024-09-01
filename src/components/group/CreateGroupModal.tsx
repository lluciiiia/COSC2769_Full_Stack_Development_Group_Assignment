import React from "react";

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  // onCreate: (groupData: {
  //   name: string;
  //   visibility: string;
  //   imageURL: string;
  //   backgroundImageURL: string;
  // }) => void;
}

const CreateGroupModal: React.FC<CreateGroupModalProps> = ({
  isOpen,
  onClose,
  // onCreate,
}) => {
  const [newGroup, setNewGroup] = React.useState({
    name: "",
    visibility: "Private", // Default value set to "Private"
    imageURL: "",
    backgroundImageURL: "",
  });

  // Handle form input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewGroup((prevGroup) => ({
      ...prevGroup,
      [name]: value,
    }));
  };

  // Handle form submission to create a new group
  const handleSubmit = () => {
    // onCreate(newGroup); // Call onCreate prop with new group data
    onClose(); // Close modal on submit
  };

  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="w-[400px] rounded-md bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-xl font-bold">Create a New Group</h2>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Name</label>
          <input
            type="text"
            name="name"
            value={newGroup.name}
            onChange={handleInputChange}
            className="w-full rounded border border-gray-300 p-2"
            placeholder="Enter group name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Visibility</label>
          <select
            name="visibility"
            value={newGroup.visibility}
            onChange={handleInputChange}
            className="w-full rounded border border-gray-300 p-2"
          >
            <option value="Private">Private</option>
            <option value="Public">Public</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Image URL</label>
          <input
            type="text"
            name="imageURL"
            value={newGroup.imageURL}
            onChange={handleInputChange}
            className="w-full rounded border border-gray-300 p-2"
            placeholder="Enter image URL"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold">
            Background Image URL
          </label>
          <input
            type="text"
            name="backgroundImageURL"
            value={newGroup.backgroundImageURL}
            onChange={handleInputChange}
            className="w-full rounded border border-gray-300 p-2"
            placeholder="Enter background image URL"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="rounded-md bg-[#FFC123] px-4 py-2 text-sm font-semibold text-white hover:bg-[#d89e1b]"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupModal;
