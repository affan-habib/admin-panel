import React from 'react';
import Box from '@mui/material/Box';
import vennEng from '../../assets/vennEng.svg';
import { Grid, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

const VennEnglish
 = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <Grid
      
      sx={{
        borderRadius: '8px',
       
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: "20px",
        height:300,
        marginTop: '10px', 
        [theme.breakpoints.up('md')]: {
          marginTop: '40px', 
        },
      }}
    >
      <Grid sx={{paddingBottom:"8px"}}>
        <Typography style={{ color: 'rgba(21, 83, 19, 1)',fontSize:'17px',fontWeight:'500'}}>{t('venDiagram')}</Typography>
      </Grid>
      <Grid
        sx={{
          backgroundColor: 'rgba(237, 244, 242, 1)'
        }}
      >
        <img
          src={vennEng}
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

export default VennEnglish
;