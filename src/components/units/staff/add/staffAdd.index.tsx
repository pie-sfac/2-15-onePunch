import * as S from "./staffAdd.style";
import { Checkbox, Select } from "antd";
import { useState } from "react";
// import { CheckBoxWrapper, HiddenCheckBox } from "./staffAdd.style";
import { Button, message, Steps, theme } from "antd";

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};
const options = [
  {
    label: "일반 직원 (기본): 가장 기존적인 권한만 소유하고 있습니다.",
    value: "General",
  },
  {
    label:
      "인포 직원: 직원 관리, 수강권 관리, 일정 관리 권한을 소유하고 있습니다.",
    value: "Info",
  },
  { label: "총괄 매니저: 모든 권한을 소유하고 있습니다.", value: "Manager" },
];

const steps = [
  {
    title: "직원 정보 입력",
    content: (
      <>
        <S.FormLabel>이름</S.FormLabel>
        <S.FormInput placeholder="이름을 입력해 주세요" />
        <S.FormLabel>휴대폰 번호</S.FormLabel>
        <S.FormInput placeholder="010-0000-0000 " />
      </>
    ),
  },
  {
    title: "직원 계정 생성",
    content: (
      <>
        <S.FormLabel>아이디</S.FormLabel>
        <S.FormInput placeholder="3~15자의 영문, 숫자를 사용한 아이디를 입력해 주세요." />
        <S.FormLabel>임시 비밀번호(PIN)</S.FormLabel>
        <S.FormInput placeholder="4~6자리의 숫자로 구성해 주세요." />
      </>
    ),
  },
  {
    title: "역할 설정  ",
    content: (
      <>
        <S.FormLabel>직원 권한</S.FormLabel>
        <Select
          mode="tags"
          style={{ width: "100%" }}
          onChange={handleChange}
          tokenSeparators={[","]}
          options={options}
        />
      </>
    ),
  },
];

// const { Step } = Steps;
const StaffAdd = () => {
  const [checkedList, setCheckedList] = useState<Array<string>>([]);
  ////////////////
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    // lineHeight: '260px',
    // textAlign: 'center',
    // color: token.colorTextTertiary,
    // backgroundColor: token.colorFillAlter,
    // borderRadius: token.borderRadiusLG,
    // border: `1px dashed ${token.colorBorder}`,
    // marginTop: 16,
    margin: `0px`,
    alignItems: `center`,
    padding: `15px`,
    // display: `flex`,
  };
  ///////////////

  const [checkboxStatus, setCheckboxStatus] = useState({
    General: false,
    Info: false,
    Manager: false,
  });

  const handleCheckboxChange = (event: any) => {
    setCheckboxStatus({
      ...checkboxStatus,
      [event.target.name]: event.target.checked,
    });
  };
  console.log(checkboxStatus);

  return (
    <S.Wrapper>
      <S.StaffAddHeader>
        <S.OutBox>
          <S.LeftOut />
          <S.Appbar>직원등록</S.Appbar>
        </S.OutBox>
      </S.StaffAddHeader>
      <S.Body>
        {/* <S.FormLabel>이름</S.FormLabel>
        <S.FormInput placeholder="이름을 입력해 주세요" />
        <S.FormLabel>휴대폰 번호</S.FormLabel>
        <S.FormInput placeholder="010-0000-0000 " />
        <S.FormLabel>아이디</S.FormLabel>
        <S.FormInput placeholder="3~15자의 영문, 숫자를 사용한 아이디를 입력해 주세요." />
        <S.FormLabel>임시 비밀번호(PIN)</S.FormLabel>
        <S.FormInput placeholder="4~6자리의 숫자로 구성해 주세요." />
        <S.FormLabel>직원 권한</S.FormLabel>
        <Select
          mode="tags"
          style={{ width: "100%" }}
          onChange={handleChange}
          tokenSeparators={[","]}
          options={options}
        /> */}
        <Steps current={current} items={items} />
        <div style={contentStyle}>{steps[current].content}</div>
        <div style={{ marginTop: 24 }}>
          {current > 0 && (
            <Button style={{ marginLeft: "25%" }} onClick={() => prev()}>
              이전
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button
              style={{ marginRight: "25%" }}
              type="primary"
              onClick={() => next()}
            >
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => message.success("Processing complete!")}
            >
              완료
            </Button>
          )}
        </div>
      </S.Body>
    </S.Wrapper>
  );
};

export default StaffAdd;
