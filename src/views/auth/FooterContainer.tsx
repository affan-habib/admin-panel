import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';
import image2 from '../../assets/eLibrary.svg';
import image3 from '../../assets/teachersGuide.svg';
import { useTranslation } from 'react-i18next';

interface LoginFooterProps {
  loginPageTitle: string;
  onCardClick: (value: string) => void;
}
const FooterContainer: React.FC<LoginFooterProps> = ({
  onCardClick,
  loginPageTitle,
}) => {
  const { t } = useTranslation();
  const handleCardClick = (value: string) => {
    onCardClick(value);
  };
  const cardStyle = {
    height: '190px',
    boxShadow: '-4px 4px 20px 0px rgba(7, 109, 171, 0.15)',
    transition: 'transform 0.3s, background-color 0.3s',
    cursor: 'pointer', // Add pointer cursor on hover
    '&:hover': {
      backgroundColor: '#e0f7fa!important',
      '& .title': {
        fontWeight: '700', // Make font weight bold on hover
      },
    },
  };

  const cardData = [
    {
      title: 'learningManagementSystem',
      imageUrl: image3,
    },
    {
      title: 'eLibrary',
      imageUrl: image2,
    },
    {
      title: 'teachersGuide',
      imageUrl: image3,
    },
    {
      title: 'formativeAssessmentSystem',
      imageUrl: image2,
    },
    {
      title: 'socialLearningPlatform',
      imageUrl: image3,
    },
  ];

  return (
    <Grid container spacing={{ xs: 2, md: 3 }} mt="20px">
      {cardData.map((card, index) => (
        <Grid item key={index} xs={12} md={4} sm={6}>
          <Card
            sx={cardStyle}
            onClick={() => handleCardClick(card.title)}
            style={{
              background: loginPageTitle == card.title ? 'rgba(254, 254, 254, 1)' : 'inherit',
              border: '1px solid rgba(208, 208, 208, 1)',
              height: '300px',
              borderRadius: '8px'
            }}
          >
            <CardMedia
              component="img"
              alt={card.title}
              image={card.imageUrl}
              sx={{
                height: 160,
                width: 235.9,
                margin: 'auto',
                mt: 4,
              }}
            />
            <CardContent>
              <Typography
                align="center"
                className="title"
                sx={{
                  color: 'rgba(34, 34, 34, 1)',
                  fontWeight: 600,
                  fontSize: '20px'
                }}
              >
                {t(card.title)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default FooterContainer;
