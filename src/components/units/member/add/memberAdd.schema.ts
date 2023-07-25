import * as yup from "yup";

export const schema = yup.object({
  name: yup.string().required("이름을 입력하세요!"),
  sex: yup.string().oneOf(["MALE", "FEMALE"], "성별을 선택하세요!"),
  birthDate: yup
    .string()
    .required("생년월일을 입력하세요!")
    .matches(
      /^\d{4}-\d{2}-\d{2}$/,
      "생년월일은 YYYY-MM-DD 형식으로 입력해주세요!"
    ),
  phone: yup
    .string()
    .matches(
      /^\d{3}-\d{3,4}-\d{4}$/,
      "올바른 핸드폰 번호 형식이 아닙니다! (ex: 010-1234-1234)"
    ),
  job: yup.string().required("직업을 선택하세요!"),
  howToVisit: yup.string().required("방문경로를 선택하세요!"),
  agreeToTerms: yup.boolean().oneOf([true], "회원 약관에 동의해주세요!"),
});
