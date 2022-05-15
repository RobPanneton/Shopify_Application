import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

import { Grid, Card, CardContent, Typography } from "@mui/material";

import styled from "styled-components";

export const Results = () => {
  // GET CONTEXT FOR CONTENT
  const { aiResponses } = useContext(AppContext);

  console.log(aiResponses);

  // RENDER THE CONTENT
  return (
    <ResultsSectionWrapper>
      <Typography
        id='responses-title'
        variant='h4'
        fontWeight='600'
        marginBottom='17px'
      >
        Responses
      </Typography>
      <Grid container item>
        {aiResponses.length > 0 && (
          <Grid item>
            {aiResponses.map((aiItem, index) => {
              return (
                <Card
                  key={index}
                  variant='outlined'
                  sx={{ width: "100%", mb: "13px" }}
                >
                  <CardContent>
                    <Typography
                      variant='subtitle2'
                      align='right'
                      sx={{ mb: "23px" }}
                    >
                      {aiItem.time}
                    </Typography>
                    <Typography>Question:</Typography>
                    <Typography variant='h6' sx={{ mb: "17px" }}>
                      {aiItem.userInput}
                    </Typography>
                    <Typography
                      variant='body1'
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {aiItem.aiResponse}
                    </Typography>
                  </CardContent>
                </Card>
              );
            })}
          </Grid>
        )}
      </Grid>
    </ResultsSectionWrapper>
  );
};

const ResultsSectionWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;

  #responses-title {
    margin: 0 auto;
    margin-bottom: 11px;
  }
`;
