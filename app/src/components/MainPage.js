import React from "react";

import { Container, Typography, Button, TextField } from "@mui/material";

import styled from "styled-components";

export const MainPage = () => {
  return (
    <>
      <MainWrapper>
        <ContentWrapper maxWidth='30%'>
          <Typography variant='h3' fontWeight='600' marginBottom='23px'>
            Fun with AI
          </Typography>
          <TextField
            label='Enter Prompt'
            multiline='true'
            rows='3'
            fullWidth
            focused
          ></TextField>
          <div className='submit-div'>
            <Button color='primary' variant='contained'>
              Submit
            </Button>
          </div>
          <Typography variant='h4' fontWeight='600'>
            Responses
          </Typography>
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

const ContentWrapper = styled(Container)`
  margin: 0 auto;
  border: 1px solid black;
  max-width: 30%;

  div.submit-div {
    display: flex;
    justify-content: flex-end;

    margin-top: 11px;
  }
`;
