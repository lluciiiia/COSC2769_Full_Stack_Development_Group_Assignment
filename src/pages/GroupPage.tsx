import { useParams } from "react-router-dom";
import {  useSelector } from "react-redux";
import { GroupType } from "../types/group";
import { AppState } from "../app/store";
import { selectGroupById } from "../features/groupSlice";
export default function GroupPage() {
    const { groupId } = useParams<{ groupId: string }>();
    const group: GroupType | undefined = useSelector((state: AppState) =>
    selectGroupById(state, groupId || "")
  );
  return (
    <div>
        {JSON.stringify(group)}
    </div>
  )
}
