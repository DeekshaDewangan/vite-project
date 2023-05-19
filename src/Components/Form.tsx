import React, { useState, FormEvent } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface FormData {
  name: string;
  phone: string;
  email: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if necessary information is provided
    if (formData.name && formData.phone && formData.email) {
      // Save the user details in localStorage
      localStorage.setItem('userDetails', JSON.stringify(formData));

      // Redirect to the second page
      navigate('/Second');
    } else {
      // Redirect back to the first page with an error message
      navigate('/first-page', { state: {errorMessage: 'Please enter your details before accessing the second page.' }});
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Contact Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          label="Phone Number"
          fullWidth
          margin="normal"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default ContactForm;
