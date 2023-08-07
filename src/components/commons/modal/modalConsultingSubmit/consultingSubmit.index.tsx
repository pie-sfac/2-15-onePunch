import React from "react";
import * as S from "./consultingSubmit.style";
import { useNavigate } from "react-router-dom";

interface SubmitModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const SubmitModal: React.FC<SubmitModalProps> = ({ isVisible, onClose }) => {
  const navigate = useNavigate();

  return (
    <S.ModalOut
      title="상담 등록 완료"
      visible={isVisible}
      onCancel={onClose}
      footer={null}
    >
      <S.ModalContent>
        <p>상담 등록이 완료되었습니다.</p>
        <S.ConfirmButton
          onClick={() => {
            onClose();
            navigate("/schedulePage/calendar");
          }}
        >
          확인
        </S.ConfirmButton>
      </S.ModalContent>
    </S.ModalOut>
  );
};

export default SubmitModal;
