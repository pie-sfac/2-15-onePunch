import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StaffType } from "../detail/staffDetail.index";
import apiInstance from "../../../../commons/apiInstance/apiInstance";
import * as S from "./staffEdit.style";
import { LeftOutlined } from "@ant-design/icons";

const StaffEdit: React.FC = () => {
  const [staffInfo, setStaffInfo] = useState<StaffType | null>(null);
  const { id } = useParams<{ id: string }>();
  const staffId = parseInt(id!);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    apiInstance
      .get("/staffs/" + staffId)
      .then((response) => {
        setStaffInfo(response.data);

        setName(response.data.name);
        setPhone(response.data.phone);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [staffId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    // return <p>Error: {error.message}</p>;
  }

  const handleInputChange = (event: any, setter: (val: string) => void) => {
    setter(event.target.value);
  };

  // 수정 후 저장
  const handleSave = () => {
    apiInstance
      .put(`/staffs/${staffId}`, {
        name: name,
        phone: phone,
      })
      .then((response) => {
        alert(response.data.message);

        setStaffInfo((prevInfo) => {
          if (prevInfo === null) {
            return null;
          }

          return {
            ...prevInfo,
            name: name,
            phone: phone,
          };
        });
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <div className="wrapper">
      <S.StaffEditHeader>
        <LeftOutlined onClick={() => navigate(-1)} />
        <S.Appbar>직원 정보</S.Appbar>
      </S.StaffEditHeader>
      {staffInfo && (
        <>
          <S.StaffInfoWrapper>
            <div>
              <img src="/images/icons/Profile_edit.png" alt="profilePic_edit" />
            </div>
            <S.StaffInfo>
              <S.FlexRow>
                <S.Name>{staffInfo.name}</S.Name>
                <S.Role>권한 {staffInfo.roles.length}</S.Role>
              </S.FlexRow>
              <div>
                <S.Center>좋은 관절 센터</S.Center>
              </div>
              <S.FlexRow>
                <p>
                  {staffInfo.active ? (
                    "재직중"
                  ) : (
                    <span style={{ color: "red  " }}>퇴사</span>
                  )}
                </p>
                <p>서비스 미이용 중</p>
              </S.FlexRow>
              <S.SendInfoBtn>직원 정보 발송</S.SendInfoBtn>
            </S.StaffInfo>
          </S.StaffInfoWrapper>

          <div style={{ margin: "10px" }}>
            <div>
              <S.StaffInfoTitle>직원 정보</S.StaffInfoTitle>
            </div>
            <S.InfoBody>
              <S.FlexColumn>
                <S.InfoLabel>이름</S.InfoLabel>
                <S.InfoInput
                  type="text"
                  value={name}
                  onChange={(e) => handleInputChange(e, setName)}
                />
              </S.FlexColumn>
              <S.FlexColumn>
                <S.InfoLabel>휴대폰 번호</S.InfoLabel>
                <S.InfoInput
                  type="text"
                  value={phone}
                  onChange={(e) => handleInputChange(e, setPhone)}
                />
              </S.FlexColumn>
              <S.FlexColumn>
                <S.InfoLabel>아이디</S.InfoLabel>
                <S.InfoInput type="text" value={staffInfo.loginId} disabled />
              </S.FlexColumn>
              <S.FlexColumn>
                <S.InfoLabel>비밀번호</S.InfoLabel>
                <S.InfoInput type="password" disabled />
              </S.FlexColumn>
            </S.InfoBody>
            <S.FlexRow>
              <S.SaveBtn onClick={handleSave}>저장</S.SaveBtn>
            </S.FlexRow>
          </div>
        </>
      )}
    </div>
  );
};

export default StaffEdit;
