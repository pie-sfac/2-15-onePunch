// Login.styles.ts
import styled from '@emotion/styled';
import { css } from 'styled-components';

export const Container = styled.div`
  width: 375px;
  height: 614px;
  background: #FFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const FormContainer = styled.h2`
padding: 10px;
`

// export const tabStyle = css`
//   color: #AEAEAE;
// `;

export const Title = styled.h2`
  margin-bottom: 20px;
`;

export const Logo = styled.img`
  color: #2D62EA;
  margin-bottom: 20px;
`;

export const InputField = styled.input`
  width: 370px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #CFCFCF;
  border-radius: 4px;
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  margin-bottom: 12px;
  width: 370px;
  // padding: 10px;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  background: ${({ disabled }) => (disabled ? '#F4F4F4' : '#2D62EA')};
  border: none;
  cursor: pointer;
  color: ${({ disabled }) => (disabled ? '#AEAEAE' : '#FFFFFF')};
`;

export const InputBox = styled.div`
  width: 100%;
  padding: 8px 2px 0px 2px;
  margin-bottom: 10px;
  border: none;
`;

export const LinkText = styled.p`
  color: #CFCFCF;
  margin-bottom: 10px;
`;