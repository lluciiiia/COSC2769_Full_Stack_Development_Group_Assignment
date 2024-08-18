import { useParams } from "react-router-dom";
export default function GroupPage() {
    const { groupId } = useParams<{ groupId: string }>();
  return (
    <div>
        {groupId}
    </div>
  )
}
