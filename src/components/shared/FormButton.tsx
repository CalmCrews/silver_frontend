import React, { useState } from "react";
import styled from "styled-components";

interface ButtonProps {
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
}

const StyledButton = styled.button<ButtonProps>`
  width: 100%;
  height: 3.75rem;
  border-radius: 2rem;
  border: none;
  font-size: ${(props) => props.theme.text.lg};
  color: #fff;
  background-color: ${(props) =>
    props.disabled ? props.theme.colors.grey : props.theme.colors.primary};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

const FormButton = ({
  disabled,
  onClick,
  children,
  type = "button",
}: ButtonProps) => {
  return (
    <StyledButton
      disabled={disabled}
      onClick={disabled ? () => {} : onClick}
      type={type}
    >
      {children}
    </StyledButton>
  );
};

export default FormButton;
