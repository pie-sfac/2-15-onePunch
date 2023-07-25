import { useNavigate } from "react-router-dom";
import CreateTicketForm, { CreateTicketType } from "./createTicketForm";  // 상대 경로에 따라 경로 수정해야 함.
import apiInstance from "../../../../../commons/apiInstance/apiInstance";
// import CreateTicketForm from "./createTicket";

const createTicket = async (
  ticketData: CreateTicketType
): Promise<any> => {
  try {
    const response = await apiInstance.post("/tickets", ticketData);
    const createdTicket = response.data;
    return createdTicket;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const CreateTicket: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (data: CreateTicketType) => {
    createTicket(data).then(createdTicket => {
      if (createdTicket) {
        // console.log('티겟 생성 완료: ', createdTicket);
        navigate('/centerTicketPage');
      } else {
        console.log('티켓 생성 실패');
      }
    });
  };

  return (
    <CreateTicketForm onSubmit={handleSubmit} />
  );
};

export default CreateTicket;