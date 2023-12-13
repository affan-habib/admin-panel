import React from 'react';
import {
  Card,
  Typography,
  Box,
  Stack,
} from '@mui/material';

interface MainCardProps {
  title: string;
  children: React.ReactNode;
  rightButton?: React.ReactNode; // Make rightButton prop optional
}

const MainCard: React.FC<MainCardProps> = ({ title, children, rightButton }) => {
  return (
    <>
      <Card
        sx={{
          border: '1px solid #D0D0D0',
          borderRadius: '8px',
          
        }}
      >
        <Stack sx={{ bgcolor: "#DEEEC6", height:37,borderBottom: '2px solid rgba(208, 208, 208, 1)', }} justifyContent='space-between' direction='row' alignItems='center'>
          <Typography variant="subtitle1" sx={{ ml: 2 }}>
            {title}
          </Typography>
          <Box>
            {rightButton && <Box>{rightButton}</Box>}
          </Box>
        </Stack>
        <Box m={2}>{children}</Box>
      </Card>
    </>
  );
};

export default MainCard;
