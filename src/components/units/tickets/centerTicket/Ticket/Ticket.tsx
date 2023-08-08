import React from "react";
import * as S from "../list/centerTicket.style";
import ConvertTermUnit from "../../../../commons/converter/convertTermUnit";
import ConvertLessonType from "../../../../commons/converter/convertLessonType";

export interface BookableLesson {
  id: number;
  type: string;
  title: string;
  duration: number;
  maxGroupMember: number;
}

export interface TicketType {
  id: number;
  title: string;
  lessonType: string;
  defaultCount: number;
  defaultTerm: number;
  defaultTermUnit: string;
  isActive: boolean;
  maxServiceCount: number;
  issuedTicketCount: number;
  bookableLessons: BookableLesson[];
}

export interface TicketProps {
  ticket: TicketType;
  onClick: () => void;
}

///////////////////////////////////////
// Ticket 컴포넌트
///////////////////////////////////////
const Ticket: React.FC<TicketProps> = ({ ticket, onClick }) => (
  <S.Membership onClick={onClick}>
    <S.Contents>
      <S.Content>
        <S.Title>{ticket.title}</S.Title>
        <S.Info>
          <S.Text1>부여</S.Text1>
          <S.Text2>{ticket.issuedTicketCount}건</S.Text2>
        </S.Info>
      </S.Content>
      <S.Content>
        <S.Info>
          <S.Text1>수강권 횟수</S.Text1>
          <S.Text2>
            {ticket.defaultCount ? `${ticket.defaultCount}회` : "무제한"}
          </S.Text2>
        </S.Info>
        <S.Info>
          <S.Text1>수업 시간</S.Text1>
          <S.Text2>
            {ticket.bookableLessons.length > 0 &&
              ticket.bookableLessons[0].duration}
            분
          </S.Text2>
        </S.Info>
        <S.Info>
          <S.Text1>수강권 기간</S.Text1>
          <S.Text2>
            {ticket.defaultTerm
              ? `${ticket.defaultTerm}${ConvertTermUnit(
                  ticket.defaultTermUnit
                )}`
              : "소진시 까지"}
          </S.Text2>
        </S.Info>
      </S.Content>
    </S.Contents>

    <S.Contents>
      <S.Label2>
        <S.Text8>{ConvertLessonType(ticket.lessonType)}</S.Text8>
      </S.Label2>

      <S.TicketImg src="/images/icons/Tiket_ac.png" alt="Tiket_ac" />
    </S.Contents>
  </S.Membership>
);

export default Ticket;
