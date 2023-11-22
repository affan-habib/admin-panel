import React from 'react';
import { Container, Typography, Paper, Divider, Box } from '@mui/material';

const UserProfile: React.FC = () => {
  return (
    <Container component="main" maxWidth="xl">
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          // alignItems: 'center',
        }}
      >
        <Typography variant="h5" gutterBottom>
          User Profile
        </Typography>
        <Divider sx={{ width: '100%', marginBottom: 2 }} />
        <Box>
          <Typography variant="h6">Full Name:</Typography>
          <Typography>John Doe</Typography>
        </Box>
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h6">Email:</Typography>
          <Typography>john.doe@example.com</Typography>
        </Box>
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h6">Role:</Typography>
          <Typography>Software Developer</Typography>
        </Box>
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h6">Bio:</Typography>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Typography>
        </Box>
        {/* Add more information as needed */}
      </Paper>
    </Container>
  );
};

export default UserProfile;
