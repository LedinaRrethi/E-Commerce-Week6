import React from 'react';
import { Button as MuiButton } from '@mui/material';

interface ButtonProps {
  onClick: () => void;
  label: string;
  color?: 'primary' | 'secondary' | 'error' | 'inherit' | 'info' | 'success' | 'warning'; // 'inherit' is a valid default option
  variant?: 'contained' | 'outlined' | 'text';
  sx?: object;
}

const Button: React.FC<ButtonProps> = ({ onClick, label, color = 'primary', variant = 'contained', sx }) => {
  return (
    <MuiButton onClick={onClick} color={color} variant={variant} sx={sx}>
      {label}
    </MuiButton>
  );
};

export default Button;
