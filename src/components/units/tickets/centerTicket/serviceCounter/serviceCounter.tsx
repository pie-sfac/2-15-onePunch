import React from "react";
import * as S from "../create/createTicketForm.style";

interface ServiceCountProps {
  onDecrement: () => void;
  onIncrement: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: number | string;
  disabled?: boolean;
}

const ServiceCounter: React.FC<ServiceCountProps> = ({
  onDecrement,
  onIncrement,
  onChange,
  value,
  disabled = false,
}) => {
  return (
    <>
      <S.ControlWrapper>
        <S.btnStyles onClick={onDecrement}>-</S.btnStyles>
        <S.ServiceInput
          type="number"
          name="maxServiceCount"
          value={value}
          onChange={onChange}
          className="text-field2"
          disabled={disabled}
          onWheel={(e) => e.preventDefault()}
        />
        <S.btnStyles onClick={onIncrement}>+</S.btnStyles>
      </S.ControlWrapper>
    </>
  );
};

export default ServiceCounter;
