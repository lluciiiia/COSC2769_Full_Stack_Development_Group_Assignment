import React from "react";
import { PostHistory } from "../../interfaces/Posts";
import HistoryModal from "../HistoryModal";

interface PostHistoryModalProps {
  history: PostHistory[];
  onClose: () => void;
}

const PostHistoryModal: React.FC<PostHistoryModalProps> = ({
  history,
  onClose,
}) => {
  return (
    <HistoryModal
      history={history}
      onClose={onClose}
      title="View Post History"
    />
  );
};

export default PostHistoryModal;
