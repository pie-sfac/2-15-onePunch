import { TicketType } from "../Ticket/Ticket";
import Ticket from "../Ticket/Ticket";
import * as S from "../list/centerTicket.style"

interface RenderTicketsProps {
  ticketsArray: TicketType[];
  onTicketClick: (id: number) => void;
}

const RenderTickets: React.FC<RenderTicketsProps> = ({
  ticketsArray,
  onTicketClick,
}) => (
  <S.TicketList>
    {ticketsArray.map((ticket) => (
      <Ticket
        key={ticket.id}
        ticket={ticket}
        onClick={() => onTicketClick(ticket.id)}
      />
    ))}
  </S.TicketList>
);

export default RenderTickets;
