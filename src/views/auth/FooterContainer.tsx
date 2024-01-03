import React, { useState, useEffect } from 'react';
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
  const hoverColor = '#E8FFF8'; // Define the hover color

  const [activeCard, setActiveCard] = useState('learningManagementSystem');

  useEffect(() => {
    // Set the initial active card when the component mounts
    setActiveCard((prevActiveCard) =>
      loginPageTitle ? loginPageTitle : prevActiveCard
    );
  }, [loginPageTitle]);

  const handleCardClick = (value: string) => {
    setActiveCard(value);
    onCardClick(value);
  };

  const cardStyle = {
    height: '190px',
    boxShadow: '-4px 4px 20px 0px rgba(7, 109, 171, 0.15)',
    transition: 'transform 0.3s, background-color 0.3s',
    cursor: 'pointer', // Add pointer cursor on hover
    '&:hover': {
      backgroundColor: `${hoverColor} !important`, // Use the hover color
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
              background:
                activeCard === card.title ? hoverColor : 'rgba(254, 254, 254, 1)', // Apply hover color if selected
              border: '1px solid rgba(208, 208, 208, 1)',
              height: '300px',
              borderRadius: '8px',
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
                  fontSize: '20px',
                }}
              >
                {t(card.title)}
              </Typography>
              { card.title == 'learningManagementSystem' &&
                <Typography align="center"
                className="title"
                sx={{
                  color: 'rgba(34, 34, 34, 1)',
                  fontWeight: 600,
                  fontSize: '20px',
                }}>({t('LMS')})</Typography>
              }
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default FooterContainer;
