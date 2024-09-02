import React from "react";
import { CommentHistory } from "../../interfaces/Comments";
import HistoryModal from "../HistoryModal";

interface CommentHistoryModalProps {
  currentEntryId: string;
  history: CommentHistory[];
  onClose: () => void;
  isOwner: boolean;
}

const CommentHistoryModal: React.FC<CommentHistoryModalProps> = ({
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
      title="View Comment History"
      isOwner={isOwner}
      isComment={true}
    />
  );
};

export default CommentHistoryModal;
