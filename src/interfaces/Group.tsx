export type GroupType = {
  _id: string;
  groupAdmin: string;
  name: string;
  visibility: string;
  imageURL: string;
  backgroundImageURL: string;
  dateCreated: string;
  members: string[];
  accepted: boolean;
  description: string;
};

export interface GroupParams {
  groups: GroupType[];
}
