import { LeftOutlined, SmileOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { DatePicker, Select, TimePicker } from "antd";
import { Input } from "antd";

const { TextArea } = Input;

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

export const Body = styled.body`
  padding: 20px;
  margin-top: 1vh;
`;

export const ConsultingTitle = styled.h1``;

export const Label = styled.p`
  margin-top: 4vh;
  font-size: 14px;
  font-weight: 700;
`;

export const Box = styled.div`
  border: 2px solid #dbdbdb;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 9px 2px;
  width: 96px;
  margin-top: 3vh;
  margin-right: 3vw;
`;

export const SmileOut = styled(SmileOutlined)`
  font-size: 24px;
  color: #cfcfcf;
  margin-right: 5px;
`;

export const Name = styled.p`
  font-size: 14px;
`;

export const MemberChoiceButton = styled.button`
  border: 2px solid #c5d6ff;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 2px;
  width: 96px;
  margin-top: 3vh;
  color: #799fff;
`;

export const BoxWrapper = styled.div`
  display: flex;
`;

export const DateOut = styled(DatePicker)`
  margin-top: 3vh;
  width: 200px; // 원하신다면 너비도 설정할 수 있습니다

  & .ant-picker-input > input {
    height: 40px !important; // 원하는 높이로 설정하세요
  }
`;

export const TimeBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TimeOut = styled(TimePicker)`
  margin-top: 3vh;
  width: 160px; // 원하신다면 너비도 설정할 수 있습니다

  & .ant-picker-input > input {
    height: 40px !important; // 원하는 높이로 설정하세요
  }
`;

export const Text = styled.input`
  width: 45vw;
  padding: 0px 10px;
  margin-top: 3vh;
  height: 40px;
  border-radius: 4px;
  border: 1px solid #d9d9d9;

  &:focus {
    border-color: #3f96ff;
    outline: none;
  }
`;

export const TextAreaOut = styled(TextArea)`
  margin-top: 3vh;
`;

export const Footer = styled.footer`
  padding: 20px;
`;

export const Button = styled.button`
  width: 100%;
  height: 8vh;
  background-color: #2d62ea;
  color: white;
  font-size: 16px;
  border-radius: 6px;
  border: none;
`;