import React from 'react';
import { Card, Typography, Box, Stack } from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
interface MainCardProps {
  title: string;
  titleRightIcon?: boolean;
  children: React.ReactNode;
  rightButton?: React.ReactNode; // Make rightButton prop optional
}

const MainCard: React.FC<MainCardProps> = ({ title, children, rightButton, titleRightIcon }) => {
  return (
    <>
      <Card
        sx={{
          border: '1px solid #D0D0D0',
          borderRadius: '8px',
        }}
      >
        <Stack
          sx={{
            bgcolor: "#f1ebcc",
            height: 37,
            borderBottom: '2px solid rgba(208, 208, 208, 1)',
            position: 'relative', // Set position relative
          }}
          direction='row'
          alignItems='center'
        >
          <Typography variant="subtitle1" sx={{ ml: 2, color: "primary.main" }}>
            {title}
          </Typography>
          {titleRightIcon &&
          <Box  sx={{ ml: 2, mt: 1 }}>
            <AddBoxOutlinedIcon sx={{ color: "primary.main" }} />
          </Box>
        }
          <Box
          sx={{
            position: 'absolute',
            right: 0, // Adjust the right value based on your preference
          }}
          >
            {rightButton && <Box>{rightButton}</Box>}
          </Box>
        </Stack>
        <Box m={2}>{children}</Box>
      </Card>
    </>
  );
};

export default MainCard;
