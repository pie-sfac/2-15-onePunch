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
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  // 시간과 분을 항상 두 자리로 유지
  const paddedHours = hours.toString().padStart(2, "0");
  const paddedMinutes = minutes.toString().padStart(2, "0");

  return `${paddedHours}:${paddedMinutes}`;
};

export const Day = (dayString: any) => {
  const date = new Date(dayString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // JavaScript의 getMonth는 0부터 시작하기 때문에 +1 필요
  const day = date.getDate();

  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeek = dayNames[date.getDay()];

  return `${year}.${month < 10 ? `0${month}` : month}.${
    day < 10 ? `0${day}` : day
  } (${dayOfWeek})`;
};
