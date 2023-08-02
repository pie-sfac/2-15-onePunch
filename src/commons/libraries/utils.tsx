export const Phone = (phone: any) => {
  let formatPhone = phone.split(""); // 전화번호를 배열로 변환
  formatPhone.splice(3, 0, "-"); // 4번째 위치에 하이픈 삽입
  formatPhone.splice(8, 0, "-"); // 9번째 위치에 하이픈 삽입
  return formatPhone.join(""); // 배열을 다시 문자열로 변환
};

export const Time = (timeString: any) => {
  const date = new Date(timeString);
  const hours = date.getHours();

  return `${hours}시`;
};

export const Time2 = (timeString: any): any => {
  const date = new Date(timeString);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

  return `${formattedHours}:${formattedMinutes}`;
};

export const Day = (dayString: any) => {
  const date = new Date(dayString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeek = dayNames[date.getDay()];

  return `${year}.${month < 10 ? `0${month}` : month}.${
    day < 10 ? `0${day}` : day
  } (${dayOfWeek})`;
};
