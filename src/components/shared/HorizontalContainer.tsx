import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  overflow-x: auto; /* 가로 스크롤을 활성화 */
  width: 100%;
  white-space: nowrap; /* 요소들이 가로로 나열되도록 설정 */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const HorizontalContainer = ({children} : {children: React.ReactNode}) => {
  return (
    <Container>
      <div style={{display: "flex"}}>
        {children}
      </div>
    </Container>
  );
}

export default HorizontalContainer;