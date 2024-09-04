import { UserType } from "./Users";
export type GroupType = {
  _id: string;
  groupAdmin?: string;
  name?: string;
  visibility: string;
  imageURL?: string;
  backgroundImageURL?: string;
  dateCreated?: string;
  members?: UserType[];
  accepted: boolean;
  description?: string;
};

export interface GroupParams {
  groups: GroupType[];
}
