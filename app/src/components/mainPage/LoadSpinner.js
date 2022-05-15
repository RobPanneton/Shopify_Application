import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export const LoadSpinner = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        mt: "13px",
        mb: "23px",
      }}
    >
      <CircularProgress />
    </Box>
  );
};
