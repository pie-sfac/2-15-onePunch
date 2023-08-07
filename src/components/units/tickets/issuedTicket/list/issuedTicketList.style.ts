import { LeftOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";

export const IssuedTicketHeader = styled.header`
  display: flex;
  height: 50px;
  border-bottom: 1px solid #e7e7e7;
  align-items: center;
`;

export const Body = styled.div`
  padding: 20px;
  margin-top: 1vh;
`;

export const LeftOut = styled(LeftOutlined)``;

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Appbar = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0px 10px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const AppbarTitle = styled.div``;

export const Issue = styled.div``;
export const Title = styled.div``;

export const TicketBox = styled.div`
  border: 1px solid #e7e7e7;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 180px; // 높이를 지정해줘야 하위 요소에서 %를 사용할 수 있음.
  margin-top: 10px;
`;

export const Ticket_Info = styled.div`
  width: 65%;
  height: 100%;
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-left: 5px;
`;

export const Ticket_Info_Top = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const Ticket_Info_Bottom = styled.div<{ isSuspended?: boolean }>`
  width: 100%;

  color: ${(props) => (props.isSuspended ? "#AEAEAE" : "")};
`;

export const Ticket_Title = styled.div<{ isSuspended?: boolean }>`
  font-size: 16px;
  font-weight: 700;

  color: ${(props) => (props.isSuspended ? "#AEAEAE" : "")};
`;
export const Ticket_LessonType = styled.div<{ isSuspended?: boolean }>`
  text-align: center;
  font-size: 10px;
  font-weight: 400;
  border-radius: 4px;
  background: #;
  margin-top: 5px;
  width: 80px;

  color: ${(props) => (props.isSuspended ? "#AEAEAE" : "#2d62ea")};
  background: ${(props) => (props.isSuspended ? "#F4F4F4" : "#ebf1ff")};
`;
export const Ticket_IconWrapper = styled.div`
  margin-right: 10px;
`;
export const Ticket_Icon = styled.img``;
export const Ticket_Count = styled.div`
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
`;
export const Ticket_Term = styled.div`
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
`;

export const TicketMenu = styled.div<{ isSuspended?: boolean }>`
  height: 100%;
  width: 35%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  background: ${(props) => (props.isSuspended ? "#F4F4F4" : "#ebf1ff")};
  color: ${(props) => (props.isSuspended ? "#1D1D1D" : "#2d62ea")};
`;
export const Suspension = styled.p`
  margin: 0;
`;
export const Transfer = styled.p`
  margin: 0;
`;
export const Refund = styled.p`
  margin: 0;
`;

export const greyText = styled.span`
  color: #aeaeae;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  margin-right: 5px;
`;
