import { LeftOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Input, Checkbox } from "antd";
import { Label } from "../../tickets/centerTicket/createTicket/createTicketForm.style";

export const Wrapper = styled.div`
`;

export const StaffAddHeader = styled.header`
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
  align-items: center;
  justify-content: center;
`;

export const Appbar = styled.div`
  margin-left: 2vw;
  font-size: 16px;
`;


export const ContentStyle = styled.div`
lineHeight: "260px";
text-align: "center";
color: token.colorTextTertiary;
background: token.colorFillAlter; 
// background: black;
// borderRadius: token.borderRadiusLG;
border: 1px dashed;
margin-top: 16;
`
export const BtnWrapper = styled.div`
margin-top: 24;
`

export const FormInput = styled(Input)`
`

export const FormLabel = styled(Label)`
color: #1d1d1d;
font: var(
    --pretendard-pt-body-4-regular-14,
    400 14px/144% "Pretendard",
    sans-serif
  );
`

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
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
