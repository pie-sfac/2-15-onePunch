import * as S from "./classWrite.style";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { useOnClickGetStaffId } from "../../../../commons/hooks/event/useOnClickGetStaffId";
import { useOnClickGetMemberId } from "../../../../commons/hooks/event/useOnClickGetMemberId";
import { usePostClass } from "../../../../commons/hooks/usePosts/usePostClass";
import { usePutClass } from "../../../../commons/hooks/usePut/usePutClass";
import { useGetFetchScheduleClass } from "../../../../commons/hooks/useGets/useGetFetchScheduleClass";
import { useGetFetchClassStaffs } from "../../../../commons/hooks/useGets/useGetFetchStaffs";
import { useGetFetchClassMembers } from "../../../../commons/hooks/useGets/useGetFetchMembers";
import SelectUserModal from "../../../commons/modal/modalSelectUser/selectUserModal.index";
import SubmitConfirmationModal from "../../../commons/modal/modalSubmitConfirmation/submitConfirmationModal.index";

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
  const [isSubmitModalVisible, setIsSubmitModalVisible] = useState(false);

  useEffect(() => {
    if (props.isEdit) {
      getMemberInfo();
    }
  }, []);

  // 수업 디테일 조회 _ 커스텀 hooks
  const { getMemberInfo } = useGetFetchScheduleClass(
    scheduleId,
    setInfo,
    setUserId,
    setUserName,
    setMemberId,
    setMemberName,
    setIssuedTicketName,
    setStartAt,
    setEndAt
  );

  // 개인 수업 수정 _ 커스텀 hooks
  const { onClickEdit } = usePutClass(
    startAt,
    day,
    startTime,
    info,
    endAt,
    endTime,
    scheduleId
  );

  // 개인 수업 등록 _ 커스텀 hooks
  const { onClickSubmit } = usePostClass(
    userId,
    issuedTicketId,
    day,
    startTime,
    endTime,
    setIsSubmitModalVisible
  );

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

  // 직원 조회 모달 오픈 _ 커스텀 hooks
  const { openModalStaff } = useGetFetchClassStaffs(
    setStaffs,
    setIsVisible,
    setSelect
  );

  // 회원 조회 모달 오픈 _ 커스텀 hooks
  const { openModalMember } = useGetFetchClassMembers(
    setMembers,
    setIsVisible,
    setSelect
  );

  return (
    <>
      <S.Wrapper>
        <S.Header>
          <S.OutBox onClick={() => navigate("/schedulePage/calendar")}>
            <S.LeftOut />
            <S.CreateScheduleText>
              일정 {props.isEdit ? "수정" : "생성"}
            </S.CreateScheduleText>
          </S.OutBox>
        </S.Header>
        <S.Body>
          <SelectUserModal
            isVisible={isVisible}
            onClose={() => setIsVisible(false)}
            members={members}
            staffs={staffs}
            select={select}
            onClickGetMemberId={onClickGetMemberId}
            onClickGetStaffId={onClickGetStaffId}
          />
          <SubmitConfirmationModal
            isVisible={isSubmitModalVisible}
            onClose={() => setIsSubmitModalVisible(false)}
          />
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
          <S.DateOut
            onChange={(value, date: any) => {
              setDay(date);
            }}
          />
          <S.Label>시간 선택</S.Label>
          <S.TimeBox>
            <S.TimeOut
              onChange={(value, date: any) => {
                setStartTime(date);
              }}
            />
            <S.TimeOut
              onChange={(value, date: any) => {
                setEndTime(date);
              }}
            />
          </S.TimeBox>
        </S.Body>
        <S.Footer>
          <S.Button onClick={props.isEdit ? onClickEdit : onClickSubmit}>
            완료
          </S.Button>
        </S.Footer>
      </S.Wrapper>
    </>
  );
}
