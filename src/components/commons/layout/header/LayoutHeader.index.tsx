import * as S from "./LayoutHeader.styles";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Space } from "antd";
import { useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";
import { MouseEventHandler, useEffect, useState } from "react";
import apiInstance from "../../../../commons/apiInstance/apiInstance";

export default function LayoutHeader(): JSX.Element {
  const navigate = useNavigate();
  const [shouldReload, setShouldReload] = useState(false);

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
      console.log(response);
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
        </S.Box>
      </S.Wrapper>
    </>
  );
}
