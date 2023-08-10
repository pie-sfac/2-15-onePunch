import { MenuOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Avatar, Drawer } from "antd";

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
  margin-left: auto;
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

// 햄버거 메뉴
export const MenuIcon = styled(MenuOutlined)`
  margin-left: 10px;
`;
export const HamburgerDrawer = styled(Drawer)`
  padding-top: 50px;
`;
export const MenuList = styled.li`
  text-align: left;
  position: relative;
  color: #000;
  font-size: 15px;
  font-style: normal;
  padding: 15px 0;
  list-style-type: none;
`;
