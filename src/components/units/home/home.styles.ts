import styled from "@emotion/styled";
import { Avatar } from "antd";

export const Wrapper = styled.div`
  background-color: #f4f4f4;
  height: calc(100vh - 80px);
  padding: 80px 3vw 300px 3vw;
  display: flex;
  flex-direction: column;

  @media (min-height: 601px) and (max-height: 800px) {
    padding-bottom: 310px;
  }

  @media (min-height: 801px) {
    padding-bottom: 140px;
  }
`;

export const SearchBar = styled.div``;

export const SearchBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Search = styled.input`
  width: 97%;
  padding: 10px 16px;
  border: 1px solid white;
  background: #ffffff;
  border-radius: 10px;
  &:focus {
    outline: none;
    border: 1px solid #4096ff;
  }
`;

export const Label = styled.h2`
  margin-top: 20px;
  color: #505050;
  font-size: 16px;
`;

export const Box = styled.div`
  width: 100%;
  border: none;
  background-color: white;
  border-radius: 10px;
  height: 220px;
  margin-top: 10px;
`;

export const ImageBox = styled.div`
  width: 100%;
  margin-top: 20px;
`;

export const StyledImage = styled.img`
  width: 100%;
`;

export const Icon = styled.img``;

export const Img = styled.svg``;

export const MySchedule = styled.div``;

export const InnerBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  font-size: 16px;
`;

export const IconBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 130px;
`;

export const Number = styled.p`
  color: #0833a0;
  font-size: 32px;
  font-weight: 700;
`;

export const TextLabel = styled.p`
  font-weight: 700;
  margin-bottom: 10px;
`;

export const MembersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 530px; // Adjust this as needed
  overflow-y: auto;
`;

export const MembersBox = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  padding: 10px 15px;
  margin-top: 1vh;
  border-radius: 4px;
  font-size: 13px;
`;

export const AvatarOut = styled(Avatar)``;

export const Name = styled.p`
  margin: 0px 10px;
  font-weight: 700;
`;

export const Sex = styled.p`
  margin-right: 10px;
`;

export const Phone = styled.p``;

export const BirthDate = styled.p`
  margin-left: auto;
`;
