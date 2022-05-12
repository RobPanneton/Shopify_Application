import React, { useState, useEffect } from "react";

import { Container, Typography, Button, TextField } from "@mui/material";
import styled from "styled-components";

export const MainPage = () => {
  const [userInput, setUserInput] = useState("");
  const [aiResponses, setAiResponses] = useState([]);

  useEffect(() => {
    console.log(aiResponses);
  }, [aiResponses]);

  const submitInputToBE = async () => {
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
    console.log(bodyData);
    const res = await fetch(
      "https://api.openai.com/v1/engines/text-curie-001/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_SECRET}`,
        },
        body: JSON.stringify(bodyData),
      }
    );

    const data = await res.json();

    setAiResponses([...aiResponses, { userInput, ...data }]);
    setUserInput("");

    return;
  };

  return (
    <>
      <MainWrapper>
        <ContentWrapper maxWidth='50%' sx={{ borderRadius: "11px" }}>
          <Typography variant='h3' fontWeight='600' marginBottom='23px'>
            Fun with AI
          </Typography>
          <TextField
            label='Enter Prompt'
            multiline={true}
            rows='7'
            onChange={(e) => {
              setUserInput(e.target.value);
            }}
            fullWidth
            focused
          ></TextField>
          <div className='submit-div'>
            <Button
              color='primary'
              variant='contained'
              onClick={submitInputToBE}
            >
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
                    <Typography>{aiItem.choices[0].text}</Typography>
                  </div>
                );
              })}
            </>
          )}
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
  border: 1px solid black;
  max-width: 50%;

  div.submit-div {
    display: flex;
    justify-content: flex-end;

    margin-top: 11px;
  }
`;
