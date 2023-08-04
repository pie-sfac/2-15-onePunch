import { useNavigate, useParams } from "react-router-dom";
import * as S from "./classDetail.style";
import { useState, useEffect } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Day, Phone, Time, Time2 } from "../../../../commons/libraries/utils";
import { useGetFetchScheduleClassDetail } from "../../../../commons/hooks/useGets/useGetFetchScheduleClass";
import { usePostClassAbsence } from "../../../../commons/hooks/usePosts/usePostClassAbsence";
import { usePostClassAttendance } from "../../../../commons/hooks/usePosts/usePostClassAttendance";
import { useAttendanceStatus } from "../../../../commons/hooks/status/useAttendanceStatus";
import { usePostClassCancel } from "../../../../commons/hooks/usePosts/usePostClassCancel";
import { useLoadingProgress } from "../../../../commons/hooks/status/useLoadingProgress";

interface Member {
  name: string;
  phone: number;
}

interface Tutor {
  name: string;
}

interface AttendanceHistory {
  member: Member;
  status: string;
  id: any;
}

interface IssuedTicket {
  title: string;
  availableReservationCount: number;
  remainingCount: number;
}

interface ScheduleDetails {
  startAt?: string;
  endAt?: string;
  attendanceHistories?: AttendanceHistory[];
  issuedTicket?: IssuedTicket;
  tutor?: Tutor;
}

