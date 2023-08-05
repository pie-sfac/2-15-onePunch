import React, { useEffect, useState } from "react";
import apiInstance from "../../../../../commons/apiInstance/apiInstance";
import { useNavigate, useParams } from "react-router-dom";
import { IssuedTicket } from "../list/issuedTicketList.index";
import * as S from "./issuedTicketDetail.style";
import ConvertTermUnit from "../../../../commons/converter/convertTermUnit";
import ConvertDate from "../../../../commons/converter/convertDate";
import ConvertLessonType from "../../../../commons/converter/convertLessonType";

const IssuedTicketDetail = () => {
  const navigate = useNavigate();
  const { issuedTicketId } = useParams<{ issuedTicketId: string }>();
  const [issuedTicketDetail, setIssuedTicketDetail] =
    useState<IssuedTicket | null>(null);
  // issued ticket detail 가져오기
  useEffect(() => {
    // console.log("ID from URL:", memberId);
    apiInstance
      .get(`/issued-tickets/${issuedTicketId}`)
      .then((response) => {
        console.log(response.data);
        setIssuedTicketDetail(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [issuedTicketId]);

  return (
    <>
      {issuedTicketDetail && (
        <>
          <S.IssuedTicketHeader>
            <S.Appbar>
              <S.FlexRow>
                <S.LeftOut onClick={() => navigate(-1)} />
                <S.AppbarTitle>수강권 상세</S.AppbarTitle>
              </S.FlexRow>
              <S.Edit>편집</S.Edit>
            </S.Appbar>
          </S.IssuedTicketHeader>
          <S.Body>
            <S.InnerBox>
              <S.Ticket_Title>{issuedTicketDetail.title}</S.Ticket_Title>
              <S.Ticket_LessonType>
                {ConvertLessonType(issuedTicketDetail.lessonType)}
              </S.Ticket_LessonType>
            </S.InnerBox>
            <S.InfoWrapper>
              <S.Title>수강권 정보</S.Title>
              <S.Ticket_Info key={issuedTicketDetail.id}>
                <S.InnerBox>
                  <S.InfoTitle>기본 횟수</S.InfoTitle>

                  <S.StrongText>
                    {issuedTicketDetail.defaultCount}회
                  </S.StrongText>
                </S.InnerBox>
                <S.InnerBox>
                  <S.InfoTitle>서비스 횟수</S.InfoTitle>

                  <S.StrongText>
                    {issuedTicketDetail.serviceCount}회
                  </S.StrongText>
                </S.InnerBox>
                <S.InnerBox>
                  <S.InfoTitle>잔여 횟수</S.InfoTitle>

                  <S.StrongText>
                    {issuedTicketDetail.remainingCount}회
                  </S.StrongText>
                </S.InnerBox>
                <S.InnerBox>
                  <S.InfoTitle>예약 가능 잔여 횟수</S.InfoTitle>

                  <S.StrongText>
                    {issuedTicketDetail.availableReservationCount}회
                  </S.StrongText>
                </S.InnerBox>
                <S.InnerBox>
                  <S.InfoTitle>수강권 기간</S.InfoTitle>

                  <S.StrongText>
                    {issuedTicketDetail.defaultTerm}
                    {ConvertTermUnit(issuedTicketDetail.defaultTermUnit)}
                  </S.StrongText>
                </S.InnerBox>
                <S.InnerBox>
                  <S.InfoTitle>유효 기간</S.InfoTitle>

                  <S.StrongText>
                    {ConvertDate(issuedTicketDetail.startAt)} -
                    {ConvertDate(issuedTicketDetail.endAt)}
                  </S.StrongText>
                </S.InnerBox>
                <S.InnerBox>
                  <S.InfoTitle>담당 강사</S.InfoTitle>

                  <S.StrongText>
                    {issuedTicketDetail.privateTutor.name}
                  </S.StrongText>
                </S.InnerBox>
              </S.Ticket_Info>
            </S.InfoWrapper>
          </S.Body>
        </>
      )}
    </>
  );
};

export default IssuedTicketDetail;
