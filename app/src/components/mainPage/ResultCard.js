import React from "react";

import { Card, CardContent, Typography } from "@mui/material";

export const ResultCard = ({ aiItem, index }) => {
  return (
    <Card variant='outlined' sx={{ width: "100%", mb: "13px" }}>
      <CardContent sx={{ mb: "17px" }}>
        <Typography variant='subtitle2' align='right' sx={{ mb: "23px" }}>
          {aiItem.time}
        </Typography>
        <Typography variant='h6'>Question:</Typography>
        <Typography variant='h5' sx={{ mb: "17px" }}>
          {aiItem.userInput}
        </Typography>
        <Typography variant='h6'>Ai Response:</Typography>
        <Typography variant='h5' style={{ whiteSpace: "pre-line" }}>
          {aiItem.aiResponse}
        </Typography>
      </CardContent>
    </Card>
  );
};
