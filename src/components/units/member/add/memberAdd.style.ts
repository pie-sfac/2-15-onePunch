import { LeftOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Select } from "antd";

export const Wrapper = styled.div``;

export const Header = styled.header`
  display: flex;
  height: 50px;
  border-bottom: 1px solid #e7e7e7;
  align-items: center;
`;

export const OutBox = styled.div`
  cursor: pointer;
  display: flex;
  padding: 0px 10px;
`;

export const CreateScheduleText = styled.p`
  margin-left: 2vw;
  font-size: 16px;
`;

export const LeftOut = styled(LeftOutlined)``;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FormHeading = styled.h1`
  font-size: 26px;
  margin-top: 30px;
  margin-bottom: 4px;
`;

export const FormSubHeading = styled.p`
  font-size: 14px;
`;

export const FormBody = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

export const FormLabel = styled.label`
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 14px;
`;

export const FormInput = styled.input`
  padding: 9px 11px;
  border: 1px solid #dddddd;
  border-radius: 6px;
  &:focus {
    border-color: #3f96ff;
    outline: none;
  }
  &::placeholder {
    color: #c5c5c5; /* 원하는 색상으로 변경하세요 */
  }
`;

export const ErrorText = styled.p`
  font-size: 11px;
  margin-top: 5px;
  color: #e75d55;
`;

export const CheckboxContainer = styled.div`
  margin-bottom: 50px;
  display: flex;
  align-items: center;
  background-color: #f4f4f4;
  padding: 15px;
  border-radius: 4px;
`;

export const FormCheckbox = styled.input`
  margin-right: 4px;
`;

export const FormCheckboxLabel = styled.label`
  font-size: 14px;
  font-weight: 700;
  margin-top: 20px;
  margin-bottom: 10px;
`;

export const FormCheckboxText = styled.p`
  font-size: 14px;
`;

export const SubmitButton = styled.input`
  margin-bottom: 50px;
  border: none;
  border-radius: 4px;
  background-color: ${({ disabled }) => (disabled ? "#F4F4F4" : "#2D62EA")};
  color: ${({ disabled }) => (disabled ? "" : "white")};
  padding: 12px 0px;
`;

export const SelectOut = styled(Select)`
  & .ant-select-selector {
    height: 40px !important; // 원하는 높이로 설정하세요
    display: flex !important;
    align-items: center !important; // 가운데 정렬
  }
`;

export const RegistrationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const RegistrationTitle = styled.h1`
  font-size: 26px;
  font-weight: 700;
`;

export const RegistrationText = styled.p`
  margin-top: 20px;
  font-size: 14px;
`;

export const RegistrationImage = styled.img`
  width: 300px;
  height: 300px;
`;

export const CloseButton = styled.button`
  background-color: #f4f4f4;
  width: 30%;
  padding: 10px 0px;
  margin: 0px 5px;
  border-radius: 4px;
`;

export const ViewMemberButton = styled.button`
  // Add your styles here
  width: 30%;
  padding: 10px 0px;
  background-color: #2d62ea;
  color: white;
  margin: 0px 5px;
  border-radius: 4px;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  text-align: center;
`;
