import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

interface Props {
  id: string;
  label: string;
  required?: boolean;
  type: string;
}

const InputField = ({ id, label, required = false, type }: Props) => {
  return (
    <Box mt={3}>
      <TextField type={type} id={id} label={label} variant="standard" required={required} autoFocus />
    </Box>
  );
};

export default InputField;
