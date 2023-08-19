import styled from "@emotion/styled";

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: var(--dim-dim, rgba(40, 40, 40, 0.6));
  width: 100%;
  height: 667px;
  padding: 0;
  margin: 0;
`;

export const ModalWrapper = styled.div`
  background: #ffffff;
  border-radius: 10px;
  border-width: 1px solid #cfcfcf;
  padding: 40px 20px 16px 20px;
  position: relative;
`;

export const Icon = styled.img`
  position: absolute;
  right: 20px;
  top: 16px;
`;

export const Contents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  align-items: center;
  justify-content: flex-start;
  width: 300px;
  position: relative;
`;
export const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-end;
  justify-content: flex-start;
  align-self: stretch;
  flex-shrink: 0;
  position: relative;
`;
export const Txt = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  justify-content: center;
  align-self: stretch;
  flex-shrink: 0;
  position: relative;
`;
export const Title = styled.div`
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 8px;
`;

export const Message = styled.div`
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  line-height: 144%;
  white-space: pre-line;
`;

export const BtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const OutBtn = styled.button`
  background: #f4f4f4;
  border-radius: 4px;
  padding: 12px 16px;
  width: 140px;
  color: #1d1d1d;
  text-align: center;
  font-size: 16px;
`;

export const YesBtn = styled.button`
  background: #2d62ea;
  border-radius: 4px;
  padding: 12px 16px;
  width: 140px;
  font-size: 16px;
  color: #ffffff;
  text-align: center;
`;
