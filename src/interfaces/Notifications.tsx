export interface Sender {
  _id: string;
  name: string;
  email: string;
  profilePictureURL: string;
}

export interface GroupRequest {
  groupId?: string;
  notification: Notifications;
}

export interface Notifications {
  postId: any;
  _id: string;
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
  sentGroupRequests: GroupRequest[];
}
