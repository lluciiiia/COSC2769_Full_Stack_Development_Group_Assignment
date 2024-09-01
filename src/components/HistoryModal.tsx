import React from "react";

interface HistoryEntry {
  content: string;
  images?: string[];
  updatedAt: Date;
}

interface HistoryModalProps<T extends HistoryEntry> {
  history: T[];
  onClose: () => void;
  title: string;
}

const HistoryModal = <T extends HistoryEntry>({
  history,
  onClose,
  title,
}: HistoryModalProps<T>) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex h-[550px] w-[650px] flex-col rounded-lg bg-white p-4">
        <h2 className="mb-4 text-lg font-bold">{title}</h2>
        <div className="flex flex-col justify-center">
          <ul className="max-h-[420px] overflow-y-auto">
            {history.length === 0 ? (
              <li className="mt-48 justify-center py-2 text-center text-sm text-gray-500">
                No edit history available.
              </li>
            ) : (
              history.map((entry, index) => (
                <li key={index} className="border-b py-4">
                  <div className="flex">
                    <p className="flex flex-col gap-1 text-sm">
                      <span className="font-bold">Version {index + 1}</span>
                      {entry.content}
                    </p>
                    <p className="ml-auto mt-1 text-xs text-gray-500">
                      {new Date(entry.updatedAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex justify-center">
                    {entry.images && entry.images.length > 0 && (
                      <div
                        className="flex space-x-4 overflow-x-auto"
                        style={{ scrollbarWidth: "thin" }} // For Firefox
                      >
                        {entry.images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            className="h-[100px] w-[100px] flex-shrink-0 rounded-lg" // Fixed height and width
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="mt-auto flex justify-center">
          <button
            onClick={onClose}
            className="w-16 rounded-md bg-[#FFC123] px-2 py-1 text-center text-sm text-black"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryModal;
