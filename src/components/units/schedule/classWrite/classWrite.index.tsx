import * as S from "./classWrite.style";
import { MouseEventHandler, useEffect, useState } from "react";
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

interface InfoType {
  counselor: {
    id: string;
    name: string;
  };
  client: {
    name: string;
    phone: string;
  };
  memo: string;
  startAt: string;
  endAt: string;
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
  const [userId, setUserId] = useState("0");
  const [issuedTicketId, setIssuedTicketId] =
    useState("수업(수강권)을 선택해 주세요.");
  const [day, setDay] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<moment.Moment | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);
  const [info, setInfo] = useState<InfoType | null>(null);
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");
  const [issuedTicketName, setIssuedTicketName] = useState("");

  useEffect(() => {
    if (props.isEdit) {
      const getMemberInfo = async () => {
        const response = await apiInstance.get(
          `/schedules/private-lesson/${scheduleId}`
        );
        setInfo(response.data);
        setUserId(response.data.tutor.id);
        setUserName(response.data.tutor.name);
        setMemberId(response.data.attendanceHistories[0]?.member.id);
        setMemberName(response.data.attendanceHistories[0]?.member.name);
        setStartAt(response.data.startAt);
        setEndAt(response.data.endAt);
        setIssuedTicketName(response.data.issuedTicket.title);
      };
      getMemberInfo();
    }
  }, []);

  const onStartTimeChange = (value: any, date: any) => {
    setStartTime(date);
    console.log(date);
  };

  const onEndTimeChange = (value: any, date: any) => {
    setEndTime(date);
    console.log(date);
  };

  const onDayChange = (value: any, date: any) => {
    setDay(date);
    console.log(date);
  };

  const onClickSubmt = async () => {
    try {
      const response = await apiInstance.post("/schedules/private-lesson", {
        userId: Number(userId), // 변경할 필요가 있음
        issuedTicketId: Number(issuedTicketId),
        startAt: `${day}T${startTime}`,
        endAt: `${day}T${endTime}`,
      });
      alert("일정을 등록했습니다.");
      navigate("/schedulePage/calendar");
      console.log(response.data); // Here you can handle the response
    } catch (error: any) {
      console.error(error.response.data.message); // Handle error
      alert(error.response.data.message);
    }
  };

  const onClickEdit = async () => {
    const updateUserInput: {
      userId?: any;
      clientName?: any;
      clientPhone?: any;
      memo?: any;
      startAt?: any;
      endAt?: any;
      counselingRecordContent?: any;
    } = {};
    updateUserInput.memo = "";
    if (startAt !== "" && day !== null && startTime !== null) {
      updateUserInput.startAt = `${day}T${startTime}`;
    } else {
      updateUserInput.startAt = info?.startAt;
    }
    if (endAt !== "" && day !== null && endTime !== null) {
      updateUserInput.endAt = `${day}T${endTime}`;
    } else {
      updateUserInput.endAt = info?.endAt;
    }

    try {
      const response = await apiInstance.put(
        `/schedules/private-lesson/${scheduleId}`,
        { ...updateUserInput }
      );
      alert("일정을 수정했습니다.");
      navigate("/schedulePage/calendar");
      console.log(response.data);
    } catch (error: any) {
      console.error(error.response.data.message);
      alert(error.response.data.message);
    }
  };

  // 개인 수업 등록 & 수정 _ 커스텀 hooks
  // const {
  //   userId,
  //   setUserId,
  //   issuedTicketId,
  //   setIssuedTicketId,
  //   startTime,
  //   endTime,
  //   day,
  //   onStartTimeChange,
  //   onEndTimeChange,
  //   onDayChange,
  //   onClickSubmt,
  //   onClickEdit,
  // } = usePostClass(scheduleId);

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
            <S.Box onClick={props.isEdit ? undefined : openModalStaff}>
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
            <S.Box onClick={props.isEdit ? undefined : openModalMember}>
              <S.SmileOut />
              <S.Name>{memberName}</S.Name>
            </S.Box>
          )}
          <S.Label>수업(수강권) 선택 </S.Label>
          <S.SelectOut
            value={props.isEdit ? issuedTicketName : issuedTicketId}
            onChange={(value) => setIssuedTicketId(value as string)}
            options={issuedTickets.map((ticket) => ({
              value: ticket.id,
              label: ticket.title,
            }))}
            disabled={props.isEdit}
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
