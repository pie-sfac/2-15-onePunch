import styled from "@emotion/styled";
import { Avatar } from "antd";

export const Wrapper = styled.div`
  width: 100%;
  background-color: white;
  height: 50px;
  display: flex;
  align-items: center;
  position: fixed;
  z-index: 9999;
  border-bottom: 2px solid #e6e6e6;
`;

export const Box = styled.div`
  width: 91%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: auto;
`;

export const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  border-left: 1px solid #d9d9d9;
  border-right: 1px solid #d9d9d9;
  padding: 0px 6px;
`;

export const AvatarOut = styled(Avatar)``;

export const Name = styled.p`
  font-size: 14px;
  padding: 0px 8px;
`;

export const State = styled.p`
  font-size: 12px;
  background-color: #f4f4f4;
  padding: 8px 6px;
  color: #4774eb;
  border-radius: 4px;
`;
