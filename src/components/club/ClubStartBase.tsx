import React from "react";
import SimpleAppBar from "../../components/SimpleAppBar";
import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 20px 45px;
`;

const ClubStartBase = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container>
      <SimpleAppBar />
      {children}
    </Container>
  );
};

export default ClubStartBase;
