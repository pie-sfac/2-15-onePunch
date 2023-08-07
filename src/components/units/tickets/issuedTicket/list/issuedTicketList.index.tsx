import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiInstance from "../../../../../commons/apiInstance/apiInstance";
import * as S from "./issuedTicketList.style";
import { Tabs } from "antd";
import { TabsProps } from "antd";
import ConvertLessonType from "../../../../commons/converter/convertLessonType";
import ConvertDate from "../../../../commons/converter/convertDate";

export interface IssuedTicket {
  availableReservationCount: number;
  canceledAt: string;
  createdAt: string;
  defaultCount: 20;
  defaultTerm: 20;
  defaultTermUnit: "DAY" | "WEEK" | "MONTH" | "YEAR";
  endAt: string;
  id: number;
  isCanceled: boolean;
  isSuspended: boolean;
  lessonType: "SINGLE" | "DUET" | "TRIPLE" | "GROUP";
  remainingCount: number;
  serviceCount: number;
  startAt: string;
  suspendedAt: string;
  title: String;
  updatedAt: string;
  privateTutor: PrivateTutor;
}

export interface PrivateTutor {
  createdAt: string;
  id: number;
  isActive: boolean;
  lastLoginedAt: string;
  loginId: string;
  name: string;
  phone: string;
  type: "STAFF" | "ADMIN";
  updatedAt: string;
}

const IssuedTicketList = () => {
  const navigate = useNavigate();
  const { memberId } = useParams<{ memberId: string }>();
  const [isIssuedTicket, setIsIssuedTicket] = useState(false);
  const [issuedTickets, setIssuedTickets] = useState<IssuedTicket[]>([]);
  // 탭 나누기 위한 이용중/종료됨 수강권
  const activeTickets = issuedTickets.filter((ticket) => !ticket.isCanceled);
  const inactiveTickets = issuedTickets.filter((ticket) => ticket.isCanceled);

  // issued tickets list 가져오기
  useEffect(() => {
    // console.log("ID from URL:", memberId);
    apiInstance
      .get(`/members/${memberId}/issued-tickets`)
      .then((response) => {
        // console.log(response.data.issuedTickets);
        setIssuedTickets(response.data.issuedTickets);
        console.log(issuedTickets);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // issuedTicketInfo가 변경될 때마다 콘솔에 찍어보기
  useEffect(() => {
    console.log("issuedTicketInfo", issuedTickets);
  }, [issuedTickets]);

  // 수강권 메뉴(임시)
  const handleSuspension = () => {
    console.log("handleSuspension");
  };
  const handleTransfer = () => {
    console.log("handleTransfer");
  };
  const handleRefund = () => {
    console.log("handleRefund");
  };

  const handleIssuedTicketDetail = (issuedTicketId: any) => {
    // console.log(issuedTicketId.target.key);
    navigate(`/issued-tickets/${issuedTicketId}`);
  };

  // 탭 컨텐츠 렌더링
  const renderTickets = (ticketsArray: IssuedTicket[]) => (
    <>
      {ticketsArray.map((ticket) => (
        <S.TicketBox key={ticket.id}>
          <S.Ticket_Info onClick={() => handleIssuedTicketDetail(ticket.id)}>
            <S.Ticket_Info_Top>
              <div>
                <S.Ticket_Title>{ticket.title}</S.Ticket_Title>
                <S.Ticket_LessonType>
                  {ConvertLessonType(ticket.lessonType)}
                </S.Ticket_LessonType>
              </div>
              <S.Ticket_IconWrapper>
                <S.Ticket_Icon
                  src="/images/icons/Tiket_ac.png"
                  alt="Tiket_ac"
                />
              </S.Ticket_IconWrapper>
            </S.Ticket_Info_Top>
            <S.Ticket_Info_Bottom>
              <S.Ticket_Count>
                <S.greyText>잔여 횟수</S.greyText>
                {ticket.availableReservationCount ? (
                  <>{ticket.availableReservationCount}회</>
                ) : (
                  "무제한"
                )}
                {/* {ticket.availableReservationCount}회 */}
              </S.Ticket_Count>
              <S.Ticket_Term>
                <S.greyText>유효 기간</S.greyText>
                {ConvertDate(ticket.startAt)} - {ConvertDate(ticket.endAt)}
              </S.Ticket_Term>
            </S.Ticket_Info_Bottom>
          </S.Ticket_Info>

          <S.TicketMenu>
            <S.Suspension onClick={handleSuspension}>
              수강권 일시중단
            </S.Suspension>
            <S.Transfer onClick={handleTransfer}>수강권 양도</S.Transfer>
            <S.Refund onClick={handleRefund}>환불</S.Refund>
          </S.TicketMenu>
        </S.TicketBox>
      ))}
    </>
  );

  // items에 두 개의 탭 정의
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `이용중(${activeTickets.length})`,
      children: renderTickets(activeTickets),
    },
    {
      key: "2",
      label: `종료됨(${inactiveTickets.length})`,
      children: renderTickets(inactiveTickets),
    },
  ];

  const handleShowActiveTicketList = () => {
    navigate(`/${memberId}/tickets/ActiveTicketList`);
  };

  return (
    <>
      <S.IssuedTicketHeader>
        <S.Appbar>
          <S.FlexRow>
            <S.LeftOut
              onClick={() => navigate(`/memberPage/memberDetail/${memberId}`)}
            />
            <S.AppbarTitle>수강권</S.AppbarTitle>
          </S.FlexRow>
          <S.Issue onClick={handleShowActiveTicketList}>부여하기</S.Issue>
        </S.Appbar>
      </S.IssuedTicketHeader>
      <S.Body>
        <S.Title>수강권</S.Title>
        <Tabs
          style={{ marginLeft: "10px" }}
          defaultActiveKey="1"
          items={items}
        />
      </S.Body>
    </>
  );
};

export default IssuedTicketList;
