import React from "react";

import { Form } from "../components/mainPage/Form";
import { Results } from "../components/mainPage/Results";

import { Container } from "@mui/material";
import styled from "styled-components";

export const MainPage = () => {
  return (
    <>
      <MainWrapper>
        <ContentWrapper sx={{ borderRadius: "11px" }}>
          <Form />
          <Results />
        </ContentWrapper>
      </MainWrapper>
    </>
  );
};

const MainWrapper = styled(Container)`
  min-width: 100%;
  max-width: 100%;
  min-height: 100vh;

  display: flex;
  justify-content: center;

  padding: 34px 0;

  font-family: "Quicksand";
`;

const ContentWrapper = styled.div`
  margin: 72px auto 0 auto;
  max-width: 50%;

  @media only screen and (max-width: 900px) {
    max-width: 100%;
  }

  div.submit-div {
    display: flex;
    justify-content: flex-end;

    margin: 17px 0;
  }
`;
