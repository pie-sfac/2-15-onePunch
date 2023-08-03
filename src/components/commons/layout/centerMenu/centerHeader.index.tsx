import { Button, Drawer } from "antd";
import React, { useState } from "react";
import * as S from "./centerHeader.style";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const CenterHeader = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const LoginClick = () => {
    window.scrollTo(0, 0);
    navigate("/");
  };

  const closeDrawer = () => {
    setIsOpen(false);
  };

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <S.Wrapper>
        <S.Box>
          <div>
            <img src="/images/icons/Logo.png" />
          </div>
          <S.ProfileBox onClick={LoginClick}>
            <S.AvatarOut size={23} icon={<UserOutlined />} />
            <S.Name>team15</S.Name>
            <S.State>플랜 이용중</S.State>
          </S.ProfileBox>

          <MenuOutlined onClick={toggleDrawer} />
          <Drawer
            title="센터 관리"
            placement="right"
            closable={true}
            onClose={closeDrawer}
            open={isOpen}
            width={250}
            style={{ paddingTop: "50px" }}
            onClick={toggleDrawer}
          >
            <S.MenuList>
              <Link to="/staffPage/list">직원 관리</Link>
            </S.MenuList>
            <S.MenuList>
              <Link to="/centerTicketPage">수강권 관리</Link>
            </S.MenuList>
            <S.MenuList> 기록 관리</S.MenuList>
            <S.MenuList> 미디어 관리</S.MenuList>
            <S.MenuList> 운영 데이터</S.MenuList>
            <S.MenuList> 알림 메시지</S.MenuList>
            <S.MenuList> 센터 정보</S.MenuList>
          </Drawer>
        </S.Box>
      </S.Wrapper>
    </>
  );
};

export default CenterHeader;
