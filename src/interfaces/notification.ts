export interface Sender {
    _id: string;
    name: string;
    email: string;
    profilePictureURL: string;
  }
  
  export interface Notifications {
    senderId: Sender;
    receiverId: string;
    type: string;
    isSeen: boolean;
    createdAt: string;
  }
  
  export interface NotiProps {
    notifications: Notifications[];
  }
  