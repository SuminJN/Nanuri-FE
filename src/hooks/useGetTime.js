import { parseISO } from "date-fns";

const useGetTime = () => {
  const detailDate = (a) => {
    const milliSeconds = new Date() - a;
    const seconds = milliSeconds / 1000;
    if (seconds < 60) return `방금 전`;
    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;
    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간 전`;
    const days = hours / 24;
    if (days < 7) return `${Math.floor(days)}일 전`;
    const weeks = days / 7;
    if (weeks < 5) return `${Math.floor(weeks)}주 전`;
    const months = days / 30;
    if (months < 12) return `${Math.floor(months)}개월 전`;
    const years = days / 365;
    return `${Math.floor(years)}년 전`;
  };

  const getCurrentTime = (createdTime) => detailDate(parseISO(createdTime));

  const isNew = (createdTime) => {
    const now = new Date();
    const createdDate = new Date(createdTime);
    const diffTime = Math.abs(now - createdDate);
    const diffHours = diffTime / (1000 * 60 * 60);
    return diffHours <= 24; // 24시간 이내면 true
  };

  return { getCurrentTime, isNew };
};

export const formattedDate = (stringDate, splitter = "/") => {
  const date = new Date(stringDate);
  if (isNaN(date.getTime())) return "유효하지 않은 날짜";

  const nowDate = new Date();
  const timeDifference = nowDate.getTime() - date.getTime();

  const dayDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hourDifference = Math.floor(timeDifference / (1000 * 60 * 60));
  const minuteDifference = Math.floor(timeDifference / (1000 * 60));

  if (minuteDifference < 1) return "방금 전";
  else if (hourDifference < 1) return `${minuteDifference}분 전`;
  else if (hourDifference < 24) return `${hourDifference}시간 전`;
  else if (dayDifference < 30) return `${dayDifference}일 전`;

  return date.toISOString().slice(2, 10).replace(/-/g, splitter);
};

export default useGetTime;
