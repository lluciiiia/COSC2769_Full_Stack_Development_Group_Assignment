import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateGroup } from "../../controllers/groups";
import { GroupType } from "../../interfaces/Group";
import { AppDispatch } from "../../app/store";
interface UpdateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  group: GroupType;
}

const UpdateGroupModal: React.FC<UpdateGroupModalProps> = ({
  isOpen,
  onClose,
  group,
}) => {
  const [updatedGroup, setUpdatedGroup] = useState<Partial<GroupType>>({
    name: group.name,
    visibility: group.visibility,
    imageURL: group.imageURL,
    backgroundImageURL: group.backgroundImageURL,
    description: group.description,
  });

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setUpdatedGroup((prevGroup) => ({
      ...prevGroup,
      [name]: value,
    }));
  };

  // Handle file input change and convert to Base64
  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUpdatedGroup((prevGroup) => ({
          ...prevGroup,
          [fieldName]: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission to update the group
  const handleSubmit = async () => {
    try {
      await dispatch(updateGroup({ groupId: group._id, updatedGroup }));
      onClose(); // Close modal on submit
      window.location.reload();
    } catch (error) {
      console.error("Failed to update group:", error);
      // Handle error as needed
    }
  };

  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="h-[500px] w-[600px] overflow-y-auto rounded-md bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-xl font-bold">Update Group</h2>

        {/* Flex Container for Two Columns */}
        <div className="flex">
          {/* Left Column */}
          <div className="flex w-1/2 flex-col justify-between pr-4">
            {/* Group Name */}
            <div className="mb-4">
              <label className="block text-sm font-semibold">Name</label>
              <input
                type="text"
                name="name"
                value={updatedGroup.name || ""}
                onChange={handleInputChange}
                className="w-full rounded border border-gray-300 p-2"
                placeholder="Enter group name"
              />
            </div>

            {/* Group Visibility */}
            <div className="mb-4">
              <label className="block text-sm font-semibold">Visibility</label>
              <select
                name="visibility"
                value={updatedGroup.visibility || "Private"}
                onChange={handleInputChange}
                className="w-full rounded border border-gray-300 p-2"
              >
                <option value="Private">Private</option>
                <option value="Public">Public</option>
              </select>
            </div>

            {/* Group Image Upload */}
            <div className="mb-4">
              <label className="block text-sm font-semibold">Group Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "imageURL")}
                className="w-full rounded border border-gray-300 p-2"
              />
            </div>

            {/* Group Background Image Upload */}
            <div className="mb-4">
              <label className="block text-sm font-semibold">
                Background Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "backgroundImageURL")}
                className="w-full rounded border border-gray-300 p-2"
              />
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex space-x-4">
              <button
                onClick={onClose}
                className="w-full rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="w-full rounded-md bg-[#FFC123] px-4 py-2 text-sm font-semibold text-white hover:bg-[#d89e1b]"
              >
                Update
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex w-1/2 flex-col justify-between pl-4">
            {/* Group Description */}
            <div className="mb-4">
              <label className="block text-sm font-semibold">Description</label>
              <textarea
                name="description"
                value={updatedGroup.description || ""}
                onChange={handleInputChange}
                className="w-full rounded border border-gray-300 p-2"
                placeholder="Enter group description"
                rows={4}
              />
            </div>

            {/* Group Image Preview */}
            <div className="mb-4">
              {updatedGroup.imageURL && (
                <div>
                  <label className="block text-sm font-semibold">
                    Image Preview
                  </label>
                  <img
                    src={updatedGroup.imageURL}
                    alt="Group Preview"
                    className="mt-2 h-32 w-full rounded border"
                  />
                </div>
              )}
            </div>

            {/* Group Background Image Preview */}
            <div className="mb-4">
              {updatedGroup.backgroundImageURL && (
                <div>
                  <label className="block text-sm font-semibold">
                    Background Preview
                  </label>
                  <img
                    src={updatedGroup.backgroundImageURL}
                    alt="Background Preview"
                    className="mt-2 h-32 w-full rounded border"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateGroupModal;
