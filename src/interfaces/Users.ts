export type UserType = {
  _id: string;
  name: string;
  email: string;
  password: string;
  profilePictureURL?: string;
  backgroundPictureURL?: string;
  introduction?: string;
  address?: string;
  age?: number;
  phoneNumber?: string;
  activeStatus: boolean;
  education?: string;
  location?: string;
  relationship?: string;
  job?: string;
  jobDescription?: string;
  degree?: string;
  years?: string;
  educationDescription?: string;
  inRelationship?: string;
  bio?: string;
  dateCreated?: string;
  friends?: Array<{ _id: string; name: string; profilePictureURL?: string }>;
  createdAt: string; 
};

export type UserSliceParam = {
  users: UserType[];
  currentUser: UserType;
  viewedUser: Partial<UserType> | null;
};
