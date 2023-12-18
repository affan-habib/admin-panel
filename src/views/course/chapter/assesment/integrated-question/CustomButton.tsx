import React, { ReactNode, MouseEvent } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface CustomBoxProps {
  icon: ReactNode;
  title: string;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  disabled?: boolean;
  selected?: boolean;
}

const CustomButton: React.FC<CustomBoxProps> = ({
  icon,
  title,
  onClick,
  disabled,
  selected,
}) => {
  return (
    <Box
      sx={{
        width: '100px',
        background: 'white',
        cursor: disabled ? 'normal' : 'pointer',
        height: '100px',
        border: '1px solid #D0D0D0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.3s',
        backgroundColor: selected ? '#D0D0D0' : 'white',
        color: selected ? 'black' : 'inherit',
        '&:hover': {
          backgroundColor: disabled ? 'inherit' : '#D0D0D0',
          color: disabled ? 'inherit' : 'black',
          '& svg': {
            color: disabled ? 'inherit' : 'black',
          },
          '& div:nth-of-type(2)': {
            backgroundColor: disabled
              ? 'rgba(217, 217, 217, 1)'
              : '#D0D0D0',
            color: disabled ? 'inherit' : 'black',
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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
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
