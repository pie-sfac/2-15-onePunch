import { LeftOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
export const Appbar = styled.div`
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
export const LeftOut = styled(LeftOutlined)``;

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
