import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Button,
  Typography,
  Box, // Import Button from MUI
} from '@mui/material';

interface MainCardProps {
  title: string;
  children: React.ReactNode;
  modalButton?: React.ReactNode; // Add modalButton prop
}

const MainCard: React.FC<MainCardProps> = ({ title, children }) => {
  return (
    <>
      <Card sx={{ width: '100%' }}>
        <Typography align="center" bgcolor="#DEEEC6" p={1} variant="subtitle1">
          {title}
        </Typography>
        <Box m={2}>{children}</Box>
      </Card>
    </>
  );
};

export default MainCard;