export default function ClassDetail() {
  const navigate = useNavigate();
  const { scheduleId } = useParams();
  const [scheduleDetails, setScheduleDetails] = useState<ScheduleDetails>({});
  const [attendanceHistoryId, setAttendanceHistoryId] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [select, setSelect] = useState("");

  // 수업 디테일 조회 _ 커스텀 hooks
  const { fetchScheduleDetails } = useGetFetchScheduleClassDetail(
    scheduleId,
    setScheduleDetails,
    setAttendanceHistoryId
  );

  // 수업 출석  _ 커스텀 hooks
  const { onClickAbsence } = usePostClassAbsence(
    attendanceHistoryId,
    fetchScheduleDetails,
    setIsVisible
  );

  // 수업 결석  _ 커스텀 hooks
  const { onClickAttendance } = usePostClassAttendance(
    attendanceHistoryId,
    fetchScheduleDetails,
    setIsVisible
  );

  // 수업 출결 상태  _ 커스텀 hooks
  const { attendanceStatus } = useAttendanceStatus();

  // 수업 취소  _ 커스텀 hooks
  const { onClickCancel } = usePostClassCancel(scheduleId);

  // 로딩  _ 커스텀 hooks
  const { loadingProgress } = useLoadingProgress();

  useEffect(() => {
    fetchScheduleDetails();
  }, []);

  return (
    <S.Wrapper>
      <S.Modals
        visible={isVisible}
        onOk={() => setIsVisible(false)}
        onCancel={() => setIsVisible(false)}
        footer={null}
      >
        {select === "결석" ? (
          <>
            {" "}
            <S.ModalWrapper>
              <S.ModalTitle>출석 확인</S.ModalTitle>
              <S.ModalText>출석 처리하시겠습니까?</S.ModalText>
              <S.ModalButtonWrapper>
                <S.ModalNegativeButton onClick={() => setIsVisible(false)}>
                  아니요
                </S.ModalNegativeButton>{" "}
                <S.ModalPositiveButton onClick={onClickAbsence}>
                  예
                </S.ModalPositiveButton>{" "}
              </S.ModalButtonWrapper>
            </S.ModalWrapper>
          </>
        ) : select === "출석" ? (
          <>
            <S.ModalWrapper>
              <S.ModalTitle>결석처리</S.ModalTitle>
              <S.ModalText>결석 처리를 진행하시겠습니까?</S.ModalText>
              <S.ModalButtonWrapper>
                <S.ModalNegativeButton onClick={() => setIsVisible(false)}>
                  취소
                </S.ModalNegativeButton>{" "}
                <S.ModalPositiveButton onClick={onClickAttendance}>
                  확인
                </S.ModalPositiveButton>
              </S.ModalButtonWrapper>
            </S.ModalWrapper>
          </>
        ) : (
          <>
            <S.ModalWrapper>
              <S.ModalTitle>수업 일정 취소</S.ModalTitle>
              <S.ModalText>취소를 진행하시겠습니까?</S.ModalText>
              <S.ModalButtonWrapper>
                <S.ModalNegativeButton onClick={() => setIsVisible(false)}>
                  아니요
                </S.ModalNegativeButton>{" "}
                <S.ModalPositiveButton onClick={onClickCancel}>
                  예
                </S.ModalPositiveButton>
              </S.ModalButtonWrapper>
            </S.ModalWrapper>
          </>
        )}
      </S.Modals>
      {loadingProgress < 100 ? (
        <S.LoadingWrapper>
          <S.Loading percent={loadingProgress} status="active" />
        </S.LoadingWrapper>
      ) : (
        <>
          <S.Header>
            <S.OutBox onClick={() => navigate("/schedulePage/calendar")}>
              <S.LeftOut />
              <S.OutBoxTime>{Time(scheduleDetails.startAt)}</S.OutBoxTime>
              <S.OutBoxName>
                {scheduleDetails?.attendanceHistories?.[0]?.member.name}
              </S.OutBoxName>
            </S.OutBox>
            <S.ActionContainer>
              <S.ActionText
                onClick={() =>
                  navigate(`/schedulePage/class/${scheduleId}/edit`)
                }
              >
                변경
              </S.ActionText>

              <S.ActionText
                onClick={() => {
                  setIsVisible(true);
                  setSelect("취소");
                }}
              >
                취소
              </S.ActionText>
            </S.ActionContainer>
          </S.Header>
          <S.TitleBox>
            <S.Title>개인 수업 일정</S.Title>
            <S.ClassTitle>수업 정보</S.ClassTitle>
          </S.TitleBox>
          <S.Body>
            <S.CIWrapper>
              <S.CIBox>
                <S.Label>일정</S.Label>
                <S.CI>{Day(scheduleDetails.startAt)}</S.CI>
                <S.Label>시간</S.Label>
                <S.CI>
                  {Time2(scheduleDetails?.startAt)}~
                  {Time2(scheduleDetails?.endAt)}
                </S.CI>
                <S.Label>강사</S.Label>
                <S.CI>{scheduleDetails?.tutor?.name}</S.CI>
              </S.CIBox>
            </S.CIWrapper>
            <S.PMWrapper>
              <S.PMTitle>참여회원</S.PMTitle>
              <S.PMBox>
                <S.PMIBox>
                  <S.AvatarOut size={23} icon={<UserOutlined />} />
                  <S.PMITie>
                    <S.PMName>
                      {scheduleDetails?.attendanceHistories?.[0]?.member.name}
                    </S.PMName>
                    <S.PMPhone>
                      {scheduleDetails.attendanceHistories?.[0]?.member?.phone}
                    </S.PMPhone>
                  </S.PMITie>
                  <S.PMBTie>
                    <S.AbsenceButton
                      isPresent={
                        scheduleDetails?.attendanceHistories?.[0]?.status ===
                        "PRESENT"
                      }
                      onClick={() => {
                        setIsVisible(true);
                        setSelect("결석");
                      }}
                    >
                      출석
                    </S.AbsenceButton>
                    <S.AttendanceButton
                      isAbsent={
                        scheduleDetails?.attendanceHistories?.[0]?.status ===
                        "ABSENT"
                      }
                      onClick={() => {
                        setIsVisible(true);
                        setSelect("출석");
                      }}
                    >
                      결석
                    </S.AttendanceButton>
                  </S.PMBTie>
                </S.PMIBox>
                <S.Line />
                <S.PMSBox>
                  <S.PMSTie>
                    <S.PMSLabel>출결 상태</S.PMSLabel>
                    <S.PMS
                      style={{
                        color: attendanceStatus(
                          scheduleDetails?.attendanceHistories?.[0]?.status
                        ).color,
                      }}
                    >
                      {
                        attendanceStatus(
                          scheduleDetails?.attendanceHistories?.[0]?.status
                        ).message
                      }
                    </S.PMS>
                  </S.PMSTie>
                  <S.PMSTie>
                    <S.PMSLabel>수강권</S.PMSLabel>
                    <S.PMS>{scheduleDetails?.issuedTicket?.title}</S.PMS>
                  </S.PMSTie>
                  <S.PMSTie>
                    <S.PMSLabel>잔여</S.PMSLabel>
                    <S.PMS>
                      {scheduleDetails?.issuedTicket?.remainingCount}회 (총{" "}
                      {scheduleDetails?.issuedTicket?.remainingCount}회)
                    </S.PMS>
                  </S.PMSTie>
                  <S.PMSTie>
                    <S.PMSLabel>예약 가능</S.PMSLabel>
                    <S.PMS>
                      {scheduleDetails?.issuedTicket?.availableReservationCount}
                      회 (총 {scheduleDetails?.issuedTicket?.remainingCount}회)
                    </S.PMS>
                  </S.PMSTie>
                  <S.PMSBTie>
                    <S.RecordButton>기록 작성하기</S.RecordButton>
                    <S.ReportButton>퍼스널 레포트 보내기</S.ReportButton>
                  </S.PMSBTie>
                </S.PMSBox>
              </S.PMBox>
            </S.PMWrapper>
          </S.Body>
        </>
      )}
    </S.Wrapper>
  );
}
