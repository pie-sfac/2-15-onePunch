import { useNavigate } from "react-router-dom";
import CreateTicketForm, {
  CreateTicketType,
  EditTicketType,
} from "./createTicketForm";
import apiInstance from "../../../../../commons/apiInstance/apiInstance";

const createTicket = async (
  ticketData: CreateTicketType | EditTicketType
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

  const handleSubmit = (data: CreateTicketType | EditTicketType) => {
    createTicket(data).then((createdTicket) => {
      if (createdTicket) {
        // console.log('티겟 생성 완료: ', createdTicket);
        navigate("/centerTicketPage");
      } else {
        console.log("티켓 생성 실패");
      }
    });
  };

  return <CreateTicketForm onSubmit={handleSubmit} />;
};

export default CreateTicket;
