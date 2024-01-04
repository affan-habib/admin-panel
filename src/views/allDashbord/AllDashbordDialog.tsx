import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import image2 from '../../assets/eLibrary.svg';
import image3 from '../../assets/teachersGuide.svg';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';

interface CardData {
  title: string;
  imageUrl: string;
  link: string;
}

interface LoginFooterProps {
  closePopover: () => void; // Add a function to close the popover
}

const CustomStyledCard = styled(Card)(
  ({ title, activeCard }: { title: string; activeCard: string }) => ({
    height: '120px',
    width: '113px',
    border: '1px solid rgba(208, 208, 208, 1)',
    backgroundColor:
      title === activeCard ? '#E8FFF8' : 'rgba(254, 254, 254, 1)',
    boxShadow: '-4px 4px 20px 0px rgba(7, 109, 171, 0.15)',
    transition: 'transform 0.3s, background-color 0.3s',
    cursor: title === activeCard ? 'pointer' : 'not-allowed',
  })
);

const linkTextStyle = {
  textDecoration: 'none', // Remove underline from link text
};

const AllDashbordDialog: React.FC<LoginFooterProps> = ({ closePopover }) => {
  const { t } = useTranslation();
  const [activeCard, setActiveCard] = useState(
    'learningManagementSystem'
  );

  const handleCardClick = (value: string) => {
    if (value === 'learningManagementSystem') {
      setActiveCard(value);
      closePopover(); // Close the popover when a card is clicked
    }
  };

  const cardData: CardData[] = [
    {
      title: 'learningManagementSystem',
      imageUrl: image3,
      link: '/',
    },
    {
      title: 'eLibrary',
      imageUrl: image2,
      link: '/link2',
    },
    {
      title: 'teachersGuide',
      imageUrl: image3,
      link: '/link3',
    },
    {
      title: 'formativeAssessmentSystem',
      imageUrl: image2,
      link: '/link4',
    },
    {
      title: 'socialLearningPlatform',
      imageUrl: image3,
      link: '/link5',
    },
  ];

  return (
    <Grid container spacing={{ xs: 2, md: 2 }} mt="20px">
      {cardData.map((card, index) => (
        <Grid item key={index} xs={12} md={4} sm={6}>
          <Link to={card.link} style={linkTextStyle}>
            <CustomStyledCard
              title={card.title}
              activeCard={activeCard}
              onClick={() => handleCardClick(card.title)}
            >
              <CardMedia
                component="img"
                alt={card.title}
                image={card.imageUrl}
                sx={{
                  height: 27.1,
                  width: 40,
                  margin: 'auto',
                  mt: 1,
                }}
              />
              <CardContent>
                <Typography
                  align="center"
                  className="title"
                  sx={{
                    color: 'rgba(34, 34, 34, 1)',
                    fontWeight: 500,
                    fontSize: '11px',
                    marginBottom: '4px',
                  }}
                >
                  {t(card.title)}
                </Typography>
              </CardContent>
            </CustomStyledCard>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default AllDashbordDialog;
