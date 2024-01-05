import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Groups2Icon from '@mui/icons-material/Groups2';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { useTranslation } from 'react-i18next';

interface CardData {
  title: string;
  digit: string;
  backgroundColor: string;
  icon: React.ReactNode; 
}

const TopCards: React.FC = () => {
  const { t } = useTranslation();

  const cardsData: CardData[] = [
    {
      title: t('currentBatch'),
      digit: t('number1'),
      backgroundColor: '#dde6f4',
      icon: <Groups2Icon sx={{ fontSize: '35px' }} />, 
    },
    {
      title: t('trainer'),
      digit: t('number2'),
      backgroundColor: '#dde6f4',
      icon: <PersonOutlineIcon sx={{ fontSize: '35px' }} />,
    },
    {
      title: t('enrolledTrainees'),
      digit: t('number1'),
      backgroundColor: '#dde6f4',
      icon: <PersonOutlineIcon sx={{ fontSize: '35px' }} />, 
    },
    {
      title: t('curriculum'),
      digit: t('number2'),
      backgroundColor: '#dde6f4',
      icon: <MenuBookIcon sx={{ fontSize: '35px' }} />, 
    }
  ];

  const CustomCard: React.FC<CardData> = ({
    title,
    digit,
    backgroundColor,
    icon,
  }) => (
    <Card
      style={{
        borderRadius: '8px',
        border: '1px solid #73A3CA',
        background: backgroundColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px'
      }}
    >
      <CardContent>
        <Typography variant="subtitle1" gutterBottom color='primary.main'>
          {title}
        </Typography>
        <Typography variant="h6" color="textSecondary">
          {digit}
        </Typography>
      </CardContent>
      <CardContent sx={{color: 'primary.main'}}>
        {icon}
      </CardContent>
    </Card>
  );

  return (
    <Grid container spacing={2}>
      {cardsData.map((card, index) => (
        <Grid item key={index} xs={12} sm={6} md={3}>
          <CustomCard {...card} />
        </Grid>
      ))}
    </Grid>
  );
};

export default TopCards;
