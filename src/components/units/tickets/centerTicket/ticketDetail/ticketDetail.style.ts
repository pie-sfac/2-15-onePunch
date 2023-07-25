import styled from "@emotion/styled";
import { LeftOutlined } from "@ant-design/icons";

export const Wrapper = styled.div`
  padding: 20px;
  margin-top: 1vh;
  justify-content: center;
  align-items: center;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  display: flex;
  height: 50px;
  border-bottom: 1px solid #e7e7e7;
  align-items: center;
`;

export const OutBox = styled.div`
  // cursor: pointer;
  display: flex;
  flex-direction: row;
  padding: 0px 10px;
  justify-content: space-between;
  // align-items: center;
  
`;

export const ticketDetailAppbar = styled.p`
  margin-left: 2vw;
  font-size: 16px;
`;

export const LeftOut = styled(LeftOutlined)``;

export const Membership = styled.div`
  background: var(--bg-bg-wh, #ffffff);
  border-radius: 10px;
  border-style: solid;
  border-color: var(--borderline-line-200, #e7e7e7);
  border-width: 1px;
  width: 350px;
  left: 24px;
  top: 177px;
  overflow: hidden;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px 10px;
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
  justify-content: flex-start;
  flex-shrink: 0;
  position: relative;
  width: 100%;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: flex-start;
  justify-content: flex-start;
  flex-shrink: 0;
  position: relative;
`;

export const Text2 = styled.div`
  color: var(--text-text-900, #1d1d1d);
  text-align: left;
  font: 400 14px/144% "Pretendard", sans-serif;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
export const Text1 = styled.div`
  color: var(--text-text-400, #aeaeae);
  text-align: left;
  font: 400 14px/144% "Pretendard", sans-serif;
  position: relative;
  width: 65px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const TicketTitle = styled.div`
  color: var(--text-text-900, #1d1d1d);
  text-align: left;
  font: var(
    --pretendard-pt-title-5-bold-20,
    700 20px/136% "Pretendard",
    sans-serif
  );
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const Label = styled.div`
  box-sizing: border-box;
  background: var(--bg-bgc-50, #ebf1ff);
  border-radius: 4px;
  padding: 4px 8px 4px 8px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  width: 25%;
`;

export const LabelText = styled.div`
  color: #2d62ea;
  font: 400 10px/128% "Pretendard", sans-serif;
  position: relative;
`;

export const SecondBar = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 30px;
  width: 100%;
`;
export const Div = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  width: 100%;
`;

export const Title = styled.p`
  color: var(--text-text-900, #1d1d1d);
  text-align: left;
  font: var(
    --pretendard-pt-body-2-bold-14,
    700 14px/144% "Pretendard",
    sans-serif
  );
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const IssuedBtn = styled.button`
  box-sizing: border-box;
  color: var(--primary-primary-500, #2d62ea);
  text-align: left;
  font: var(
    --pretendard-pt-body-4-regular-14,
    400 14px/144% "Pretendard",
    sans-serif
  );
  position: relative;
`;
