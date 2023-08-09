import styled from "@emotion/styled";
import { LeftOutlined } from "@ant-design/icons";

export const Wrapper = styled.div`
  padding: 20px;
  margin-top: 1vh;
`;

export const TicketDetailHeader = styled.div`
  display: flex;
  height: 50px;
  border-bottom: 1px solid #e7e7e7;
  align-items: center;
  padding: 0 15px;
`;

export const Appbar = styled.p`
  // margin-left: auto;
  font-size: 16px;
  margin-right: auto;
`;

export const LeftOut = styled(LeftOutlined)``;

export const InnerBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: left;
  width: 100%;
`;
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

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Issued = styled.div`
  color: #2d62ea;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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
  margin-left: 5px;
  padding: 10px;
  width: 50%;
`;

export const Menu = styled.div`
  position: fixed;
  right: 0;
  width: 0;
  height: 100%;
  overflow: hidden;
  transition: width 0.5s;

  &.open {
    width: 200px;
  }
`;
