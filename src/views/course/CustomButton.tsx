import React, { ReactNode, MouseEvent } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface CustomBoxProps {
  icon: ReactNode;
  title: string;
  onClick: (event: MouseEvent<HTMLDivElement>) => void;
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
        height: '100px',
        border: '1px solid rgba(208, 208, 208, 1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.3s',
        '&:hover': {
          backgroundColor: 'primary.main',
          color: 'white',
          '& svg': {
            color: 'white',
          },
          '& div:nth-of-type(2)': {
            backgroundColor: 'primary.main',
            color: 'white',
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
            backgroundColor: 'primary.main',
            color: 'white',
          },
        }}
      >
        <Typography>{title}</Typography>
      </Box>
    </Box>
  );
};

export default CustomButton;
