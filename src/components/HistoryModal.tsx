import React from "react";
import { RevertIcon } from "../assets/icons/RevertIcon";
import { updateComment } from "../controllers/comments";
import { revertPost } from "../controllers/posts";
import { AsyncThunkAction, UnknownAction } from "@reduxjs/toolkit";
import { ThunkDispatch } from "redux-thunk";
import { PostParams, RevertPostParams } from "../interfaces/Posts";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";

interface HistoryEntry {
  content: string;
  images?: string[];
  updatedAt: Date;
}

interface HistoryModalProps<T extends HistoryEntry> {
  currentEntryId: string;
  history: T[];
  onClose: () => void;
  title: string;
  isOwner: boolean;
  isComment: boolean;
}

const HistoryModal = <T extends HistoryEntry>({
  currentEntryId,
  history,
  onClose,
  title,
  isOwner,
  isComment,
}: HistoryModalProps<T>) => {
  const dispatch: AppDispatch = useDispatch();

  const handleRevertClick = async (entry: any) => {
    try {
      let response;
      if (isComment) {
        entry.id = currentEntryId;
        response = await updateComment(entry);
      } else {
        const params: RevertPostParams = {
          _id: currentEntryId,
          content: entry.content,
          images: entry.images || [], // Provide a default empty array
        };
        response = await dispatch(revertPost(params)).unwrap(); // unwrap() to handle the resolved value
      }
      if (!response) alert("Failed to revert. Please try again.");
    } catch (error) {
      console.error("Error reverting:", error);
      alert("An error occurred while reverting");
    }
    window.location.reload();
  };

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
                <li key={index} className="flex flex-col border-b py-4">
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
                  {isOwner && (
                    <div
                      className="ml-auto mt-2 flex cursor-pointer flex-col items-center"
                      onClick={() => {
                        handleRevertClick(entry);
                      }}
                    >
                      <RevertIcon></RevertIcon>
                      <span className="text-gray text-xs">Revert</span>
                    </div>
                  )}
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
function dispatch(
  arg0: AsyncThunkAction<
    PostParams,
    PostParams,
    {
      state?: unknown;
      dispatch?: ThunkDispatch<unknown, unknown, UnknownAction>;
      extra?: unknown;
      rejectValue?: unknown;
      serializedErrorType?: unknown;
      pendingMeta?: unknown;
      fulfilledMeta?: unknown;
      rejectedMeta?: unknown;
    }
  >,
) {
  throw new Error("Function not implemented.");
}
