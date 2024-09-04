import { GroupType } from "./Group";
import { PostParams } from "./Posts";
import { UserType } from "./Users";

export type AdminSliceProps = {
  users: UserType[];
  posts: PostParams[];
  groups: GroupType[];
};
