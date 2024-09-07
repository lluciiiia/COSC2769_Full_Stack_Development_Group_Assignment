import React from "react";
import { PostHistory } from "../../interfaces/Posts";
import HistoryModal from "../HistoryModal";

interface PostHistoryModalProps {
  currentEntryId: string;
  history: PostHistory[];
  onClose: () => void;
  isOwner: boolean;
}

const PostHistoryModal: React.FC<PostHistoryModalProps> = ({
  currentEntryId,
  history,
  onClose,
  isOwner,
}) => {
  return (
    <HistoryModal
      currentEntryId={currentEntryId}
      history={history}
      onClose={onClose}
      title="View Post History"
      isOwner={isOwner}
      isComment={false}
    />
  );
};

export default PostHistoryModal;
