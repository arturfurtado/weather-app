import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function TodayDate(){
  const today = new Date();
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dayName = weekdays[today.getDay()];
  const dayNum = today.getDate();
  const monthName = months[today.getMonth()];
  const year = today.getFullYear();

  return <div>{`${dayName}, ${dayNum} ${monthName}, ${year}`}</div>;
};

export const FamousCities = ["New York City", "Rio de Janeiro", "Honk Kong", ""]