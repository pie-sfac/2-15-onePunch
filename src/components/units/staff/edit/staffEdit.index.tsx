import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StaffType } from "../detail/staffDetail.index";
import apiInstance from "../../../../commons/apiInstance/apiInstance";

const StaffEdit: React.FC = () => {
  const [staffInfo, setStaffInfo] = useState<StaffType | null>(null);
  const { id } = useParams<{ id: string }>();
  const staffId = parseInt(id!);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    apiInstance
      .get("/staffs/" + staffId)
      .then((response) => {
        setStaffInfo(response.data);
        console.log(response.data);

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
    // console.log(event.target.value);
  };

  // 수정 후 저장
  const handleSave = () => {
    apiInstance
      .put(`/staffs/${staffId}`, {
        name: name,
        phone: phone,
      })
      .then((response) => {
        console.log(response.data);
        console.log(response.data.message);
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
      {staffInfo && (
        <>
          <div style={{ border: "1px solid blue" }}>
            <div>
              <img src="/images/icons/Profile_edit.png" alt="profilePic_edit" />
            </div>
            <div>
              <div>
                <p>{staffInfo.name}</p>
                <p>권한 {staffInfo.roles.length}</p>
              </div>
              <div>
                <p>좋은 관절 센터</p>
              </div>
              <div>
                <p>
                  {staffInfo.active ? (
                    "재직중"
                  ) : (
                    <span style={{ color: "red  " }}>퇴사</span>
                  )}
                </p>
                <p>서비스 미이용 중</p>
                <button>직원 정보 발송</button>
              </div>
            </div>
          </div>

          <div style={{ border: "1px solid blue" }}>
            <div>
              <p>직원 정보</p>
            </div>
            <div>
              <div>
                <label htmlFor="">이름</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => handleInputChange(e, setName)}
                />
              </div>
              <div>
                <label htmlFor="">휴대폰 번호</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => handleInputChange(e, setPhone)}
                />
              </div>
              <div>
                <label htmlFor="">아이디</label>
                <input type="text" value={staffInfo.loginId} disabled />
              </div>
              <div>
                <label htmlFor="">비밀번호</label>
                <input type="password" disabled />
              </div>
            </div>
            <div>
              <button onClick={handleSave}>저장</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StaffEdit;
