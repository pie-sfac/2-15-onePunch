import * as S from "./classWrite.style";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ClassWrite() {
  const navigate = useNavigate();
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const onStartTimeChange = (value: any) => {
    setStartTime(value);
    if (value && value.isAfter(endTime)) {
      setEndTime(value);
    }
  };

  const onEndTimeChange = (value: any) => {
    setEndTime(value);
  };

  const disabledEndTimeHours = () => {
    const hours = [];
    for (let i = 0; i < (startTime ? startTime.hour() : 0); i++) {
      hours.push(i);
    }
    return hours;
  };

  const handleOutBoxClick = () => {
    navigate("/schedulePage/calendar"); // <-- navigate를 사용하여 '/schedulePage/calendar'로 이동합니다.
  };

  return (
    <>
      <S.Wrapper>
        <S.Header>
          <S.OutBox onClick={handleOutBoxClick}>
            <S.LeftOut />
            <S.CreateScheduleText>일정 생성</S.CreateScheduleText>
          </S.OutBox>
        </S.Header>
        <S.Body>
          <S.ClassTitle>개인 수업</S.ClassTitle>
          <S.Label>담당 강사 선택 </S.Label>
          <S.MemberChoiceButton>선택하기 +</S.MemberChoiceButton>
          <S.Label>회원 선택 </S.Label>
          <S.MemberChoiceButton>선택하기 +</S.MemberChoiceButton>
          <S.Label>수업(수강권) 선택 </S.Label>
          <S.SelectOut
            defaultValue="lucy"
            options={[
              { value: "jack", label: "Jack" },
              { value: "lucy", label: "Lucy" },
              { value: "Yiminghe", label: "yiminghe" },
            ]}
          />
          <S.Label>참여 회원</S.Label>
          <S.BoxWrapper>
            <S.Box>
              <S.SmileOut />
              <S.Name>박회원1</S.Name>
            </S.Box>
            <S.Box>
              <S.SmileOut />
              <S.Name>김회원2</S.Name>
            </S.Box>
          </S.BoxWrapper>
          <S.Label>일자 선택</S.Label>
          <S.DateOut />
          <S.Label>시간 선택</S.Label>
          <S.TimeBox>
            <S.TimeOut onChange={onStartTimeChange} value={startTime} />
            <S.TimeOut
              onChange={onEndTimeChange}
              disabledHours={disabledEndTimeHours}
              value={endTime}
            />
          </S.TimeBox>
        </S.Body>
        <S.Footer>
          <S.Button>완료</S.Button>
        </S.Footer>
      </S.Wrapper>
    </>
  );
}
