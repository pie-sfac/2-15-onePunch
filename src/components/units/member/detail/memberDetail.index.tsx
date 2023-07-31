import { useNavigate, useParams } from "react-router-dom";
import * as S from "./memberDetail.style";
import { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { useGetFetchDetails } from "../../../../commons/hooks/useGets/useGetFetchDetails";

export default function memberDetail() {
  const navigate = useNavigate();
  const { memberId } = useParams();
  const [loadingProgress, setLoadingProgress] = useState(0);

  // 회원 상세 조회 _ 커스텀 hooks
  const { memberDetails, setMemberDetails, fetchMemberDetails } =
    useGetFetchDetails(memberId);

  const handleOutBoxClick = () => {
    navigate("/memberPage/list");
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
              <S.OutBoxTitle>회원정보</S.OutBoxTitle>
            </S.OutBox>
          </S.Header>
          <S.Body>
            <S.MemberWrapper>
              <S.MemberTitle>회원 정보</S.MemberTitle>
              <S.PMBox>
                <S.PMIBox>
                  <S.AvatarOut size={23} icon={<UserOutlined />} />
                  <S.PMS>{memberDetails.name}</S.PMS>
                  <S.PMS>{memberDetails.phone}</S.PMS>
                  <S.PMS>{memberDetails.birthDate}</S.PMS>
                  <S.PMS>{memberDetails.job}</S.PMS>
                </S.PMIBox>
              </S.PMBox>
            </S.MemberWrapper>
            <S.MemberNav>
              <S.Record>기록지</S.Record>
              <S.Notification>알림메시지</S.Notification>
              <S.Album>앨범</S.Album>
            </S.MemberNav>
            <S.ImageTextWrapper>
              <S.NoteIcon src="/images/home/Note.png" alt="" />
              <S.ActionText>기록을 작성해 주세요</S.ActionText>
            </S.ImageTextWrapper>
            <S.FixedButton>+ 추가하기</S.FixedButton>
          </S.Body>
        </>
      )}
    </S.Wrapper>
  );
}
