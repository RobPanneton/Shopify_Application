import React from "react";

import { MainPage } from "./pages/MainPage";

import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./MuiThemeProvider";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <MainPage />
      </ThemeProvider>
    </>
  );
}

export default App;
