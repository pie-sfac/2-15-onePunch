import { UserOutlined } from "@ant-design/icons";
import { Day, Time, Time2 } from "../../../../commons/libraries/utils";
import * as S from "./consultingDetail.style";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiInstance from "../../../../commons/apiInstance/apiInstance";
import { useGetFetchScheduleDetails } from "../../../../commons/hooks/useGets/useGetFetchScheduleDetails";

export default function ConsultingWrite() {
  const navigate = useNavigate();
  const { scheduleId } = useParams();
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [memo, setMemo] = useState("");
  const [select, setSelect] = useState("");

  // 상담 상세 조회 _ 커스텀 hooks
  const { scheduleDetails, setScheduleDetails, fetchScheduleDetails } =
    useGetFetchScheduleDetails(scheduleId);

  const handleOutBoxClick = () => {
    navigate("/schedulePage/calendar");
  };

  const handleAddMemberClick = () => {
    navigate("/memberPage/add");
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

  const openModalCounselingRecord = async () => {
    setIsVisible(true);
    setSelect("상담기록");
  };

  const onChangeMemo = (event: any) => {
    setMemo(event.target.value);
  };

  const onClickCancel = async () => {
    try {
      const response = await apiInstance.post(
        `/schedules/${scheduleId}/cancel`
      );
      navigate("/schedulePage/calendar");
      console.log(response);
      console.log(scheduleId);
    } catch (error: any) {
      console.error(error.response.data.message);
      alert(error.response.data.message);
    }
  };

  const onClickEdit = async () => {
    navigate(`/schedulePage/counseling/${scheduleId}/edit`);
  };

  const openModalMemberCancel = async () => {
    setIsVisible(true);
    setSelect("취소");
  };

  return (
    <>
      <S.Wrapper>
        {loadingProgress < 100 ? (
          <S.LoadingWrapper>
            <S.Loading percent={loadingProgress} status="active" />
          </S.LoadingWrapper>
        ) : (
          <>
            <S.Modals
              visible={isVisible}
              onOk={closeModal}
              onCancel={closeModal}
              footer={null}
            >
              {select === "취소" ? (
                <>
                  <S.ModalWrapper>
                    <S.ModalTitle>수업 일정 취소</S.ModalTitle>
                    <S.ModalText>취소를 진행하시겠습니까?</S.ModalText>
                    <S.ModalButtonWrapper>
                      <S.ModalNegativeButton onClick={closeModal}>
                        아니요
                      </S.ModalNegativeButton>{" "}
                      <S.ModalPositiveButton onClick={onClickCancel}>
                        예
                      </S.ModalPositiveButton>
                    </S.ModalButtonWrapper>
                  </S.ModalWrapper>
                </>
              ) : (
                <>
                  <S.ModalTitle>상담 기록</S.ModalTitle>
                  <S.ModalText>
                    회원님과 나눈 내용을 자유롭게 작성해 보세요.
                  </S.ModalText>
                  <S.TextAreaOut
                    showCount
                    maxLength={1000}
                    style={{ height: 280, resize: "none" }}
                    placeholder=""
                    onChange={onChangeMemo}
                  />
                  <S.ButtonContainer>
                    <S.CancelButton onClick={closeModal}>취소</S.CancelButton>
                    <S.SaveButton>저장</S.SaveButton>
                  </S.ButtonContainer>
                </>
              )}
            </S.Modals>
            <S.Header>
              <S.OutBox onClick={handleOutBoxClick}>
                <S.LeftOut />
                <S.OutBoxTime>
                  {Time(scheduleDetails.startAt)} 상담
                </S.OutBoxTime>
              </S.OutBox>
              <S.ActionContainer>
                <S.ActionText onClick={onClickEdit}>변경</S.ActionText>
                <S.ActionText onClick={openModalMemberCancel}>
                  취소
                </S.ActionText>
              </S.ActionContainer>
            </S.Header>
            <S.TitleBox>
              <S.Title>상담</S.Title>
              <S.ConsultationTitle>상담 정보</S.ConsultationTitle>
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
                  <S.CI>{scheduleDetails?.counselor?.name}</S.CI>
                </S.CIBox>
              </S.CIWrapper>
              <S.PMemoWrapper>
                <S.PMTitle>상담 회원</S.PMTitle>
                <S.PMBox>
                  <S.AvatarOut size={23} icon={<UserOutlined />} />
                  <S.PMITie>
                    <S.PMName>{scheduleDetails?.client?.name}</S.PMName>
                    <S.PMPhone>({scheduleDetails?.client?.phone})</S.PMPhone>
                  </S.PMITie>
                  <S.PMSBTie>
                    <S.Button onClick={openModalCounselingRecord}>
                      상담기록
                    </S.Button>
                    <S.Button onClick={handleAddMemberClick}>
                      회원 정보 등록
                    </S.Button>
                  </S.PMSBTie>
                </S.PMBox>
              </S.PMemoWrapper>
              <S.PMWrapper>
                <S.PMTitle>일정 메모</S.PMTitle>
                <S.PMemoMBox>{scheduleDetails?.memo}</S.PMemoMBox>
              </S.PMWrapper>
            </S.Body>
          </>
        )}
      </S.Wrapper>
    </>
  );
}
