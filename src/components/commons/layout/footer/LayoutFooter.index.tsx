import { useNavigate } from "react-router-dom";
import * as S from "./LayoutFooter.styles";

export default function LayoutFooter(): JSX.Element {
  const navigate = useNavigate();
  const handleOutBoxClick = () => {
    window.scrollTo(0, 0);
    navigate("/schedulePage/calendar");
  };

  const HomeClick = () => {
    window.scrollTo(0, 0);
    navigate("/");
  };

  const MemberClick = () => {
    window.scrollTo(0, 0);
    navigate("/memberPage/list");
  };
  const CenterClick = () => {
    navigate("/staffPage/list"); // <-- navigate를 사용하여 '/schedulePage/calendar'로 이동합니다.
  };

  return (
    <>
      <S.Wrapper>
        <S.Category onClick={HomeClick}>
          <S.Icon src="/images/icons/home.png" />
          <S.Text>홈</S.Text>
        </S.Category>
        <S.Category onClick={handleOutBoxClick}>
          <S.Icon src="/images/icons/day.png" />
          <S.Text>일정관리</S.Text>
        </S.Category>
        <S.Category onClick={MemberClick}>
          <S.Icon src="/images/icons/my.png" />
          <S.Text>회원관리</S.Text>
        </S.Category>
        <S.Category onClick={CenterClick}>
          <S.Icon src="/images/icons/pro.png" />
          <S.Text>센터관리</S.Text>
        </S.Category>
        <S.Category>
          <S.Icon src="/images/icons/Union.png" />
          <S.Text>마이페이지</S.Text>
        </S.Category>
      </S.Wrapper>
    </>
  );
}
