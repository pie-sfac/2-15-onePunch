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

export const Edit = styled.div``;

export const Ticket_Title = styled.div`
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
`;
export const Ticket_LessonType = styled.div`
  color: #2d62ea;
  text-align: center;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  border-radius: 4px;
  background: #ebf1ff;
  width: 80px;
  align-items: center;
  padding: 5px 0;
  margin-left: 10px;
`;

export const InfoWrapper = styled.div`
  margin-top: 40px;
`;
export const Title = styled.div``;

export const Ticket_Info = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  border: 1px solid #e7e7e7;
  border-radius: 10px;
  padding: 5px 0;
  margin-top: 10px;
`;

export const InnerBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: left;
  width: 100%;
`;

export const InfoTitle = styled.p`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  width: 50%;
  padding: 10px;
`;
export const StrongText = styled.span`
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  margin-left: 40px;
  padding: 10px;

  width: 50%;
`;
