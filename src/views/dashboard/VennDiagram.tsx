import React from 'react';
import Box from '@mui/material/Box';
import Group26 from '../../assets/Group26.svg';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const VennDiagram = () => {
  const {t} = useTranslation();
  return (
    <Box
      height={315}
      width={490}
      sx={{
        backgroundColor: 'rgba(237, 244, 242, 1)',
        borderRadius: '10px',
        mt: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box sx={{ mb: 2 }}>
        <Typography style={{color:'rgba(21, 83, 19, 1)'}}>{t('venDiagram')}</Typography>
      </Box>
      <Box
      width={400}
      height={200}
        sx={{
          backgroundColor: 'rgba(254, 254, 254, 1)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img src={Group26} alt=""
        //  style={{padding:'40px'}}
          />
      </Box>
    </Box>
  );
};

export default VennDiagram;
