import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Box, Container } from '@mui/material';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
};

const NotFoundPage: React.FC = () => {
  return (
    <Container maxWidth="sm" sx={styles.container}>
      <Typography variant="h1" color="primary" gutterBottom>
        404
      </Typography>
      <Typography variant="h4" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1" gutterBottom align="center">
        The page you are looking for might have been removed, had its name changed, or is
        temporarily unavailable.
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button component={Link} to="/" variant="contained" color="primary">
          Go to Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
