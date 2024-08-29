import React from "react";
import { CommentHistory } from "../../interfaces/Comments";
import HistoryModal from "../HistoryModal";

interface CommentHistoryModalProps {
  history: CommentHistory[];
  onClose: () => void;
}

const CommentHistoryModal: React.FC<CommentHistoryModalProps> = ({
  history,
  onClose,
}) => {
  return (
    <HistoryModal
      history={history}
      onClose={onClose}
      title="Edit History"
      showImage={false}
    />
  );
};

export default CommentHistoryModal;
