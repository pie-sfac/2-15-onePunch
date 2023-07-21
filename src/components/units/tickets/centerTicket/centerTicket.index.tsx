import { useEffect, useState } from "react";
import apiInstance from "../../../../commons/apiInstance/apiInstance";
import { Link } from "react-router-dom";

//
interface BookableLesson {
  id: number;
  type: string;
  title: string;
  duration: number;
  maxGroupMember: number;
}

// 
interface TicketType {
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

//////////////////////////////////
// 로그인 후 수강권 목록 가져오기
//////////////////////////////////
const getTickets = async (): Promise<TicketType[]> => {
  try {
    const response = await apiInstance.get("/tickets");
    const tickets: TicketType[] = response.data.tickets; // 수정된 부분
    console.log(tickets);
    return tickets;
  } catch (error) {
    console.error(error);
    return [];
  }
};

//////////////////////////////////
// 수강권 생성하기
//////////////////////////////////
const CenterTicket: React.FC = () => {
  const [tickets, setTickets] = useState<TicketType[]>([]);
  useEffect(() => {
    getTickets().then(setTickets);
  }, []);

  const Ticket: React.FC<{ ticket: TicketType }> = ({ ticket }) => (
    <div style={{ border: "1px solid black" }}>
      <div>
        <p>id: {ticket.id}</p>
        <p>title: {ticket.title}</p>
        <p>lessonType: {ticket.lessonType}</p>
        <p>defaultCount: {ticket.defaultCount}</p>
        <p>defaultTerm: {ticket.defaultTerm}</p>
        <p>defaultTermUnit: {ticket.defaultTermUnit}</p>
        <p>isActive: {ticket.isActive && "true"}</p>
        <p>maxServiceCount: {ticket.maxServiceCount}</p>
        <p>issuedTicketCount: {ticket.issuedTicketCount}</p>
      </div>
    </div>
  );

  return (
    <>
      {/* <NavBar /> */}
      <div>
        <div>
          <p>센터 수강권</p>
          <Link to="/createTicket">
            <button>생성하기</button>
          </Link>
        </div>
        <div>
          <p>판매중 (3)</p>
          <p>판매종료 (2)</p>
        </div>
        {/* 티켓리스트 */}
        {tickets &&
          tickets.map((ticket) => <Ticket key={ticket.id} ticket={ticket} />)}
      </div>
    </>
  );
};

export default CenterTicket;
