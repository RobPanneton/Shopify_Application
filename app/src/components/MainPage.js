import React, { useState, useEffect } from "react";

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
  // USE STATE
  const [userInput, setUserInput] = useState("");
  const [engineSelect, setEngineSelect] = useState("text-curie-001");
  const [emptyInputWarning, setEmptyInputWarning] = useState(false);
  const [aiResponses, setAiResponses] = useState([]);

  // ENGINES
  const engineOptions = [
    "text-davinci-002",
    "text-curie-001",
    "text-babbage-001",
    "text-ada-001",
  ];

  // USE EFFECTS
  // UTILS
  useEffect(() => {
    if (emptyInputWarning === true && userInput !== "")
      setEmptyInputWarning(false);
  }, [userInput]);

  //CONSOLE LOGS
  useEffect(() => {
    console.log(aiResponses);
  }, [aiResponses]);

  useEffect(() => {
    console.log(engineSelect);
  }, [engineSelect]);

  const handleSelectChange = (e) => {
    setEngineSelect(e.target.value);
  };

  const submitInputToBE = async () => {
    // CHECK IF INPUT IS EMPTY -- BREAK OUT OF SUBMIT IF TRUE
    if (userInput === "") return setEmptyInputWarning(true);

    // PREPARE POST REQUEST BODY
    const bodyData = {
      prompt: userInput,
      temperature: 0.5,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    };

    // FETCH RESPONSE FROM BACK END
    const res = await fetch(
      `https://api.openai.com/v1/engines/${engineSelect}/completions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_SECRET}`,
        },
        body: JSON.stringify(bodyData),
      }
    );

    // CONVERT DATA TO JS OJBECT
    const data = await res.json();

    // GET TIME STRING
    const responseTime = new Date(data.created * 1000).toLocaleString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });

    // SET RESPONSE OBJECT W/ INPUT AND TIME AT BEGINNING OF RESPONSE ARRAY, RESET CURRENT INPUT TO ""
    setAiResponses([
      {
        userInput,
        time: responseTime,
        aiResponse: data.choices[0].text,
      },
      ...aiResponses,
    ]);
    return setUserInput("");
  };

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
              value={userInput}
              multiline={true}
              rows='7'
              onChange={(e) => {
                setUserInput(e.target.value);
              }}
              fullWidth
              focused
            ></TextField>
            <div className='submit-div'>
              <Button color='primary' variant='contained' type='submit'>
                Submit
              </Button>
            </div>
            {emptyInputWarning === true && (
              <Typography variant='h3' fontWeight='800'>
                Please enter something in the text box
              </Typography>
            )}
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
