import React from "react";

interface HistoryEntry {
  content: string;
  imageURL?: string;
  updatedAt: Date;
}

interface HistoryModalProps<T extends HistoryEntry> {
  history: T[];
  onClose: () => void;
  title: string;
  showImage?: boolean;
}

const HistoryModal = <T extends HistoryEntry>({
  history,
  onClose,
  title,
  showImage = false,
}: HistoryModalProps<T>) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex h-[550px] w-[650px] flex-col justify-center rounded-lg bg-white p-4">
        <h2 className="mb-4 text-lg font-bold">{title}</h2>
        <ul className="max-h-[500px] overflow-y-auto">
          {history.length === 0 ? (
            <li className="py-2 text-center text-sm text-gray-500">
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
                <div className="mt-2 flex justify-center">
                  {showImage && entry.imageURL && (
                    <img
                      src={entry.imageURL}
                      alt="History image"
                      className="max-w-full rounded"
                    />
                  )}
                </div>
              </li>
            ))
          )}
        </ul>
        <div className="mt-4 flex justify-center">
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
