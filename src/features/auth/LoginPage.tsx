import React, { useState } from 'react';
import { Container, Grid, Paper, Typography, TextField, Button, FormControlLabel, Checkbox, InputAdornment, Box, Card, CardContent, CardHeader, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { styled } from '@mui/system';
import PersonIcon from '@mui/icons-material/Person';
import HttpsIcon from '@mui/icons-material/Https';
import image1 from '../../assets/logoOne.svg';
import image2 from '../../assets/logoTwo.svg';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import FooterContainer from '../../sections/auth/FooterContainer';
import LoginFooter from '../../sections/auth/LoginFooter';


const LoginButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'green',
  width: '100%', // Set the width to 100% to match the form fields
}));

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const cardStyle = {
    marginRight: '38px', // Add space between the cards
  };
  // Handle form submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your login logic here
  };

  const containerStyle = {
    paddingTop: '20px', // Adjust the padding as needed
  };
  const [selectedButton, setSelectedButton] = useState('login');
  return (
    <Container maxWidth="lg" style={containerStyle}>
      <Grid container spacing={2}>
        {/* Top Section: SVG Images */}
        <Grid item xs={12} sm={7} style={{ textAlign: 'left' }}>
          <img src={image1} alt="Image 1" />
          <img src={image2} alt="Image 2" />
        </Grid>

        <Grid item xs={12} sm={1}>
        </Grid>

        {/* Right Section: Login Form */}
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6" color="#002F6C" mb={2}>CLMS - এ স্বাগতম</Typography>
            <ToggleButtonGroup
              value={selectedButton}
              exclusive
              onChange={(e, newValue) => setSelectedButton(newValue)}
              aria-label="login or signup"

            >
              <ToggleButton value="login" fullWidth={true}>Login</ToggleButton>
              <ToggleButton value="signup" fullWidth={true}>Signup</ToggleButton>
            </ToggleButtonGroup>
            <form onSubmit={handleLogin}>
              <TextField
                placeholder="Email"
                fullWidth
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                placeholder="Password"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <HttpsIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      {showPassword ? (
                        <VisibilityOffIcon
                          onClick={() => setShowPassword(false)}
                          style={{ cursor: 'pointer' }}
                        />
                      ) : (
                        <RemoveRedEyeIcon
                          onClick={() => setShowPassword(true)}
                          style={{ cursor: 'pointer' }}
                        />
                      )}
                    </InputAdornment>
                  ),
                }}
              />
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label={
                    <Box component="div" fontSize={11}>
                      পরবর্তী ব্যবহারের জনে রাখুন
                    </Box>
                  }
                />
                <Typography variant="body2" style={{ marginLeft: 'auto' }}>
                  <a href="#">Forgot Password?</a>
                </Typography>
              </div>
              <LoginButton variant="contained" color="primary" type="submit">
                Login
              </LoginButton>
            </form>
          </Paper>
        </Grid>

        {/* New Section: 5 Cards */}
        <Grid item xs={12}>
          <FooterContainer></FooterContainer>
        </Grid>

        {/* Bottom Section: Text */}
        <Grid item xs={12}>
          <LoginFooter></LoginFooter>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;
