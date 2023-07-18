import React from "react";
import styled from "@emotion/styled";

const BackdropWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 50;
`;

const Backdrop = ({ onClick }) => {
  return <BackdropWrapper onClick={onClick} />;
};

export default Backdrop;
