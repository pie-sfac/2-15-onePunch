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
export const Title = styled.div`
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  margin-bottom: 15px;
  margin-left: 20px;
`;
