import { LeftOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Avatar, Progress } from "antd";

export const Wrapper = styled.div``;

export const LeftOut = styled(LeftOutlined)``;

export const AvatarOut = styled(Avatar)``;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  border-bottom: 1px solid #e7e7e7;
`;

export const ActionContainer = styled.div`
  display: flex;
`;

export const Text = styled.p`
  padding: 0px 15px 0px 0px;
  font-size: 14px;
  cursor: pointer;
`;

export const OutBox = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0px 10px;
`;

export const OutBoxTitle = styled.p`
  margin-left: 2vw;
  font-size: 16px;
`;

export const Body = styled.div`
  height: 20vh;
`;

export const MemberTitle = styled.h1`
  font-size: 14px;
  font-weight: 700;
`;

export const MemberWrapper = styled.div`
  margin-top: 20px;
  padding: 10px 20px;
`;

export const PMBox = styled.div`
  border: 1px solid #e7e7e7;
  border-radius: 10px;
  margin-top: 20px;
`;

export const PMIBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 15px 5px;
`;

export const PMITie = styled.div`
  display: flex;
  align-items: center;
`;

export const PMS = styled.p`
  font-size: 14px;
  color: #1d1d1d;
`;

export const MemberNav = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 2px solid #e7e7e7;
  justify-content: space-evenly;
  height: 50px;
  font-size: 14px;
`;

export const Record = styled.p`
  font-weight: 700;
  width: 100px;
  color: #6691ff;
  border-bottom: 2px solid #6691ff;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Notification = styled.p`
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #dbdbdb;
`;

export const Album = styled.p`
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #dbdbdb;
`;

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Viewport의 높이를 100%로 설정해 모든 화면을 채우게 합니다 */
`;

export const Loading = styled(Progress)`
  width: 300px;
`;

export const FixedButton = styled.button`
  position: fixed;
  right: 20px;
  bottom: 20px;
  padding: 16px 32px;
  background-color: #6691ff;
  color: white;

  border: none;
  border-radius: 100px;
  cursor: pointer;
`;

export const ImageTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-height: 601px) and (max-height: 800px) {
    margin-top: 30%;
  }

  @media (min-height: 801px) {
    margin-top: 50%;
  }
`;
export const NoteIcon = styled.img``;

export const ActionText = styled.p`
  margin-top: 15px;
  color: #d9d9d9;
`;

export const TicketMsgBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
export const TicketBox = styled.div``;
export const MsgBox = styled.div``;
export const TicketIcon = styled.img``;
export const MsgIcon = styled.img``;
export const MemberTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
