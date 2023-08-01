import * as S from "./classWrite.style";
import { MouseEventHandler, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiInstance from "../../../../commons/apiInstance/apiInstance";
import { Modal } from "antd";
import { Phone } from "../../../../commons/libraries/utils";
import moment from "moment";
import { useOnClickGetStaffId } from "../../../../commons/hooks/event/useOnClickGetStaffId";
import { useOnClickGetMemberId } from "../../../../commons/hooks/event/useOnClickGetMemberId";
import { usePostClass } from "../../../../commons/hooks/usePosts/usePostClass";

interface Member {
  id: string;
  name: string;
  phone: string;
}

interface Staff {
  id: string;
  name: string;
  phone: string;
}

interface Ticket {
  id: string;
  title: string;
}

export default function ClassWrite(props: any) {
  const navigate = useNavigate();
  const [memberId, setMemberId] = useState("0");
  const [issuedTickets, setIssuedTickets] = useState<Ticket[]>([]);
  const [memberName, setMemberName] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [userName, setUserName] = useState("");
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [select, setSelect] = useState(false);
  const { scheduleId } = useParams();

  // 개인 수업 등록 & 수정 _ 커스텀 hooks
  const {
    userId,
    setUserId,
    issuedTicketId,
    setIssuedTicketId,
    startTime,
    endTime,
    day,
    onStartTimeChange,
    onEndTimeChange,
    onDayChange,
    onClickSubmt,
    onClickEdit,
  } = usePostClass(scheduleId);

  // 직원 선택 _ 커스텀 hooks
  const { onClickGetStaffId } = useOnClickGetStaffId(
    setUserId,
    setUserName,
    setIsVisible
  );

  // 회원 선택 _ 커스텀 hooks
  const { onClickGetMemberId } = useOnClickGetMemberId(
    setMemberId,
    setIssuedTicketId,
    setMemberName,
    setIsVisible,
    setIssuedTickets
  );

  //< 모달 열기 직원 >

  const openModalStaff = async () => {
    await apiInstance
      .get("/staffs?page=1&sort=createdAt%2CDesc")
      .then((response) => setStaffs(response.data.datas))
      .catch((error) => {
        alert(error.response.data.message);
        navigate("/TemporaryLogin");
      });
    setIsVisible(true);
    setSelect(true);
  };

  // < 모달 열기 회원 >

  const openModalMember = async () => {
    await apiInstance
      .get("/members?page=1&size=10&sort=createdAt%2CDesc")
      .then((response) => setMembers(response.data.datas))
      .catch((error) => {
        alert(error.response.data.message);
        navigate("/TemporaryLogin");
      });
    setIsVisible(true);
    setSelect(false);
  };

  // < 모달 닫기 공통 >

  const closeModal = () => {
    setIsVisible(false);
  };

  const disabledEndTimeHours = () => {
    const hours = [];
    for (let i = startTime ? startTime.hour() : 0; i < 24; i++) {
      hours.push(i);
    }
    return hours;
  };

  const handleOutBoxClick = () => {
    navigate("/schedulePage/calendar");
  };

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
            title="회원 선택"
            visible={isVisible}
            onOk={closeModal}
            onCancel={closeModal}
            footer={null}
          >
            {!select ? (
              <>
                {members.map((member, index) => (
                  <S.MemberBox
                    key={index}
                    id={member.id}
                    onClick={onClickGetMemberId}
                  >
                    <S.SmileOut />
                    <S.MemberTag>회원</S.MemberTag>
                    <S.MemberName>{member.name}</S.MemberName>
                    <S.MemberPhone>{Phone(member.phone)}</S.MemberPhone>
                  </S.MemberBox>
                ))}
              </>
            ) : (
              <>
                {staffs.map((staff, index) => (
                  <S.StaffBox
                    key={index}
                    id={staff.id}
                    onClick={onClickGetStaffId}
                  >
                    <S.SmileOut />
                    <S.StaffTag>직원</S.StaffTag>
                    <S.StaffName>{staff.name}</S.StaffName>
                    <S.StaffPhone>{Phone(staff.phone)}</S.StaffPhone>
                  </S.StaffBox>
                ))}
              </>
            )}
          </Modal>
          <S.ClassTitle>개인 수업</S.ClassTitle>
          <S.Label>담당 강사 선택 </S.Label>
          {userId === "0" ? (
            <S.MemberChoiceButton onClick={openModalStaff}>
              선택하기 +
            </S.MemberChoiceButton>
          ) : (
            <S.Box onClick={openModalStaff}>
              <S.SmileOut />
              <S.Name>{userName}</S.Name>
            </S.Box>
          )}
          <S.Label>회원 선택 </S.Label>
          {memberId === "0" ? (
            <S.MemberChoiceButton onClick={openModalMember}>
              선택하기 +
            </S.MemberChoiceButton>
          ) : (
            <S.Box onClick={openModalMember}>
              <S.SmileOut />
              <S.Name>{memberName}</S.Name>
            </S.Box>
          )}
          <S.Label>수업(수강권) 선택 </S.Label>
          <S.SelectOut
            value={issuedTicketId}
            onChange={(value) => setIssuedTicketId(value as string)}
            options={issuedTickets.map((ticket) => ({
              value: ticket.id,
              label: ticket.title,
            }))}
          />
          <S.Label>일자 선택</S.Label>
          <S.DateOut onChange={onDayChange} />
          <S.Label>시간 선택</S.Label>
          <S.TimeBox>
            <S.TimeOut onChange={onStartTimeChange} />
            <S.TimeOut onChange={onEndTimeChange} />
          </S.TimeBox>
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
