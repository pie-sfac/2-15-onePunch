export const Phone = (phone: any) => {
  let formatPhone = phone.split(""); // 전화번호를 배열로 변환
  formatPhone.splice(3, 0, "-"); // 4번째 위치에 하이픈 삽입
  formatPhone.splice(8, 0, "-"); // 9번째 위치에 하이픈 삽입
  return formatPhone.join(""); // 배열을 다시 문자열로 변환
};
