export interface Sender {
  _id: string;
  name: string;
  email: string;
  profilePictureURL: string;
}

export interface Notifications {
  _id: string
  senderId: Sender;
  receiverId: string;
  type: string;
  isSeen: boolean;
  isAccepted: boolean;
  createdAt: string;
}

export interface NotiProps {
  notifications: Notifications[];
  sentFriendRequests: Notifications[];
}
