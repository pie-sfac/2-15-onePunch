import * as S from "./staffAdd.style";
import { Select } from "antd";
import { useState } from "react";
import { Button, Steps } from "antd";
import { useNavigate } from "react-router-dom";
import apiInstance from "../../../../commons/apiInstance/apiInstance";

interface StaffCreateReq {
  loginId: string;
  password: string;
  name: string;
  phone: string;
  roles: number[];
}


const options = [
  {
    label: "일반 직원 (기본): 가장 기존적인 권한만 소유하고 있습니다.",
    value: "1",
  },
  {
    label:
      "인포 직원: 직원 관리, 수강권 관리, 일정 관리 권한을 소유하고 있습니다.",
    value: "5",
  },
  { label: "총괄 매니저: 모든 권한을 소유하고 있습니다.", value: "6" },
];

const StaffAdd = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [staffReq, setStaffReq] = useState<StaffCreateReq>({
    loginId: "",
    password: "",
    name: "",
    phone: "",
    roles: [],
  });
  const steps = [
    {
      title: "직원 정보 입력",
      content: (
        <>
          <S.FormLabel>이름</S.FormLabel>
          <S.FormInput
            placeholder="이름을 입력해 주세요"
            value={staffReq.name}
            onChange={(e) => setStaffReq({ ...staffReq, name: e.target.value })}
          />
          <S.FormLabel>휴대폰 번호</S.FormLabel>
          <S.FormInput
            placeholder="010-0000-0000"
            value={staffReq.phone}
            onChange={(e) =>
              setStaffReq({ ...staffReq, phone: e.target.value })
            }
          />
        </>
      ),
    },
    {
      title: "직원 계정 생성",
      content: (
        <>
          <S.FormLabel>아이디</S.FormLabel>
          <S.FormInput
            placeholder="3~15자의 영문, 숫자를 사용한 아이디를 입력해 주세요."
            value={staffReq.loginId}
            onChange={(e) =>
              setStaffReq({ ...staffReq, loginId: e.target.value })
            }
          />
          <S.FormLabel>임시 비밀번호(PIN)</S.FormLabel>
          <S.FormInput
            placeholder="4~6자리의 숫자로 구성해 주세요."
            value={staffReq.password}
            onChange={(e) =>
              setStaffReq({ ...staffReq, password: e.target.value })
            }
          />
        </>
      ),
    },
    {
      title: "역할 설정",
      content: (
        <>
          <S.FormLabel>직원 권한</S.FormLabel>
          <Select
            mode="tags"
            style={{ width: "100%" }}
            onChange={(value) =>
              setStaffReq({ ...staffReq, roles: value.map(Number) })
            }
            tokenSeparators={[","]}
            options={options}
          />
        </>
      ),
    },
  ];
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    margin: `0px`,
    alignItems: `center`,
    padding: `15px`,
  };
  ///////////////
  // option console 찍어보기
  // const [checkboxStatus, setCheckboxStatus] = useState({
  //   General: false,
  //   Info: false,
  //   Manager: false,
  // });

  // const handleCheckboxChange = (event: any) => {
  //   setCheckboxStatus({
  //     ...checkboxStatus,
  //     [event.target.name]: event.target.checked,
  //   });
  // };
  // console.log(checkboxStatus);


  // 완료 버튼 클릭 시 전송
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(staffReq); 
    apiInstance
    .post(`/staffs`, {
      loginId: staffReq.loginId,
      password: staffReq.password,
      phone: staffReq.phone,
      name: staffReq.name,
      roles: staffReq.roles,
    })
    .then((response) => {
      console.log(response.data);
      console.log(response.data.message);
      alert(response.data.message);
      navigate("/staffPage/list")
      })
    .catch((error:any) => {
      console.log(error)
    });

  };
  return (
    <S.Wrapper>
      <S.StaffAddHeader>
        <S.OutBox>
          <S.LeftOut onClick={() => navigate(-1)} />
          <S.Appbar>직원등록</S.Appbar>
        </S.OutBox>
      </S.StaffAddHeader>
      <S.Body>
        <Steps current={current} items={items} />
        <div style={contentStyle}>{steps[current].content}</div>
        <div style={{ marginTop: 24 }}>
          <S.BtnWrapper>
            {current > 0 && (
              <Button
                onClick={() => prev()}
              >
                이전
              </Button>
            )}
            {current < steps.length - 1 && (
              <Button
                type="primary"
                onClick={() => next()}
              >
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button type="primary" onClick={handleSubmit}>
                완료
              </Button>
            )}
          </S.BtnWrapper>
        </div>
      </S.Body>
    </S.Wrapper>
  );
};

export default StaffAdd;
