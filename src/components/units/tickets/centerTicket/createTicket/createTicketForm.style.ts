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

export const Body = styled.div`
  padding: 20px;
  margin-top: 1vh;
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

export const Selector = styled(Select)`  
width: 100%;
margin-top: 3vh;
margin-bottom: 3vh;
& .ant-select-selector {
  height: 50px !important; // 원하는 높이로 설정하세요
  display: flex !important;
  align-items: center !important; // 가운데 정렬`;

export const Input = styled.input`
  width: 100%;
  height: 50px
  margin-top: 3vh;
  margin-bottom: 3vh;
  padding: 10px 5px;
  border-radius: 6px;
  border: 1px solid #dbdbdb;
`;

export const ServiceInput = styled.input`
  width: 50%;
  height: 50px
  margin-top: 3vh;
  margin-bottom: 3vh;
  padding: 10px 5px;
  border-radius: 6px;
  border: 1px solid #dbdbdb;
  text-align:center;
`;


export const btnStyles = styled.div`
  &,
  & * {
    box-sizing: border-box;
  }
  background: var(--bg-bg-100, #f4f4f4);
  border-radius: 99px;
  padding: 10px; 
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  position: relative;
  text-align: center;

  .frame-1707478717 {
    position: absolute;
    left: 4px;
    top: 4px;
    overflow: visible;
  }
`;

// export const MiniWrap = styled.div`
// display; flex-box;
// flex-direction: row;
// `

export const ControlWrapper = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
text-align: center;
`

export const BtnLabel = styled.p`
margin-left: 10px;
`


export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: right;
`;