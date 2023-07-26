import { LeftOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Avatar } from "antd";

export const Wrapper = styled.div``;

export const LeftOut = styled(LeftOutlined)``;

export const AvatarOut = styled(Avatar)``;

export const Header = styled.header`
  display: flex;
  height: 50px;
  border-bottom: 1px solid #e7e7e7;
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
  color: #505050;
`;

export const Album = styled.p`
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #505050;
`;
