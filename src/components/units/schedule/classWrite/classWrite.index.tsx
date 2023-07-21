import * as S from "./classWrite.style";
import { MouseEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiInstance from "../../../../commons/apiInstance/apiInstance";
import { Modal } from "antd";
import { Phone } from "../../../../commons/libraries/utils";

export default function ClassWrite() {
  const navigate = useNavigate();
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [day, setDay] = useState(null);
  const [userId, setUserId] = useState("0");
  const [memberId, setMemberId] = useState("0");
  const [issuedTicketId, setIssuedTicketId] =
    useState("수업(수강권)을 선택해 주세요.");
  const [issuedTickets, setIssuedTickets] = useState([]);
  const [memberName, setMemberName] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [members, setMembers] = useState([]);
  const [userName, setUserName] = useState("");
  const [staffs, setStaffs] = useState([]);
  const [select, setSelect] = useState(false);

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

  const disabledEndTimeHours = () => {
    const hours = [];
    for (let i = startTime ? startTime.hour() : 0; i < 24; i++) {
      hours.push(i);
    }
    return hours;
  };
  const handleOutBoxClick = () => {
    navigate("/schedulePage/calendar"); // <-- navigate를 사용하여 '/schedulePage/calendar'로 이동합니다.
  };

  // <개인 수업 등록>

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

  // <회원 선택>

  const onClickGetMemberId: MouseEventHandler<HTMLDivElement> = async (
    event
  ) => {
    try {
      // 회원 아이디 가지고 오기
      const target = event.currentTarget;
      const postId = target.id;
      setMemberId(postId);
      console.log(postId);

      // 회원 선택 시, 초기 수업(수강권) 선택값으로 변경
      setIssuedTicketId("수업(수강권)을 선택해 주세요.");

      // 여기서 postId를 사용하여 해당 사용자의 이름을 가져오는 코드
      const responsed = await apiInstance.get(`/members/${postId}`);
      setMemberName(responsed.data.name);
      console.log(responsed.data.name);

      // 회원 아이디에 해당하는 이슈티켓 목록 가지고 오기
      const response = await apiInstance.get(
        `/members/${postId}/issued-tickets`
      );
      setIssuedTickets(response.data.issuedTickets);
      console.log(response.data.issuedTickets);
      setIsVisible(false);
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  // <직원 선택>

  const onClickGetStaffId: MouseEventHandler<HTMLDivElement> = async (
    event
  ) => {
    try {
      const target = event.currentTarget;
      const postId = target.id;
      setUserId(postId);

      // 여기서 postId를 사용하여 해당 사용자의 이름을 가져오는 코드
      const response = await apiInstance.get(`/staffs/${postId}`);
      setUserName(response.data.name);

      setIsVisible(false);
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

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
            onChange={(value) => setIssuedTicketId(value)}
            options={issuedTickets.map((ticket) => ({
              value: ticket.id,
              label: ticket.title,
            }))}
          />

          {/* <S.Label>참여 회원</S.Label>
          <S.BoxWrapper>
            <S.Box>
              <S.SmileOut />
              <S.Name>박회원1</S.Name>
            </S.Box>
            <S.Box>
              <S.SmileOut />
              <S.Name>김회원2</S.Name>
            </S.Box>
          </S.BoxWrapper> */}
          <S.Label>일자 선택</S.Label>
          <S.DateOut onChange={onDayChange} />
          <S.Label>시간 선택</S.Label>
          <S.TimeBox>
            <S.TimeOut onChange={onStartTimeChange} />
            <S.TimeOut
              onChange={onEndTimeChange}
              // disabledHours={disabledEndTimeHours}
            />
          </S.TimeBox>
        </S.Body>
        <S.Footer>
          <S.Button onClick={onClickSubmt}>완료</S.Button>
        </S.Footer>
      </S.Wrapper>
    </>
  );
}
