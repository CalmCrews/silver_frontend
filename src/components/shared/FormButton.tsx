import React, { useState } from "react";
import styled from "styled-components";

interface ButtonProps {
  isEnabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const StyledButton = styled.button<ButtonProps>`
  width: 100%;
  height: 3.75rem;
  border-radius: 2rem;
  border: none;
  font-size: ${(props) => props.theme.text.lg};
  color: #fff;
  background-color: ${(props) => (props.isEnabled ? (props) => props.theme.colors.grey : (props) => props.theme.colors.primary)};
  cursor: ${(props) => (props.isEnabled ? "pointer" : "not-allowed")};
`;

const FormButton = ({ isEnabled, onClick, children }: ButtonProps) => {
  return (
    <StyledButton isEnabled={isEnabled} onClick={isEnabled ? onClick : () => {}}>
      {children}
    </StyledButton>
  );
};

export default FormButton;
