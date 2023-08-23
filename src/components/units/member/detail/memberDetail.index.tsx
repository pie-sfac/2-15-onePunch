import { useNavigate, useParams } from "react-router-dom";
import * as S from "./memberDetail.style";
import { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { useGetFetchDetails } from "../../../../commons/hooks/useGets/useGetFetchDetails";
import { useLoadingProgress } from "../../../../commons/hooks/status/useLoadingProgress";

export default function memberDetail() {
  const navigate = useNavigate();
  const { memberId } = useParams();

  // 회원 상세 조회 _ 커스텀 hooks
  const { memberDetails, setMemberDetails, fetchMemberDetails } =
    useGetFetchDetails(memberId);

  // 로딩  _ 커스텀 hooks
  const { loadingProgress } = useLoadingProgress();

  return (
    <S.Wrapper>
      {loadingProgress < 100 ? (
        <S.LoadingWrapper>
          <S.Loading percent={loadingProgress} status="active" />
        </S.LoadingWrapper>
      ) : (
        <>
          <S.Header>
            <S.OutBox onClick={() => navigate("/memberPage/list")}>
              <S.LeftOut />
              <S.OutBoxTitle>회원정보</S.OutBoxTitle>
            </S.OutBox>
            <S.ActionContainer>
              <S.Text onClick={() => navigate(`/memberPage/${memberId}/edit`)}>
                수정
              </S.Text>
              <S.Text>취소</S.Text>
            </S.ActionContainer>
          </S.Header>
          <S.Body>
            <S.MemberWrapper>
              <S.MemberTitleWrapper>
                <S.MemberTitle>회원 정보</S.MemberTitle>
                <S.TicketMsgBox>
                  <S.TicketBox
                    onClick={() => navigate(`/members/${memberId}/issued`)}
                  >
                    <S.TicketIcon
                      src="/images/icons/Document_24px.png"
                      alt="Document_24px"
                    />
                  </S.TicketBox>
                  <S.MsgBox>
                    <S.MsgIcon
                      src="/images/icons/Message_24px.png"
                      alt="Message_24px"
                    />
                  </S.MsgBox>
                </S.TicketMsgBox>
              </S.MemberTitleWrapper>
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
