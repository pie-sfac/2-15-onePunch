import React from "react";
import { Modal } from "antd";
import { Phone } from "../../../units/home/home.styles";
import * as S from "./selectStaffModal.style";

export default function SelectStaffModal(
  isVisible: any,
  staffs: any,
  setIsVisible: any,
  onClickGetId: any
) {
  return (
    <Modal
      title="담당 강사 선택"
      visible={isVisible}
      onOk={() => setIsVisible(false)}
      onCancel={() => setIsVisible(false)}
      footer={null}
    >
      {staffs.map((staff: any, index: any) => (
        <S.StaffBox key={index} id={staff.id} onClick={onClickGetId}>
          <S.SmileOut />
          <S.StaffTag>직원</S.StaffTag>
          <S.StaffName>{staff.name}</S.StaffName>
          <S.StaffPhone>{Phone(staff.phone)}</S.StaffPhone>
        </S.StaffBox>
      ))}
    </Modal>
  );
}
