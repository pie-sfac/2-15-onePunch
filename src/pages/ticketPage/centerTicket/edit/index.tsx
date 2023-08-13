import { useParams } from "react-router-dom";
import EditTicket from "../../../../components/units/tickets/centerTicket/edit/editTicket";

const TicketEditPage = () => {
  const { ticketId } = useParams();
  if (!ticketId) {
    // ticketId가 없을 때의 처리
    return <div>Error: No ticketId provided!</div>;
  }
  return (
    <>
      <EditTicket ticketId={ticketId} />
    </>
  );
};

export default TicketEditPage;
