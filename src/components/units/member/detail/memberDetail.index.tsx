import { useNavigate, useParams } from "react-router-dom";
import * as S from "./memberDetail.style";
import apiInstance from "../../../../commons/apiInstance/apiInstance";
import { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";

export default function memberDetail() {
  const navigate = useNavigate();
  const { memberId } = useParams();
  const [memberDetails, setMemberDetails] = useState({});

  useEffect(() => {
    fetchMemberDetails();
  }, []);

  const fetchMemberDetails = async () => {
    try {
      const response = await apiInstance.get(`/members/${memberId}`);
      setMemberDetails(response.data.name);
      console.log(memberDetails);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOutBoxClick = () => {
    navigate("/schedulePage/calendar"); // <-- navigate를 사용하여 '/schedulePage/calendar'로 이동합니다.
  };

  return (
    <S.Wrapper>
      <S.Header>
        <S.OutBox onClick={handleOutBoxClick}>
          <S.LeftOut />
          <S.OutBoxTitle>회원정보</S.OutBoxTitle>
        </S.OutBox>
      </S.Header>
      <S.Body>
        <S.MemberWrapper>
          <S.MemberTitle>회원 정보</S.MemberTitle>
          <S.PMBox>
            <S.PMIBox>
              <S.AvatarOut size={23} icon={<UserOutlined />} />
              <S.PMS>신예진</S.PMS>
              <S.PMS>010-1234-1234</S.PMS>
              <S.PMS>1998.11.30</S.PMS>
              <S.PMS>가사노동자</S.PMS>
            </S.PMIBox>
          </S.PMBox>
        </S.MemberWrapper>
        <S.MemberNav>
          <S.Record>기록지</S.Record>
          <S.Notification>알림메시지</S.Notification>
          <S.Album>앨범</S.Album>
        </S.MemberNav>
      </S.Body>
    </S.Wrapper>
  );
}
