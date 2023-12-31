import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function timeAgo(timestamp: string): string {
  const currentDate = new Date();
  const postDate = new Date(timestamp);
  const timeDifference = currentDate.getTime() - postDate.getTime();

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return seconds + (seconds === 1 ? " second ago" : " seconds ago");
  } else if (minutes < 60) {
    return minutes + (minutes === 1 ? " minute ago" : " minutes ago");
  } else if (hours < 24) {
    return hours + (hours === 1 ? " hour ago" : " hours ago");
  } else {
    return days + (days === 1 ? " day ago" : " days ago");
  }
}
export const checkIsLiked = (likeList: string[], userId: string) => {
  return likeList.includes(userId);
};
