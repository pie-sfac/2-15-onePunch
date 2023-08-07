import { LeftOutlined, SmileOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { DatePicker, Modal, Select, TimePicker } from "antd";

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
  padding: 20px;
  margin-top: 1vh;
`;

export const ClassTitle = styled.h1``;

export const Label = styled.p`
  margin-top: 4vh;
  font-size: 14px;
  font-weight: 700;
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

export const SmileOut = styled(SmileOutlined)`
  font-size: 24px;
  color: #cfcfcf;
  margin-right: 5px;
`;

export const Name = styled.p`
  font-size: 14px;
`;

export const MemberChoiceButton = styled.button`
  border: 1px solid #c5d6ff;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 2px;
  width: 96px;
  margin-top: 3vh;
  color: #799fff;
`;

export const SelectOut = styled(Select)`
  width: 100%;
  margin-top: 3vh;
  margin-bottom: 3vh;
  & .ant-select-selector {
    height: 50px !important; // 원하는 높이로 설정하세요
    display: flex !important;
    align-items: center !important; // 가운데 정렬
  }
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
  width: 42vw; // 원하신다면 너비도 설정할 수 있습니다

  & .ant-picker-input > input {
    height: 40px !important; // 원하는 높이로 설정하세요
  }
`;

export const Footer = styled.footer`
  padding: 20px;
`;

export const Button = styled.button`
  width: 100%;
  height: 8vh;
  background-color: #6691ff;
  color: white;
  font-size: 14px;
  border-radius: 6px;
  border: none;
`;

export const MemberBox = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #d9d9d9;
`;

export const MemberTag = styled.div`
  background-color: #f4f4f4;
  padding: 2px 8px;
  border-radius: 6px;
  margin: 0px 2vw;
`;

export const MemberName = styled.p`
  margin-right: 10px;
`;

export const MemberPhone = styled.p``;

export const StaffBox = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #d9d9d9;
`;

export const StaffTag = styled.div`
  background-color: #f4f4f4;
  padding: 2px 8px;
  border-radius: 6px;
  margin: 0px 2vw;
`;

export const StaffName = styled.p`
  margin-right: 10px;
`;

export const StaffPhone = styled.p``;

export const ModalOut = styled(Modal)`
  top: 30%;
  text-align: center;
`;

export const ModalContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

export const ConfirmButton = styled.button`
  background-color: #f4f4f4;
  border: none;
  border-radius: 4px;
  padding: 10px 50px;
  margin-top: 30px;
`;
