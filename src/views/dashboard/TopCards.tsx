import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';
import { Dashboard } from '@mui/icons-material';

interface CardData {
  title: string;
  digit: number;
  backgroundColor: string;
}

const cardsData: CardData[] = [
  { title: 'Card 1', digit: 42, backgroundColor: '#C6E2F9' },
  { title: 'Card 2', digit: 76, backgroundColor: '#E3C3FB' },
  { title: 'Card 3', digit: 99, backgroundColor: '#A0B879' },
  { title: 'Card 4', digit: 123, backgroundColor: '#F2BDBD' },
];

const TopCards: React.FC = () => {
  const CustomCard: React.FC<CardData> = ({
    title,
    digit,
    backgroundColor,
  }) => (
    <Card
      style={{
        borderRadius: '8px',
        border: '1px solid #73A3CA',
        background: backgroundColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {digit}
        </Typography>
      </CardContent>
      <CardContent>
        <Dashboard />
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
