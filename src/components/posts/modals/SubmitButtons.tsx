import React from "react";

interface SubmitButtonsProps {
  onClose: () => void;
  isEdit: boolean;
}

const SubmitButtons: React.FC<SubmitButtonsProps> = ({ onClose, isEdit }) => {
  return (
    <div className="mt-6 flex justify-end">
      <button
        type="button"
        className="mr-4 rounded-md bg-gray-300 px-6 py-3 text-lg text-gray-700"
        onClick={onClose}
      >
        Cancel
      </button>
      <button
        type="submit"
        className="rounded-md bg-[#FFC123] px-6 py-3 text-lg text-black"
      >
        {isEdit ? "Edit" : "Post"}
      </button>
    </div>
  );
};

export default SubmitButtons;
