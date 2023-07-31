import styled from "@emotion/styled";

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: var(--dim-dim, rgba(40, 40, 40, 0.60));
  width: 100%;
  height: 640px;
`;

export const ModalWrapper = styled.div`
  box-sizing: border-box;
  background: var(--bg-bg-wh, #ffffff);
  border-radius: 10px;
  border-style: solid;
  border-color: var(--borderline-line-300, #cfcfcf);
  border-width: 1px;
  padding: 40px 20px 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
  position: relative;
`;
// .ModalWrapper * {
//   box-sizing: border-box;
// }

export const Icon = styled.svg`
  flex-shrink: 0;
  position: absolute;
  right: 20px;
  top: 16px;
  overflow: visible;
`;

export const Contents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  align-items: center;
  justify-content: flex-start;
  flex-shrink: 0;
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
  color: var(--text-text-900, #1d1d1d);
  text-align: center;
  font: 400 16px/136% "ABeeZee", sans-serif;
  position: relative;
  align-self: stretch;
`;

export const Message = styled.div`
  color: var(--text-text-900, #1d1d1d);
  text-align: center;
  font: 400 14px/144% "Pretendard", sans-serif;
  position: relative;
  align-self: stretch;
`;

export const BtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
`;

export const NoBtn = styled.button`
  background: var(--bg-bg-100, #f4f4f4);
  border-radius: 4px;
  padding: 12px 16px 12px 16px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 146px;
  position: relative;

  color: var(--text-text-900, #1d1d1d);
  text-align: center;
  font: 400 16px/144% "Pretendard", sans-serif;
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const YesBtn = styled.button`
  background: var(--primary-primary-500, #2d62ea);
  border-radius: 4px;
  padding: 12px 8px 12px 8px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 146px;
  position: relative;

  color: var(--text-text-wh, #ffffff);
  text-align: center;
  font: 400 14px/144% "Pretendard", sans-serif;
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
