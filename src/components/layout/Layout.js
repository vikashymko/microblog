import React from "react";
import Header from "./Header";
import styled from "styled-components";

const MainContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Content = styled.main`
  flex: 1;
  padding: 20px;
  margin-bottom: 60px; // To accommodate the fixed footer
`;

const Layout = ({ children }) => {
  return (
    <MainContainer>
      <Header />
      <Content>{children}</Content>
    </MainContainer>
  );
};

export default Layout;
