import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import styled from "styled-components";

import { ResultCard } from "./ResultCard";
import { LoadSpinner } from "./LoadSpinner";

import { Grid, Typography } from "@mui/material";

export const Results = () => {
  // GET CONTEXT FOR CONTENT
  const { aiResponses, isLoading } = useContext(AppContext);

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
      {isLoading && <LoadSpinner />}
      <Grid container item>
        {aiResponses.length > 0 && (
          <Grid item sx={{ width: "100%" }}>
            {aiResponses.map((aiItem, index) => {
              return <ResultCard aiItem={aiItem} key={index} />;
            })}
          </Grid>
        )}
      </Grid>
    </ResultsSectionWrapper>
  );
};

const ResultsSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;

  #responses-title {
    margin: 0 auto;
    margin-bottom: 11px;
  }
`;
