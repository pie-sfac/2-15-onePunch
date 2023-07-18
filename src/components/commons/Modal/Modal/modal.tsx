import React, { ChangeEvent, useState } from "react";
import * as S from "./modal.styles";
import { Button } from "antd";

const Modal = ({ onClose, children }) => {
  return (
    <>
      <S.ModalWrapper>
        <S.Wrapper>
          <S.Header>
            <S.Title>일정 생성</S.Title>
            <S.Label>일정을 생성해주세요. </S.Label>
          </S.Header>
          <S.Main>
            <S.Box>
              <S.BoxTitle>개인 수업</S.BoxTitle>
              <S.BoxLabel>개인 수업 suppoting msg</S.BoxLabel>
              <S.GrayCircle />
            </S.Box>
          </S.Main>
        </S.Wrapper>
      </S.ModalWrapper>
    </>
  );
};

export default Modal;
