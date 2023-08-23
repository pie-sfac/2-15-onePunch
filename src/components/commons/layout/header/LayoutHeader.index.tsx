import * as S from "./LayoutHeader.styles";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Space } from "antd";
import { useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";
import { MouseEventHandler, useEffect, useState } from "react";
import apiInstance from "../../../../commons/apiInstance/apiInstance";
import { Link } from "react-router-dom";

export default function LayoutHeader(): JSX.Element {
  const navigate = useNavigate();
  const [shouldReload, setShouldReload] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showHamburger, setShowHamburger] = useState(false);

  const LoginClick = () => {
    window.scrollTo(0, 0);
    navigate("/TemporaryLogin");
  };

  const dropdownOverlayStyle = {
    zIndex: 9999,
  };

  const onClickLogOut = async () => {
    try {
      const response = await apiInstance.post(`/logout`);
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  const onClickMoveToLogOut = (): void => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setShouldReload(true);
    navigate(`/`);
  };

  useEffect(() => {
    if (shouldReload) {
      setShouldReload(false);
      window.location.reload();
    }
  }, [shouldReload]);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          style={{ fontSize: "14px", fontWeight: 500 }}
          onClick={onClickMoveToLogOut}
        >
          로그아웃
        </a>
      ),
    },
  ];

  // 햄버거 메뉴 관리
  const closeDrawer = () => {
    setIsOpen(false);
  };

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const paths = ["/centerTicketPage", "/staffPage/list"];

  useEffect(() => {
    if (paths.includes(location.pathname)) {
      setShowHamburger(true);
    } else {
      setShowHamburger(false);
    }
  }, [location.pathname]);

  return (
    <>
      <S.Wrapper>
        <S.Box>
          <div>
            <img src="/images/icons/Logo.png" />
          </div>
          <Dropdown
            menu={{ items }}
            placement="bottom"
            overlayStyle={dropdownOverlayStyle}
          >
            <S.ProfileBox>
              <S.AvatarOut size={23} icon={<UserOutlined />} />
              <S.Name>team15</S.Name>
              <S.State>플랜 이용중</S.State>
            </S.ProfileBox>
          </Dropdown>
          {showHamburger && (
            <div>
              <S.MenuIcon onClick={toggleDrawer} />
              <S.HamburgerDrawer
                title="센터 관리"
                placement="right"
                closable={true}
                onClose={closeDrawer}
                open={isOpen}
                width={250}
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
              </S.HamburgerDrawer>
            </div>
          )}
        </S.Box>
      </S.Wrapper>
    </>
  );
}
