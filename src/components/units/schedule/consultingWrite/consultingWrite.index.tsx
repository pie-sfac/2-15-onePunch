import * as S from "./consultingWrite.style";
import { ChangeEvent, MouseEventHandler, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Modal } from "antd";
import apiInstance from "../../../../commons/apiInstance/apiInstance";
import { Phone } from "../../../../commons/libraries/utils";
import { usePostCounseling } from "../../../../commons/hooks/usePosts/usePostCounseling";
import { useOnClickGetId } from "../../../../commons/hooks/event/useOnClickGetId";

interface Staff {
  id: string;
  name: string;
  phone: string;
}

export default function ConsultingWrite(props: any) {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [userName, setUserName] = useState("");
  const { scheduleId } = useParams();
  const [info, setInfo] = useState(null);

  // 상담 등록 _ 커스텀 hooks
  const {
    userId,
    setUserId,
    clientName,
    clientPhone,
    memo,
    startTime,
    endTime,
    day,
    onChangeName,
    onChangePhone,
    onChangeMemo,
    onStartTimeChange,
    onEndTimeChange,
    onDayChange,
    onClickSubmt,
    onClickEdit,
  } = usePostCounseling(scheduleId);

  // 직원 상세 조회 _ 커스텀 hooks
  const { onClickGetId } = useOnClickGetId(
    setUserId,
    setUserName,
    setIsVisible
  );

  const handleOutBoxClick = () => {
    navigate("/schedulePage/calendar");
  };

  const openModal = async () => {
    await apiInstance
      .get("/staffs?page=1&sort=createdAt%2CDesc")
      .then((response) => setStaffs(response.data.datas))
      .catch((error) => {
        alert(error.response.data.message);
        navigate("/TemporaryLogin");
      });
    setIsVisible(true);
  };

  const closeModal = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    const getMemberInfo = async () => {
      const response = await apiInstance.get(
        `/schedules/counseling/${scheduleId}`
      );
      setInfo(response.data);
      console.log(info);
    };
    getMemberInfo();
  }, [scheduleId]);

  return (
    <>
      <S.Wrapper>
        <S.Header>
          <S.OutBox onClick={handleOutBoxClick}>
            <S.LeftOut />
            <S.CreateScheduleText>
              일정 {props.isEdit ? "수정" : "생성"}
            </S.CreateScheduleText>
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
          <S.DateOut onChange={onDayChange} />
          <S.Label>시간 선택</S.Label>
          <S.TimeBox>
            <S.TimeOut onChange={onStartTimeChange} />
            <S.TimeOut onChange={onEndTimeChange} />
          </S.TimeBox>
          <S.Label>이름 </S.Label>
          <S.Text onChange={onChangeName} placeholder="홍길동" />
          <S.Label>역락처 </S.Label>
          <S.Text onChange={onChangePhone} placeholder="010-1234-1234" />
          <S.Label>일정 메모</S.Label>
          <S.TextAreaOut
            showCount
            maxLength={100}
            style={{ height: 120, resize: "none" }}
            placeholder=""
            onChange={onChangeMemo}
          />
        </S.Body>
        <S.Footer>
          <S.Button onClick={props.isEdit ? onClickEdit : onClickSubmt}>
            완료
          </S.Button>
        </S.Footer>
      </S.Wrapper>
    </>
  );
}
