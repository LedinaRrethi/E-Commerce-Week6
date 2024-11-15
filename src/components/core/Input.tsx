import React from 'react';
import { TextField } from '@mui/material';

interface InputProps {
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  inputProps?: object;
  sx?: object;
}

const Input = ({ label, value, onChange, type = 'text', inputProps, sx }: InputProps) => {
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      type={type}
      fullWidth
      margin="normal"
      inputProps={inputProps}
      sx={sx}
    />
  );
};

export default Input;
