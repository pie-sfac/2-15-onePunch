import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 5px 1px;
`;
export const CheckBox = styled.input``;

export const CheckBoxWrapper = styled.div`
  border-radius: 10px;
  margin-top: 8px;

  width: 100%;

  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const Selected = styled.div<{ isSelected?: boolean }>`
  background: ${(props) => (props.isSelected ? "#EBF1FF" : "")};
  border: 1px solid ${(props) => (props.isSelected ? "#2D62EA" : "#CFCFCF")};
  width: 320px;
  height: 70px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  padding: 0 10px;
`;
export const BtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 30px;
`;
export const backBtn = styled.button`
  padding: 12px 16px;
  width: 150px;
  text-align: center;
  border-radius: 4px;
  border: 1px solid #cfcfcf;
`;
export const submitBtn = styled.button`
  background: #2d62ea;
  padding: 12px 16px;
  width: 150px;
  text-align: center;
  border-radius: 4px;
  color: #ffffff;
`;

export const Title = styled.p`
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  text-align: center;
  padding: 40px 0;
`;
export const SubTitle = styled.p`
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  width: 330px;
  margin: 8px 0;
`;
export const Text = styled.p`
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
`;

export const Role = styled.p`
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  margin-bottom: 6px;
`;
export const RoleHeader = styled.div`
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
