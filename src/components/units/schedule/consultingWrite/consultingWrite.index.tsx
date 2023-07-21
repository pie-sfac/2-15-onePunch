import * as S from "./consultingWrite.style";
import { ChangeEvent, MouseEventHandler, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "antd";
import axios from "axios";
import { useRecoilState } from "recoil";
import apiInstance from "../../../../commons/apiInstance/apiInstance";
import { Phone } from "../../../../commons/libraries/utils";

export default function ConsultingWrite() {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [staffs, setStaffs] = useState([]);
  const [userId, setUserId] = useState("0");
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [memo, setMemo] = useState("");
  const [userName, setUserName] = useState("");

  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setClientName(event.target.value);
  };

  const onChangePhone = (event: ChangeEvent<HTMLInputElement>) => {
    setClientPhone(event.target.value);
  };

  const onChangeMemo = (event: any) => {
    setMemo(event.target.value);
  };

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

  const openModal = async () => {
    await apiInstance
      .get("/staffs?page=1&sort=createdAt%2CDesc")
      .then((response) => setStaffs(response.data.datas))
      .catch((error) => {
        console.log(error);
      });
    setIsVisible(true);
  };

  const closeModal = () => {
    setIsVisible(false);
  };

  const onClickSubmt = async () => {
    try {
      const response = await apiInstance.post("/schedules/counseling", {
        userId: Number(userId), // 변경할 필요가 있음
        clientName: clientName,
        clientPhone: clientPhone,
        memo: memo,
        startAt: startTime?.toISOString(), // Start and end times are assumed to be moment objects
        endAt: endTime?.toISOString(),
      });
      alert("일정을 등록했습니다.");
      console.log(response.data); // Here you can handle the response
    } catch (error) {
      console.error(error); // Handle error
    }
  };

  const onClickGetId: MouseEventHandler<HTMLDivElement> = async (event) => {
    try {
      const target = event.currentTarget;
      const postId = target.id;
      setUserId(postId);

      // 여기서 postId를 사용하여 해당 사용자의 이름을 가져오는 코드
      const response = await apiInstance.get(`/staffs/${postId}`);
      setUserName(response.data.name);

      setIsVisible(false);
    } catch (error) {
      console.error(error); // Handle error
    }
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
          <Modal
            title="담당 강사 선택"
            visible={isVisible}
            onOk={closeModal}
            onCancel={closeModal}
            footer={null}
          >
            {staffs.map((staff, index) => (
              <S.StaffBox key={index} id={staff.id} onClick={onClickGetId}>
                <S.SmileOut />
                <S.StaffTag>직원</S.StaffTag>
                <S.StaffName>{staff.name}</S.StaffName>
                <S.StaffPhone>{Phone(staff.phone)}</S.StaffPhone>
              </S.StaffBox>
            ))}
          </Modal>
          <S.ConsultingTitle>상담</S.ConsultingTitle>
          <S.Label>담당 강사 선택 </S.Label>

          {userId === "0" ? (
            <S.MemberChoiceButton onClick={openModal}>
              선택하기 +
            </S.MemberChoiceButton>
          ) : (
            <S.Box onClick={openModal}>
              <S.SmileOut />
              <S.Name>{userName}</S.Name>
            </S.Box>
          )}
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
          <S.Text onChange={onChangeName} placeholder="ex) 홍길동" />
          <S.Label>역락처 </S.Label>
          <S.Text onChange={onChangePhone} placeholder="ex) 01012341234" />
          <S.Label>일정 메모</S.Label>
          <S.TextAreaOut
            showCount
            maxLength={100}
            style={{ height: 120, resize: "none" }}
            placeholder="disable resize"
            onChange={onChangeMemo}
          />
        </S.Body>
        <S.Footer>
          <S.Button onClick={onClickSubmt}>완료</S.Button>
        </S.Footer>
      </S.Wrapper>
    </>
  );
}