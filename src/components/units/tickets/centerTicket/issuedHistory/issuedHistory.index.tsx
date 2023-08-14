import React, { useEffect, useState } from "react";
import * as S from "./issuedHistory.style";
import { useNavigate, useParams } from "react-router-dom";
import apiInstance from "../../../../../commons/apiInstance/apiInstance";
import ConvertDate from "../../../../commons/converter/convertDate";

export interface IssuedHistoryType {
  ownerName: string;
  ownerPhone: string;
  tutorName: string;
  remainingTimes: number;
  startAt: string;
  endAt: string;
}

const IssuedHistory = () => {
  const navigate = useNavigate();
  const { ticketId } = useParams();
  const [issuedInfo, setIssuedInfo] = useState<
    IssuedHistoryType[] | undefined
  >();
  const [totalCount, setTotalCount] = useState<number | undefined>(); // 총 건수

  useEffect(() => {
    apiInstance
      .get(`/tickets/${ticketId}/issued-tickets`)
      .then((response) => {
        const info: IssuedHistoryType[] = response.data.datas.map(
          (data: any) => ({
            ownerName: data.owners[0]?.name || "",
            ownerPhone: data.owners[0]?.phone || "",
            tutorName: data.privateTutor.name,
            remainingTimes: data.remainingTimes,
            startAt: data.startAt,
            endAt: data.endAt,
          })
        );
        setIssuedInfo(info);
        setTotalCount(response.data.meta.totalCount);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <S.IssuedTicketHeader>
        <S.Appbar>
          <S.LeftOut onClick={() => navigate(-1)} />
          <S.AppbarTitle>부여내역</S.AppbarTitle>
        </S.Appbar>
      </S.IssuedTicketHeader>
      <S.Body>
        <S.TotalCount>총 {totalCount}건</S.TotalCount>
        <S.Wrapper>
          {issuedInfo?.map((info, index) => (
            <S.MemBox key={index}>
              <S.Name>{info.ownerName}</S.Name>
              <S.Text>{info.ownerPhone}</S.Text>
              <S.Text>{info.tutorName}</S.Text>
              <S.Text>잔여 {info.remainingTimes}회</S.Text>
              <S.Text>
                {ConvertDate(info.startAt)} <br/> - {ConvertDate(info.endAt)}
              </S.Text>
            </S.MemBox>
          ))}
        </S.Wrapper>
      </S.Body>
    </>
  );
};

export default IssuedHistory;
