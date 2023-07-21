import styled from "@emotion/styled";
import { DatePicker } from "antd";

export const Wrapper = styled.div`
  background-color: #f4f4f4;
  padding: 7vh 3vw 15vh 3vw;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 2vh 0vh;
`;

export const ViewOptions = styled.div``;

export const Select = styled.select`
  width: 50px;
  height: 40px;
  border-radius: 10px;
  text-align: center;
  background-color: #ffffff;
  border: 1px solid #e7e7e7;
  font-size: 12px;
  color: #333333;
  padding: 5px;
  outline: none;
  transition: border-color 0.3s ease;
  &:hover {
    border-color: #4096ff;
  }

  &:focus {
    border-color: #4096ff;
  }
`;

export const Option = styled.option`
  font-size: 12px;
  color: #333333;
  background-color: #ffffff;
  padding: 5px;
  border-radius: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e7e7e7;
  }

  &:disabled {
    color: #999999;
  }
`;

export const CustomDatePicker = styled(DatePicker)`
  border-radius: 10px;
  height: 40px;
  width: 130px;
  border: 1px solid #e7e7e7;
  &:hover {
    border-color: #4096ff;
  }

  &:focus {
    border-color: #4096ff;
  }
`;

export const CustomDatePickerWeek = styled(DatePicker)`
  border-radius: 10px;
  height: 40px;
  width: 130px;
  border: 1px solid #e7e7e7;
  &:hover {
    border-color: #4096ff;
  }

  &:focus {
    border-color: #4096ff;
  }
`;

export const CustomDatePickerWeekMonth = styled(DatePicker)`
  border-radius: 10px;
  height: 40px;
  width: 130px;
  border: 1px solid #e7e7e7;
  &:hover {
    border-color: #4096ff;
  }

  &:focus {
    border-color: #4096ff;
  }
`;

export const Button = styled.button`
  width: 146px;
  height: 44px;
  background-color: #6691ff;
  color: white;
  border-radius: 4px;
  border: none;
`;

export const Main = styled.main`
  padding: 1vh 3vw 5vh 3vw;
`;
