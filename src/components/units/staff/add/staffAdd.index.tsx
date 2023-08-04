import * as S from "./staffAdd.style";
import { Form, Input, Select, message } from "antd";
import { useEffect, useState } from "react";
import { Button, Steps } from "antd";
import { useNavigate } from "react-router-dom";
import apiInstance from "../../../../commons/apiInstance/apiInstance";
import { divide } from "lodash";

interface StaffCreateReq {
  loginId: string;
  password: string;
  name: string;
  phone: string;
  roles: [] | null;
}

export interface roles {
  id: string;
  description: string;
  name: string;
  permissions: permissions[];
}
export interface permissions {
  title: string;
  description: string;
}

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
  const [options, setOptions] = useState<roles[]>([]);
  const [isStaffResignation, setIsStaffResignation] = useState(false);

  const getRoles = () => {
    apiInstance
      .get("/roles")
      .then((response) => {
        // console.log(response.data);
        // console.log(response.data.roles);
        setOptions(response.data.roles);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log("끝");
      });
  };
  useEffect(getRoles, []);

  const [form] = Form.useForm();
  const next = async () => {
    try {
      const values = await form.validateFields();

      // If all fields are valid, update staffReq and proceed to next step
      setStaffReq({ ...staffReq, ...values });
      setCurrent(current + 1);
    } catch (error) {
      console.log(error);
      // message.error("입력값을 확인해주세요");
    }
  };
  const steps = [
    {
      title: "직원 정보 입력",
      content: (
        <>
          <S.FormLabel>이름*</S.FormLabel>
          <Form.Item
            name="name"
            rules={[{ required: true, message: "이름을 입력해 주세요" }]}
          >
            <Input
              placeholder="이름을 입력해 주세요"
              value={staffReq.name}
              onChange={(e) =>
                setStaffReq({ ...staffReq, name: e.target.value })
              }
            />
          </Form.Item>

          <S.FormLabel>휴대폰 번호*</S.FormLabel>
          <Form.Item
            name="phone"
            rules={[
              { required: true, message: "핸드폰 번호를 입력해주세요." },
              {
                pattern: /^\d{3}-\d{3,4}-\d{4}$/,
                message: "올바른 핸드폰 번호 형식을 입력해주세요.",
              },
            ]}
          >
            <Input
              placeholder="010-0000-0000"
              value={staffReq.phone}
              onChange={(e) =>
                setStaffReq({ ...staffReq, phone: e.target.value })
              }
            />
          </Form.Item>
        </>
      ),
    },
    {
      title: "직원 계정 생성",
      content: (
        <>
          <S.FormLabel>아이디*</S.FormLabel>
          <Form.Item
            name="loginId"
            rules={[
              { required: true, message: "아이디를 입력해 주세요." },
              {
                pattern: /^[A-Za-z0-9]{3,15}$/,
                message: "3~15자의 영문, 숫자를 사용한 아이디를 입력해 주세요.",
              },
            ]}
          >
            <Input
              value={staffReq.loginId}
              onChange={(e) =>
                setStaffReq({ ...staffReq, loginId: e.target.value })
              }
            />
          </Form.Item>

          <S.FormLabel>임시 비밀번호(PIN)*</S.FormLabel>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "임시 비밀번호를 입력해 주세요." },
              {
                pattern: /^[0-9]{4,6}$/,
                message: "4~6자리의 숫자로 구성해 주세요.",
              },
            ]}
          >
            <Input
              value={staffReq.password}
              onChange={(e) =>
                setStaffReq({ ...staffReq, password: e.target.value })
              }
            />
          </Form.Item>
        </>
      ),
    },
    {
      title: "역할 설정",
      content: (
        <>
          <S.FormLabel>직원 권한</S.FormLabel>
          <Select
            className="my-select"
            mode="multiple"
            style={{ width: "100%" }}
            // 일반 직원 선택 시 빈 배열 넣기
            onChange={(value) => {
              console.log(value);
              {
                value.includes(0)
                  ? setStaffReq({ ...staffReq, roles: [] })
                  : // : console.log(value);
                    setStaffReq({ ...staffReq, roles: value.map(Number) });
              }
            }}
            tokenSeparators={[","]}
          >
            <Select.Option key={0} value={0}>
              일반 직원 (기본): 가장 기본적인 권한만 소유하고 있습니다.
            </Select.Option>
            {options.map((option) => (
              <Select.Option
                style={{ height: "auto", whiteSpace: "normal" }}
                key={option.id}
                value={option.id}
              >
                {option.name}: {option.description}
              </Select.Option>
            ))}
          </Select>
        </>
      ),
    },
  ];
 
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
    setIsStaffResignation(true);

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
        // alert(response.data.message);
        setIsStaffResignation(true);

        // navigate("/staffPage/list");
      })
      .catch((error: any) => {
        console.log(error);
      });
  };
  return (
    <>
      {isStaffResignation ? (
        <S.DoneWrapper>
          <div>
            <S.DoneTitle>직원 등록 완료</S.DoneTitle>
            <S.DoneInnerText>
              직원 등록이 완료되었습니다. <br /> 직원에게 아이디를
              전달하시겠습니까?
            </S.DoneInnerText>
          </div>
          <div>
            <img
              src="/images/icons/Graphic_Employee_registered.png"
              alt="Graphic_Employee_registered"
            />
          </div>
          <S.DoneBtnWrapper>
            <S.NoBtn onClick={() => navigate("/staffPage/list")}>
              나중에 할래요
            </S.NoBtn>
            <S.YesBtn>연락처로 전달하기</S.YesBtn>
          </S.DoneBtnWrapper>
        </S.DoneWrapper>
      ) : (
        <S.Wrapper>
          <S.StaffAddHeader>
            <S.OutBox>
              <S.LeftOut onClick={() => navigate(-1)} />
              <S.Appbar>직원등록</S.Appbar>
            </S.OutBox>
          </S.StaffAddHeader>
          <S.Body>
            <Form form={form}>
              <Steps current={current} items={items} />
              <div style={contentStyle}>{steps[current].content}</div>
              <div style={{ marginTop: 24 }}>
                <S.BtnWrapper>
                  {current > 0 && <Button onClick={() => prev()}>이전</Button>}
                  {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
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
            </Form>
          </S.Body>
        </S.Wrapper>
      )}
    </>
  );
};

export default StaffAdd;
