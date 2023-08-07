import { MouseEventHandler } from "react";
import { useNavigate } from "react-router-dom";

export const useOnClickMember = () => {
  const navigate = useNavigate();
  const onClickSubmit: MouseEventHandler<HTMLDivElement> = (event) => {
    const target = event.currentTarget;
    const memberId = target.id;
    navigate(`/memberPage/memberDetail/${memberId}`);
  };

  return {
    onClickSubmit,
  };
};
