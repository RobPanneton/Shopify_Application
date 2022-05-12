import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

import { Typography } from "@mui/material";

export const Results = () => {
  // GET CONTEXT FOR CONTENT
  const { aiResponses } = useContext(AppContext);

  // RENDER THE CONTENT
  return (
    <>
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
                <Typography style={{ whiteSpace: "pre-line" }}>
                  {aiItem.aiResponse}
                </Typography>
              </div>
            );
          })}
        </>
      )}
    </>
  );
};
