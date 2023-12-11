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
      transform: 'scale(1.05)',
      backgroundColor: '#e0f7fa',
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
    <Grid container spacing={{ xs: 3, md: 8 }} mt="20px">
      {cardData.map((card, index) => (
        <Grid item key={index} xs={12} md={2.4} sm={6}>
          <Card
            sx={cardStyle}
            onClick={() => handleCardClick(card.title)}
            style={{
              background: loginPageTitle == card.title ? '#e0f7fa' : 'inherit',
            }}
          >
            <CardMedia
              component="img"
              alt={card.title}
              image={card.imageUrl}
              sx={{
                height: 80,
                width: 120,
                margin: 'auto',
                mt: 4,
              }}
            />
            <CardContent>
              <Typography
                variant="body2"
                color="text.secondary"
                align="center"
                className="title"
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
