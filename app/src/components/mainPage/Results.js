import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

import { Grid, Card, CardContent, Typography } from "@mui/material";

export const Results = () => {
  // GET CONTEXT FOR CONTENT
  const { aiResponses } = useContext(AppContext);

  console.log(aiResponses);

  // RENDER THE CONTENT
  return (
    <>
      <Typography variant='h4' fontWeight='600' marginBottom='17px'>
        Responses
      </Typography>
      {aiResponses.length > 0 && (
        <Grid>
          {aiResponses.map((aiItem, index) => {
            return (
              <Card
                key={index}
                variant='outlined'
                sx={{ width: "80%", mb: "13px" }}
              >
                <CardContent>
                  <Typography
                    variant='subtitle2'
                    align='right'
                    sx={{ mb: "23px" }}
                  >
                    {aiItem.time}
                  </Typography>
                  <Typography variant='h6' sx={{ mb: "17px" }}>
                    Question: {aiItem.userInput}
                  </Typography>
                  <Typography variant='h5' style={{ whiteSpace: "pre-line" }}>
                    {aiItem.aiResponse}
                  </Typography>
                </CardContent>{" "}
              </Card>
            );
          })}
        </Grid>
      )}
    </>
  );
};
