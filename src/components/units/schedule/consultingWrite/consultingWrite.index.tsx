import * as S from "./consultingWrite.style";
import { ChangeEvent, MouseEventHandler, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Modal } from "antd";
import { Phone } from "../../../../commons/libraries/utils";
import { usePostCounseling } from "../../../../commons/hooks/usePosts/usePostCounseling";
import { useOnClickGetId } from "../../../../commons/hooks/event/useOnClickGetId";
import { usePutCounseling } from "../../../../commons/hooks/usePut/usePutCounseling";
import { useGetFetchStaffs } from "../../../../commons/hooks/useGets/useGetFetchStaffs";
import { useGetFetchScheduleCounseling } from "../../../../commons/hooks/useGets/useGetFetchScheduleCounseling";
import SubmitModal from "../../../commons/modal/modalConsultingSubmit/consultingSubmit.index";
import { Staff, InfoType } from "../../../../commons/types/types";

export default function ConsultingWrite(props: any) {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [userName, setUserName] = useState("");
  const { scheduleId } = useParams();
  const [info, setInfo] = useState<InfoType | null>(null);
  const [startTime, setStartTime] = useState<string | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);
  const [day, setDay] = useState<string | null>(null);
  const [userId, setUserId] = useState("0");
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [memo, setMemo] = useState("");
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");
  const [isSubmitModalVisible, setIsSubmitModalVisible] = useState(false);

  useEffect(() => {
    if (props.isEdit) {
      getMemberInfo();
    }
  }, []);

  // 상담 디테일 조회 _ 커스텀 hooks
  const { getMemberInfo } = useGetFetchScheduleCounseling(
    scheduleId,
    setInfo,
    setUserId,
    setUserName,
    setClientName,
    setClientPhone,
    setMemo,
    setStartAt,
    setEndAt
  );

  // 상담 등록 _ 커스텀 hooks
  const { onClickSubmit } = usePostCounseling(
    userId,
    clientName,
    clientPhone,
    memo,
    day,
    startTime,
    endTime,
    setIsSubmitModalVisible
  );

  // 상담 수정 _ 커스텀 hooks
  const { onClickEdit } = usePutCounseling(
    userId,
    clientName,
    clientPhone,
    memo,
    day,
    startTime,
    endTime,
    startAt,
    info,
    endAt,
    scheduleId
  );

  // 직원 아이디 조회 _ 커스텀 hooks
  const { onClickGetId } = useOnClickGetId(
    setUserId,
    setUserName,
    setIsVisible
  );

  // 직원 조회 모달 오픈 _ 커스텀 hooks
  const { onClickConsultingOpenModal } = useGetFetchStaffs(
    setStaffs,
    setIsVisible
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
          <Modal
            title="담당 강사 선택"
            visible={isVisible}
            onOk={() => setIsVisible(false)}
            onCancel={() => setIsVisible(false)}
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
          <SubmitModal
            isVisible={isSubmitModalVisible}
            onClose={() => setIsSubmitModalVisible(false)}
          />
          <S.ConsultingTitle>상담</S.ConsultingTitle>
          <S.Label>담당 강사 선택 </S.Label>

          {userId === "0" ? (
            <S.MemberChoiceButton onClick={onClickConsultingOpenModal}>
              선택하기 +
            </S.MemberChoiceButton>
          ) : (
            <S.Box onClick={onClickConsultingOpenModal}>
              <S.SmileOut />
              <S.Name>{userName}</S.Name>
            </S.Box>
          )}
          <S.Label>일자 선택</S.Label>
          <S.DateOut
            onChange={(value: any, dateString: string) => setDay(dateString)}
          />
          <S.Label>시간 선택</S.Label>
          <S.TimeBox>
            <S.TimeOut
              onChange={(value: any, dateString: string) =>
                setStartTime(dateString)
              }
            />
            <S.TimeOut
              onChange={(value: any, dateString: string) =>
                setEndTime(dateString)
              }
            />
          </S.TimeBox>
          <S.Label>이름 </S.Label>
          <S.Text
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setClientName(event.target.value)
            }
            defaultValue={clientName}
          />
          <S.Label>역락처 </S.Label>
          <S.Text
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setClientPhone(event.target.value)
            }
            defaultValue={clientPhone}
          />
          <S.Label>일정 메모</S.Label>
          <S.TextAreaOut
            showCount
            maxLength={100}
            style={{ height: 120, resize: "none" }}
            placeholder=""
            onChange={(event: any) => setMemo(event.target.value)}
            value={memo}
          />
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
