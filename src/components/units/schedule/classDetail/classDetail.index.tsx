import { useNavigate, useParams } from "react-router-dom";
import * as S from "./classDetail.style";
import { useState, useEffect } from "react";
import apiInstance from "../../../../commons/apiInstance/apiInstance";
import { UserOutlined } from "@ant-design/icons";
import { Day, Phone, Time, Time2 } from "../../../../commons/libraries/utils";
import { Modal } from "antd";

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
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [select, setSelect] = useState(true);

  useEffect(() => {
    fetchScheduleDetails();
  }, []);

  const fetchScheduleDetails = async () => {
    try {
      const response = await apiInstance.get(
        `/schedules/private-lesson/${scheduleId}`
      );
      setScheduleDetails(response.data);
      console.log(scheduleDetails?.attendanceHistories?.[0]?.id);
      setAttendanceHistoryId(response.data?.attendanceHistories?.[0]?.id);
    } catch (error) {
      console.error(error);
    }
  };

  // < 출석 >

  const onClickAbsence = async () => {
    try {
      await apiInstance.post(
        `/attendance-histories/${attendanceHistoryId}/check-present`
      );

      fetchScheduleDetails();
      setIsVisible(false);
    } catch (error: any) {
      console.error(error.response.data.message);
    }
  };

  // < 결석 >

  const onClickAttendance = async () => {
    try {
      await apiInstance.post(
        `/attendance-histories/${attendanceHistoryId}/check-absent`
      );
      fetchScheduleDetails();
      setIsVisible(false);
    } catch (error: any) {
      console.error(error.response.data.message);
    }
  };

  const handleOutBoxClick = () => {
    navigate("/schedulePage/calendar"); // <-- navigate를 사용하여 '/schedulePage/calendar'로 이동합니다.
  };

  useEffect(() => {
    let interval: any = null;

    if (loadingProgress < 100) {
      interval = setInterval(() => {
        setLoadingProgress((loadingProgress) => loadingProgress + 20); // 10%에서 20%로 증가
      }, 100);
    } else if (loadingProgress >= 100) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [loadingProgress]);

  const closeModal = () => {
    setIsVisible(false);
  };

  const openModalMemberAbsence = async () => {
    setIsVisible(true);
    setSelect(true);
  };

  const openModalMemberAttendance = async () => {
    setIsVisible(true);
    setSelect(false);
  };

  return (
    <S.Wrapper>
      <S.Modals
        visible={isVisible}
        onOk={closeModal}
        onCancel={closeModal}
        footer={null}
      >
        {select ? (
          <>
            {" "}
            <S.ModalWrapper>
              <S.ModalTitle>출석 확인</S.ModalTitle>
              <S.ModalText>출석 처리하시겠습니까?</S.ModalText>
              <S.ModalButtonWrapper>
                <S.ModalNegativeButton onClick={closeModal}>
                  아니요
                </S.ModalNegativeButton>{" "}
                <S.ModalPositiveButton onClick={onClickAbsence}>
                  예
                </S.ModalPositiveButton>{" "}
              </S.ModalButtonWrapper>
            </S.ModalWrapper>
          </>
        ) : (
          <>
            <S.ModalWrapper>
              <S.ModalTitle>결석처리</S.ModalTitle>
              <S.ModalText>결석 처리를 진행하시겠습니까?</S.ModalText>
              <S.ModalButtonWrapper>
                <S.ModalNegativeButton onClick={closeModal}>
                  취소
                </S.ModalNegativeButton>{" "}
                <S.ModalPositiveButton onClick={onClickAttendance}>
                  확인
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
            <S.OutBox onClick={handleOutBoxClick}>
              <S.LeftOut />
              <S.OutBoxTime>{Time(scheduleDetails.startAt)}</S.OutBoxTime>
              <S.OutBoxName>
                {scheduleDetails?.attendanceHistories?.[0]?.member.name}
              </S.OutBoxName>
            </S.OutBox>
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
                      onClick={openModalMemberAbsence}
                    >
                      출석
                    </S.AbsenceButton>
                    <S.AttendanceButton
                      isAbsent={
                        scheduleDetails?.attendanceHistories?.[0]?.status ===
                        "ABSENT"
                      }
                      onClick={openModalMemberAttendance}
                    >
                      결석
                    </S.AttendanceButton>
                  </S.PMBTie>
                </S.PMIBox>
                <S.Line />
                <S.PMSBox>
                  <S.PMSTie>
                    <S.PMSLabel>출결 상태</S.PMSLabel>
                    <S.PMS>
                      {scheduleDetails?.attendanceHistories?.[0]?.status}
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
