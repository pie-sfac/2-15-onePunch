import styled from "@emotion/styled";

export const Wrapper = styled.div`
  background-color: #f4f4f4;
  height: calc(100vh - 80px);
  padding: 80px 3vw 300px 3vw;
  display: flex;
  flex-direction: column;

  @media (min-height: 601px) and (max-height: 800px) {
    padding-bottom: 300px;
  }

  @media (min-height: 801px) {
    padding-bottom: 120px;
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
  padding: 7px 16px;
  border: none;
  background: #ffffff;
  border-radius: 4px;
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
