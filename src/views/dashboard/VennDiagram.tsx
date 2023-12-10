import React from 'react';
import Box from '@mui/material/Box';
import vennBng from '../../assets/vennBng.svg';
import { Grid, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

const VennDiagram = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <Grid
      
      sx={{
        backgroundColor: 'rgba(237, 244, 242, 1)',
        borderRadius: '8px',
       
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: "20px",
        height:300,
        marginTop: '10px', // Default margin for small screens
        [theme.breakpoints.up('md')]: {
          marginTop: '40px', // Apply for medium and large screens
        },
      }}
    >
      <Grid sx={{paddingBottom:"8px"}}>
        <Typography style={{ color: 'rgba(21, 83, 19, 1)',fontSize:'17px',fontWeight:'500'}}>{t('venDiagram')}</Typography>
      </Grid>
      <Grid
        sx={{
          backgroundColor: 'rgba(237, 244, 242, 1)',
          // display: 'flex',
          //   justifyContent: 'center',
          //   alignItems: 'center',
        }}
      >
        <img
          src={vennBng}
          alt=""
          style={{
            maxWidth: '100%', // Set maximum width relative to its container
            height:'auto'
            
          }}
        />
      </Grid>
    </Grid>
  );
};

export default VennDiagram;