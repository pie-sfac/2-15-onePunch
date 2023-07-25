import { UserOutlined } from "@ant-design/icons";
import { Day, Time, Time2 } from "../../../../commons/libraries/utils";
import * as S from "./consultingDetail.style";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiInstance from "../../../../commons/apiInstance/apiInstance";

interface ScheduleDetails {
  startAt?: string;
  endAt?: string;
  counselor?: Counselor;
  client?: Client;
  memo?: string;
}

interface Counselor {
  name: string;
}

interface Client {
  name: string;
  phone: string;
}

export default function ConsultingWrite() {
  const navigate = useNavigate();
  const { scheduleId } = useParams();
  const [scheduleDetails, setScheduleDetails] = useState<ScheduleDetails>({});
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    fetchScheduleDetails();
  }, []);

  const fetchScheduleDetails = async () => {
    try {
      const response = await apiInstance.get(
        `/schedules/counseling/${scheduleId}`
      );
      setScheduleDetails(response.data);
      console.log(scheduleDetails);
    } catch (error) {
      console.error(error);
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

  return (
    <>
      <S.Wrapper>
        {loadingProgress < 100 ? (
          <S.LoadingWrapper>
            <S.Loading percent={loadingProgress} status="active" />
          </S.LoadingWrapper>
        ) : (
          <>
            <S.Header>
              <S.OutBox onClick={handleOutBoxClick}>
                <S.LeftOut />
                <S.OutBoxTime>
                  {Time(scheduleDetails.startAt)} 상담
                </S.OutBoxTime>
              </S.OutBox>
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
                    <S.Button>상담기록</S.Button>
                    <S.Button>회원 정보 등록</S.Button>
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
