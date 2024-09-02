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
  _id: string;
  senderId: Sender;
  receiverId: string;
  type: string;
  isSeen: boolean;
  isAccepted: boolean;
  postId: any;
  groupDetails: GroupDetailsType;
  groupId: string;
  createdAt: string;
}

interface GroupDetailsType {
  adminId: string;
  groupImageURL: string;
  groupName: string;
}

export interface NotiProps {
  notifications: Notifications[];
  sentFriendRequests: Notifications[];
  sentGroupRequests: GroupRequest[];
}
