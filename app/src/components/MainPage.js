import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";

import styled from "styled-components";

export const MainPage = () => {
  // GET CONTEXT
  const {
    userInput,
    engineSelect,
    emptyInputWarning,
    aiResponses,
    engineOptions,
    warningMessage,
    handleSelectChange,
    handleTextFieldChange,
    submitInputToBE,
  } = useContext(AppContext);

  return (
    <>
      <MainWrapper>
        <ContentWrapper maxWidth='50%' sx={{ borderRadius: "11px" }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              return submitInputToBE();
            }}
          >
            <Grid container justifyContent='space-between'>
              <Typography variant='h3' fontWeight='600' marginBottom='23px'>
                Playground
              </Typography>
              <Box sx={{ minWidth: 200 }}>
                <FormControl fullWidth>
                  <InputLabel id='engine-select-label'>Engine</InputLabel>
                  <Select
                    InputProps={{ inputProps: { tabIndex: 0 } }}
                    labelId='engine-select-label'
                    id='engine-select'
                    label='Engine'
                    variant='outlined'
                    value={engineSelect}
                    onChange={handleSelectChange}
                  >
                    {engineOptions.map((option) => {
                      return (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <TextField
              label='Enter Prompt'
              value={emptyInputWarning ? warningMessage : userInput}
              multiline={true}
              rows='7'
              onChange={handleTextFieldChange}
              fullWidth
              focused
            ></TextField>
            <div className='submit-div'>
              <Button color='primary' variant='contained' type='submit'>
                Submit
              </Button>
            </div>
            <Typography variant='h4' fontWeight='600'>
              Responses
            </Typography>
            {aiResponses.length > 0 && (
              <>
                {aiResponses.map((aiItem, index) => {
                  return (
                    <div key={index}>
                      <Typography>{aiItem.userInput}</Typography>
                      <Typography>{aiItem.time}</Typography>
                      <Typography>{aiItem.aiResponse}</Typography>
                    </div>
                  );
                })}
              </>
            )}
          </form>
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
  margin: 72px auto 0 auto;
  max-width: 50%;

  div.submit-div {
    display: flex;
    justify-content: flex-end;

    margin-top: 11px;
  }
`;
