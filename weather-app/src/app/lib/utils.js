import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function TodayDate() {
  const today = new Date();
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayName = weekdays[today.getDay()];
  const dayNum = today.getDate();
  const monthName = months[today.getMonth()];
  const monthFullName = monthNames[today.getMonth()];
  const year = today.getFullYear();

  return <div> <p className="font-bold text-3xl">{`${monthFullName} ${year}`} </p>
    <p className="text-lg">{`${dayName}, ${dayNum} ${monthName}, ${year}`}</p></div>;
};

export const FamousCities = ["New York City", "Rio de Janeiro", "Honk Kong", "Paris", "London", "Dubai", "Istanbul", "Berlin", "Rome", "Sydney", "Madrid", "Chicago", "Seoul", "Barcelona", "Amsterdam", "Prague"]