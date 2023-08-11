import { LeftOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Select } from "antd";

// serviceCounter.tsx 스타일
export const ControlWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  gap: 10px;
`;

export const btnStyles = styled.div`
  &,
  & * {
    box-sizing: border-box;
  }
  background: #f4f4f4;
  border-radius: 50%;
  padding: 10px;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  text-align: center;
`;

export const ServiceInput = styled.input`
  width: 90%;
  padding: 10px 5px;
  border-radius: 6px;
  border: 1px solid #dbdbdb;
  text-align: center;
`;
//


export const Wrapper = styled.div``;

export const Header = styled.header`
  display: flex;
  height: 50px;
  border-bottom: 1px solid #e7e7e7;
  align-items: center;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 2vh 0;
`;

export const LeftOut = styled(LeftOutlined)``;

export const OutBox = styled.div`
  cursor: pointer;
  display: flex;
  padding: 0px 10px;
`;
export const ClassTitle = styled.h1``;

export const Appbar = styled.p`
  margin-left: 2vw;
  font-size: 16px;
`;

export const Label = styled.label`
  margin-top: 25px;
  margin-bottom: 5px;
  text-align: left;
  width: 97%;
  font-size: 15px;
`;

export const Box = styled.div`
  border: 1px solid #dbdbdb;
  background-color: #f4f4f4;
  border-radius: 10px;
  display: flex;
  width: fit-content;
  align-items: center;
  justify-content: center;
  padding: 9px 8px;
  margin-top: 3vh;
  white-space: nowrap;
  overflow: hidden;
  cursor: pointer;
`;

export const Footer = styled.footer`
  padding: 20px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 12px 16px;
  background-color: #2D62EA;
  color: white;
  font-size: 14px;
  border-radius: 6px;
  border: none;
  margin: 10vh 0 2vh 0;
`;

export const Selector = styled(Select)`
  width: 95%;
  margin: 0;
  padding: 0;
  & .ant-select-selector {
    height: 40px !important; // 원하는 높이로 설정하세요
    display: flex !important;
    align-items: center !important; // 가운데 정렬
`;

export const BorderInput = styled.input`
  width: 90%;
  border-radius: 4px;
  border: 1px solid #cfcfcf;
  padding: 10px 10px;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
`;

export const UnlimitedPeriod = styled.div<{ isUnlimitedPeriod: boolean }>`
  margin-left: 10px;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;

  color: ${(props) => (props.isUnlimitedPeriod ? "#1D1D1D" : "#aeaeae")};
`;

export const UnlimitedTimes = styled.div<{ isUnlimitedTimes: boolean }>`
  margin-left: 10px;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;

  color: ${(props) => (props.isUnlimitedTimes ? "#1D1D1D" : "#aeaeae")};
`;

export const SwitchWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  margin-left: auto;
  margin-right: 6px;
  gap: 10px;
`;

export const TermWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 97%;
  gap: 5px;
`;

//
export const Form = styled.form`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: left;
`;

export const GreyExplain = styled.p`
  width: 95%;
  padding: 3px 0 10px 0;
  color: #aeaeae;
  font-size: 10px;
  font-weight: 400;
  text-align: left;
`;

export const UnitWrapper = styled.div<{ disabled?: boolean }>`
  width: 90%;

  display: flex;
  flex-direction: row;
  padding: 0px 10px;
  align-items: center;
  justify-content: space-between;

  border-radius: 4px;
  border: 1px solid #cfcfcf;
  padding: 10px 10px;
  color: #aeaeae;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;

  background: ${(props) => (props.disabled ? "#F4F4F4" : "")};
`;
export const UnitText = styled.span`
  margin-left: 5px; // 오른쪽에 여백을 추가하여 "분" 텍스트와의 간격을 설정합니다.
`;

export const Input = styled.input`
  width: 90%;
  border-radius: 4px;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  border: none;

  &:focus {
    outline: none; /* 포커스된 상태에서 브라우저 기본 아웃라인 제거 */
    border-color: #ccc; /* 포커스된 상태에서도 기본 색상 유지 */
  }
`;
