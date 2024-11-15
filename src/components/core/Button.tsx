import { Button as MuiButton } from '@mui/material';

interface ButtonProps {
  onClick: () => void;
  label: string;
  color?: 'primary' | 'secondary' | 'error' | 'inherit' | 'info' | 'success' | 'warning';
  variant?: 'contained' | 'outlined' | 'text';
  sx?: object;
}

const Button = ({ onClick, label, color = 'primary', variant = 'contained', sx }: ButtonProps) => {
  return (
    <MuiButton onClick={onClick} color={color} variant={variant} sx={sx}>
      {label}
    </MuiButton>
  );
};

export default Button;
