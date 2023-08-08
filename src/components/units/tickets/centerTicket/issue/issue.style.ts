import styled from "@emotion/styled";
import { LeftOutlined, SmileOutlined } from "@ant-design/icons";
import { DatePicker, Select } from "antd";
export const IssuedTicketHeader = styled.header`
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

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;
export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: left;
`;

export const Appbar = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0px 10px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const AppbarTitle = styled.div``;
export const Title = styled.div`
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Label = styled.label`
  margin-top: 25px;
  margin-bottom: 5px;
  text-align: left;
  width: 97%;
  font-size: 15px;
`;
export const Input = styled.input`
  width: 90%;
  height: 30px;
  border-radius: 4px;
  border: 1px solid #cfcfcf;
  padding: 5px 10px;
`;

export const DisabledDiv = styled.div`
  width: 90%;
  border-radius: 4px;
  border: 1px solid #cfcfcf;
  padding: 10px 10px;
  background: #f4f4f4;
  color: #aeaeae;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
`;
export const UnitWrapper = styled.div`
  width: 90%;

  display: flex;
  flex-direction: row;
  padding: 0px 10px;
  align-items: center;
  justify-content: space-between;

  border-radius: 4px;
  border: 1px solid #cfcfcf;
  padding: 10px 10px;
  background: #f4f4f4;
  color: #aeaeae;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 95%;
  align-items: center;
  justify-content: left;
  gap: 15px;
  margin: 15px 0;
  padding: 0;
`;

export const LessonType = styled.div`
  color: #2d62ea;
  text-align: center;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  border-radius: 4px;
  background: #ebf1ff;
  width: 80px;
  padding: 5px 0;
`;
export const Button = styled.button`
  background: #2d62ea;
  color: #ffffff;
  border-radius: 4px;
  padding: 10px 16px;
  text-align: center;
  width: 95%;
  font-size: 14px;
  margin-top: 30px;
`;

export const Staffs = styled.button`
  border: 1px solid #c5d6ff;
  border-radius: 10px;
  padding: 12px 2px;
  width: 20%;
  color: #799fff;

  margin-right: auto;
`;

export const SmileOut = styled(SmileOutlined)`
  font-size: 24px;
  color: #cfcfcf;
  margin-right: 5px;
`;

export const StaffName = styled.p`
  font-size: 14px;
`;

export const Searchbar = styled.div`
  border-bottom: 1px solid #e7e7e7;
  height: 50px;

  display: flex;
  flex-direction: row;
  padding: 0 10px;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
export const Search = styled.input`
  width: 80%;
  padding: 7px 8px;
  margin: 5px;
  border-radius: 10px;
  background: #f4f4f4;
  border: none;
`;

export const StaffsBox = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  padding: 10px 15px;
  margin-top: 1vh;
  border-radius: 4px;
  font-size: 13px;
  gap: 10px;
`;

export const ProfileIcon = styled.img``;
export const StaffTag = styled.div`
  border-radius: 4px;
  background: #f4f4f4;
  color: #6691ff;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  padding: 4px 7px;
`;
export const Name = styled.div`
  color: #1d1d1d;
  font-weight: 600;
`;
export const Id = styled.div`
  color: #aeaeae;
  font-weight: 400;
`;
export const Phone = styled.div`
  color: #505050;
  font-weight: 400;
`;
export const DatePick = styled(DatePicker)`
  color: #505050;
  font-weight: 400;
  width: 100%;
  margin: 0 7px;
`;

export const DatePickerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const FormSelect = styled(Select)`
  width: 95%;
`;

export const GreyExplain = styled.p`
  width: 95%;
  padding: 3px 0 10px 0;
  color: #aeaeae;
  font-size: 10px;
  font-weight: 400;
  text-align: left;
`;
