import { useNavigate, useParams } from "react-router-dom";
import * as S from "./memberDetail.style";
import apiInstance from "../../../../commons/apiInstance/apiInstance";
import { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";

interface MemberDetails {
  name: string;
  phone: string;
  birthDate: string;
  job: string;
}

export default function memberDetail() {
  const navigate = useNavigate();
  const { memberId } = useParams();
  const [memberDetails, setMemberDetails] = useState<MemberDetails>({
    name: "",
    phone: "",
    birthDate: "",
    job: "",
  });
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    fetchMemberDetails();
  }, []);

  const fetchMemberDetails = async () => {
    try {
      const response = await apiInstance.get(`/members/${memberId}`);
      setMemberDetails(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOutBoxClick = () => {
    navigate("/memberPage/list");
  };

  useEffect(() => {
    let interval: any = null;

    if (loadingProgress < 100) {
      interval = setInterval(() => {
        setLoadingProgress((loadingProgress) => loadingProgress + 20); // 10%에서 20%로 증가
      }, 100);
    } else if (loadingProgress >= 100) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [loadingProgress]);

  return (
    <S.Wrapper>
      {loadingProgress < 100 ? (
        <S.LoadingWrapper>
          <S.Loading percent={loadingProgress} status="active" />
        </S.LoadingWrapper>
      ) : (
        <>
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
                  <S.PMS>{memberDetails.name}</S.PMS>
                  <S.PMS>{memberDetails.phone}</S.PMS>
                  <S.PMS>{memberDetails.birthDate}</S.PMS>
                  <S.PMS>{memberDetails.job}</S.PMS>
                </S.PMIBox>
              </S.PMBox>
            </S.MemberWrapper>
            <S.MemberNav>
              <S.Record>기록지</S.Record>
              <S.Notification>알림메시지</S.Notification>
              <S.Album>앨범</S.Album>
            </S.MemberNav>
          </S.Body>
        </>
      )}
    </S.Wrapper>
  );
}
