import * as S from "./consultingWrite.style";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ConsultingWrite() {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const navigate = useNavigate();

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
          <S.ConsultingTitle>상담</S.ConsultingTitle>
          <S.Label>담당 강사 선택 </S.Label>
          <S.MemberChoiceButton>선택하기 +</S.MemberChoiceButton>
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
          <S.Label>이름 </S.Label>
          <S.Text />
          <S.Label>역락처 </S.Label>
          <S.Text />
          <S.Label>일정 메모</S.Label>
          <S.TextAreaOut
            showCount
            maxLength={100}
            style={{ height: 120, resize: "none" }}
            placeholder="disable resize"
          />
        </S.Body>
        <S.Footer>
          <S.Button>완료</S.Button>
        </S.Footer>
      </S.Wrapper>
    </>
  );
}
