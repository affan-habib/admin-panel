import React, { ReactNode, MouseEvent } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface CustomBoxProps {
  icon: ReactNode;
  title: string;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  disabled?: boolean;
}

const CustomButton: React.FC<CustomBoxProps> = ({
  icon,
  title,
  onClick,
  disabled,
}) => {
  return (
    <Box
      sx={{
        width: '100px',
        cursor: disabled ? 'normal' : 'pointer',
        height: '100px',
        border: '1px solid rgba(208, 208, 208, 1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.3s',
        '&:hover': {
          backgroundColor: disabled ? 'inherit' : 'primary.main',
          color: disabled ? 'inherit' : 'white',
          '& svg': {
            color: disabled ? 'inherit' : 'white',
          },
          '& div:nth-of-type(2)': {
            backgroundColor: disabled
              ? 'rgba(217, 217, 217, 1)'
              : 'primary.main',
            color: disabled ? 'inherit' : 'white',
          },
        },
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '12px',
        }}
      >
        {icon}
      </Box>
      <Box
        sx={{
          height: '50%',
          width: '100%',
          backgroundColor: 'rgba(217, 217, 217, 1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background-color 0.3s',
          '&:hover': {
            backgroundColor: disabled ? 'inherit' : 'primary.main',
            color: disabled ? 'inherit' : 'white',
          },
        }}
      >
        <Typography align="center" sx={{ fontSize: 15 }}>
          {title}
        </Typography>
      </Box>
    </Box>
  );
};

export default CustomButton;
