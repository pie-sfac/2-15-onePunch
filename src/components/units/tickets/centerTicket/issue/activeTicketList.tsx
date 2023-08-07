import React, { useEffect, useState } from "react";
import RenderTickets from "../renderTickets/renderTickets";
import apiInstance from "../../../../../commons/apiInstance/apiInstance";
import { TicketType } from "../Ticket/Ticket";
import { useNavigate, useParams } from "react-router-dom";
import * as S from "./activeTicketList.style";

const ActiveTicketList = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const { memberId } = useParams<{ memberId: string }>();

  useEffect(() => {
    apiInstance
      .get(`/tickets`)
      .then((response) => {
        console.log(response.data.tickets);
        setTickets(response.data.tickets);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // 판매중인 티켓만 필터링
  const activeTickets = tickets.filter((tickets) => tickets.isActive);

  const handleIssueTicket = async (ticketId: number): Promise<any> => {
    navigate(`/${memberId}/tickets/${ticketId}/issue`);
  };

  return (
    <>
      <S.IssuedTicketHeader>
        <S.Appbar>
          <S.FlexRow>
            <S.LeftOut onClick={() => navigate(-1)} />
            <S.AppbarTitle>수강권 부여</S.AppbarTitle>
          </S.FlexRow>
        </S.Appbar>
      </S.IssuedTicketHeader>
      <S.Body>
        <S.Title>센터 수강권</S.Title>
        <RenderTickets
          ticketsArray={activeTickets}
          onTicketClick={handleIssueTicket}
        />
      </S.Body>
    </>
  );
};

export default ActiveTicketList;
