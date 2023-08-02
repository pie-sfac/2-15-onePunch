import styled from "@emotion/styled";
import { Input } from "antd";
import { Label } from "../detail/staffDetail.style";

export const StaffInfoWrapper = styled.div`
  border-radius: 10px;
  border-style: solid;
  border-color: #e7e7e7;
  border-width: 1px;
  padding: 20px 10px;
  display: flex;
  flex-direction: row;
  margin: 30px 10px;
`;

export const StaffInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  margin-left: 20px;
  text-align: left;
  gap: 10px;
`;
export const InfoBody = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  align-items: center;
  justify-content: center;
`;

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;

`;

export const Name = styled.div`
  color: #2d62ea;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: 20px;
`;
export const Center = styled.div`
  font-weight: bold;
  display: flex;
  flex-direction: row;
  font-size: 16px;
`;
export const Role = styled.div`
  background: #ebf1ff;
  color: #2d62ea;
  font-size: 10px;
  border-radius: 4px;
  padding: 4px 8px;
`;
export const SendInfoBtn = styled.button`
  background: #fbfbfb;
  border-radius: 10px;
  border-style: solid;
  border-color: #e7e7e7;
  border-width: 1px;
  padding: 4px 10px;
  text-align: center;
`;
export const StaffInfoTitle = styled.div`
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: 20px;
  margin: 15px 0;
`;

export const InfoInput = styled(Input)`

`;

export const InfoLabel = styled(Label)``;

export const SaveBtn = styled.button`
  background: #fbfbfb;
  border-radius: 4px;
  border-style: solid;
  border-color: #e7e7e7;
  border-width: 1px;
  padding: 10px;
  text-align: center;
  width: 70%;
  margin: 20px;
`;


export const StaffEditHeader = styled.div`
  display: flex;
  height: 50px;
  border-bottom: 1px solid #e7e7e7;
  align-items: center;
  padding: 0 15px;
`;


export const Appbar = styled.p`
  // margin-left: auto;
  font-size: 16px;
  margin-right: auto;
`;