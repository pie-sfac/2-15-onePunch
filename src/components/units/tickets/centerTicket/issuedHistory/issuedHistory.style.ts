import styled from "@emotion/styled";
import { LeftOutlined } from "@ant-design/icons";

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

export const Appbar = styled.div`
  display: flex;
  padding: 0px 10px;
  align-items: center;
  justify-content: center;
`;

export const AppbarTitle = styled.div``;
export const TotalCount = styled.div``;
export const Wrapper = styled.div`
  margin-top: 3vh;
`;
export const MemBox = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1.6fr 1fr 1fr 1.3fr;
  border-bottom: 1px solid #e7e7e7;
  padding: 10px; /* 안쪽 여백 */
  align-items: center;
  justify-content: center;
`;
export const Name = styled.div`
  font-size: 14px;
  font-weight: 700;
`;
export const Text = styled.div`
  text-align: center;
  font-size: 13px;
  font-weight: 400;
`;
