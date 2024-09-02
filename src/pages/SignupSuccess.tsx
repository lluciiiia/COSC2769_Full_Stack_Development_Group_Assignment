
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const SignupSuccess: React.FC<ModalProps> = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Success</h2>
        <p className="mb-4">{message}</p>
        <button
          onClick={onClose}
          className="w-full rounded-md bg-black py-2 text-sm font-bold text-white hover:bg-gray-800"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default SignupSuccess;
