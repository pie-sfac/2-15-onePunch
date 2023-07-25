import React, { useState } from "react";
import * as S from "./memberAdd.style";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./memberAdd.schema"; // 위에서 정의한 schema를 import합니다.
import { Select } from "antd";
import { Controller } from "react-hook-form";
import apiInstance from "../../../../commons/apiInstance/apiInstance";
import { useNavigate } from "react-router-dom";

export default function MemberAdd() {
  const navigate = useNavigate();
  const [add, setAdd] = useState(false);
  const [addName, setAddName] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const onSubmit = async (data: any) => {
    try {
      await apiInstance.post("/members?page=1&size=10", {
        name: data.name,
        birthDate: data.birthDate,
        phone: data.phone,
        sex: data.sex,
        job: data.job,
        acqusitionFunnel: data.howToVisit,
        acquisitionFunnel: data.howToVisit,
      });
      console.log(data);
      setAddName(data.name);
      setAdd(true);
    } catch (error: any) {
      console.error(error.response.data.message);
      alert(error.response.data.message);
    }
  };

  const handleListClick = () => {
    navigate("/memberPage/list");
  };

  return (
    <S.Wrapper>
      {!add ? (
        <>
          <S.Header>
            <S.OutBox onClick={handleListClick}>
              <S.LeftOut />
              <S.CreateScheduleText>회원등록</S.CreateScheduleText>
            </S.OutBox>
          </S.Header>
          <S.Body>
            <S.FormHeading>회원정보</S.FormHeading>
            <S.FormSubHeading>회원 정보를 등록하세요</S.FormSubHeading>
            <S.FormBody onSubmit={handleSubmit(onSubmit)}>
              <S.FormLabel>이름</S.FormLabel>
              <S.FormInput
                className="input-placeholder"
                {...register("name")}
                placeholder="이름"
              />
              <S.ErrorText>{errors.name?.message}</S.ErrorText>
              <S.FormLabel>성별</S.FormLabel>
              <Controller
                name="sex"
                control={control}
                rules={{ required: "성별을 선택해주세요." }}
                render={({ field }) => (
                  <S.SelectOut {...field} placeholder="성별 선택">
                    <Select.Option value="MALE">남</Select.Option>
                    <Select.Option value="FEMALE">여</Select.Option>
                  </S.SelectOut>
                )}
              />
              <S.ErrorText>{errors.sex?.message}</S.ErrorText>
              <S.FormLabel>생년월일</S.FormLabel>
              <S.FormInput
                {...register("birthDate")}
                placeholder="생년월일 (YYYY-MM-DD)"
              />
              <S.ErrorText>{errors.birthDate?.message}</S.ErrorText>
              <S.FormLabel>휴대폰 번호</S.FormLabel>
              <S.FormInput
                {...register("phone")}
                placeholder="핸드폰 번호 (010-1234-1234)"
              />
              <S.ErrorText>{errors.phone?.message}</S.ErrorText>
              <S.FormLabel>직업</S.FormLabel>
              <Controller
                name="job"
                control={control}
                rules={{ required: "직업을 선택해주세요." }}
                render={({ field }) => (
                  <S.SelectOut {...field} placeholder="직업 선택">
                    <Select.Option value="사무직">사무직</Select.Option>
                    <Select.Option value="현장직">현장직</Select.Option>
                    <Select.Option value="가사노동자">가사노동자</Select.Option>
                    <Select.Option value="학생">학생</Select.Option>
                    <Select.Option value="무직">무직</Select.Option>
                  </S.SelectOut>
                )}
              />
              <S.ErrorText>{errors.job?.message}</S.ErrorText>
              <S.FormLabel>방문 경로</S.FormLabel>
              <Controller
                name="howToVisit"
                control={control}
                rules={{ required: "방문 경로를 선택해주세요." }}
                render={({ field }) => (
                  <S.SelectOut {...field} placeholder="방문 경로 선택">
                    <Select.Option value="오프라인 광고 (배너, 현수막)">
                      오프라인 광고 (배너, 현수막)
                    </Select.Option>
                    <Select.Option value="SNS 광고 (페이스북, 인스타)">
                      SNS 광고 (페이스북, 인스타)
                    </Select.Option>
                    <Select.Option value="네이버 지도">
                      네이버 지도
                    </Select.Option>
                  </S.SelectOut>
                )}
              />
              <S.ErrorText>{errors.howToVisit?.message}</S.ErrorText>
              <S.FormCheckboxLabel htmlFor="agreeToTerms">
                회원 약관동의
              </S.FormCheckboxLabel>
              <S.CheckboxContainer>
                <S.FormCheckbox type="checkbox" {...register("agreeToTerms")} />
                <S.FormCheckboxText>
                  (필수)제 3자 정보 제공 약관. 동의합니다.
                </S.FormCheckboxText>
                <S.ErrorText>{errors.agreeToTerms?.message}</S.ErrorText>
              </S.CheckboxContainer>
              <S.SubmitButton
                type="submit"
                value="회원 등록"
                disabled={!isValid}
              />
            </S.FormBody>
          </S.Body>
        </>
      ) : (
        <S.RegistrationWrapper>
          <S.RegistrationTitle>등록완료</S.RegistrationTitle>
          <S.RegistrationText>
            {addName}님의 회원 정보가 생성되었습니다.
          </S.RegistrationText>
          <S.RegistrationImage
            src="/images/icons/Graphic_Member_registered.png"
            alt=""
          />
          <S.ButtonWrapper>
            <S.CloseButton onClick={handleListClick}>닫기</S.CloseButton>
            <S.ViewMemberButton>회원 조회</S.ViewMemberButton>
          </S.ButtonWrapper>
        </S.RegistrationWrapper>
      )}
    </S.Wrapper>
  );
}