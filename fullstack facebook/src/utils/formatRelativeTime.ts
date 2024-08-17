import { formatDistanceToNow } from "date-fns";

export const formatRelativeTime = (date: Date) => {
  return formatDistanceToNow(date, { addSuffix: true });
};
