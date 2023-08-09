import styled from "@emotion/styled";

export const Button = styled.button`
  background: var(--primary-primary-500, #2d62ea);
  border-radius: 4px;
  padding: 12px 16px 12px 16px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: center;
  width: 146px;
  left: 224px;
  top: 66px;
  color: #ffffff;
`;

export const CenterTitle = styled.p`
    color: var(--text-text-900, #1d1d1d);
    text-align: left;
   font-size: 20px;
    display: flex;
    align-items: center;
  }
  `;
export const Tab = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0px;
  align-items: center;
  justify-content: flex-start;
  left: 24px;
  top: 125px;
`;

export const Text = styled.div`
  border-style: solid;
  border-color: var(--primary-primary-300, #6691ff);
  border-width: 0px 0px 2px 0px;
  padding: 8px 12px 8px 12px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
`;

/* 선택된 카테고리 */
export const SellState = styled.div`
  color: var(--text-text-400, #aeaeae);
  text-align: center;
  font: 600 14px/144% "Pretendard", sans-serif;
  position: relative;
`;

export const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  height: 154px;
  left: 24px;
  top: 24px;
`;

export const Content = styled.div<{ isActive?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
  justify-content: flex-start;
  flex-shrink: 0;
  position: relative;
`;
export const Title = styled.div<{ isActive?: boolean }>`
  text-align: left;
  font-size: 16px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  color: ${(props) => (props.isActive ? "#1D1D1D" : "#AEAEAE")};

`;

export const Info = styled.div<{ isActive?: boolean }>`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: flex-start;
  justify-content: flex-start;
  flex-shrink: 0;
  position: relative;

  color: ${(props) => (props.isActive ? "#1D1D1D" : "#AEAEAE")};
  
`;
export const Text2 = styled.div<{ isActive?: boolean }>`
  text-align: left;
  font: 400 14px/144% "Pretendard", sans-serif;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  color: ${(props) => (props.isActive ? "#1D1D1D" : "#AEAEAE")};
`;
export const Text1 = styled.div`
  color: #aeaeae;
  text-align: left;
  font: 400 14px/144% "Pretendard", sans-serif;
  position: relative;
  width: 65px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const Label2 = styled.div<{ isActive?: boolean }>`
  border-radius: 4px;
  padding: 4px 8px;

  background: ${(props) => (props.isActive ? "#ebf1ff" : "#E7E7E7")};
  color: ${(props) => (props.isActive ? "#2d62ea" : "#AEAEAE")};
`;

export const Text8 = styled.div`
  text-align: right;
  font: 400 10px/128% "Pretendard", sans-serif;
`;
export const TicketImg = styled.img``;

export const Membership = styled.div<{ isActive?: boolean }>`
  border-radius: 10px;
  border: 1px solid #e7e7e7;
  width: 304px;
  height: 202px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  background: ${(props) => (props.isActive ? "" : "#F4F4F4")};
`;

export const TicketImg2 = styled.svg`
  padding: 10px;
`;
export const TicketList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
`;
export const Ticketheader = styled.div`
  display: flex;
  justify-content: space-around;
`;
export const Wrapper = styled.div`
  padding-top: 60px;
  margin-bottom: 90px;
`;
