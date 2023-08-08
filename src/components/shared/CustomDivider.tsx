import React from 'react';
import { styled } from 'styled-components';

interface DividerProps {
  color: string;
  width: string;
}

const StyledDivider = styled.hr<DividerProps>`
  border: 0;
	border-radius: 5px;
  height: 5px;
  background-color: ${props => props.color};
  width: ${props => props.width};
`;

const CustomDivider = ({ color, width }: DividerProps) => {
  return <StyledDivider color={color} width={width} />;
}

export default CustomDivider;