import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Box, TextField, Button, Snackbar, Typography } from '@mui/material';

const formSchema = z.object({
  fullName: z.string().min(1, { message: 'Full name is required' }),
  email: z.string().email({ message: 'Invalid email address' }).min(1, { message: 'Email is required' }),
  phone: z
    .string()
    .min(1, { message: 'Phone number is required' })
    .regex(/^\+?[1-9]\d{1,14}$/, { message: 'Phone number must be a valid number with optional + sign' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters long' }),
});

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  message: string;
};

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(formSchema) });

  const [success, setSuccess] = useState(false);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    setSuccess(true);
    reset();
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: '500px', mx: 'auto', mt: 4 }}>
      <Typography variant="h1" sx={{ my: 2, color: 'primary.main', display: 'flex', justifyContent: 'center' }}>
        Contact Us
      </Typography>

      <TextField
        fullWidth
        label="Full Name"
        {...register('fullName')}
        error={!!errors.fullName}
        helperText={errors.fullName?.message}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Email"
        {...register('email')}
        error={!!errors.email}
        helperText={errors.email?.message}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Phone Number"
        type="tel"
        {...register('phone')}
        error={!!errors.phone}
        helperText={errors.phone?.message}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Message"
        multiline
        rows={4}
        {...register('message')}
        error={!!errors.message}
        helperText={errors.message?.message}
        margin="normal"
      />

      <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
        Send Message
      </Button>

      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
        message="Message sent successfully"
      />
    </Box>
  );
}
