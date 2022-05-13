import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

import {
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

export const Form = () => {
  // GET CONTEXT
  const {
    userInput,
    engineSelect,
    emptyInputWarning,
    engineOptions,
    warningMessage,
    handleSelectChange,
    handleTextFieldChange,
    submitInputToBE,
  } = useContext(AppContext);

  // RENDER THE FORM
  return (
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
              inputProps={{ tabIndex: 0 }}
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
    </form>
  );
};
