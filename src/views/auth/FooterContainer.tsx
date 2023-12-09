import { Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';
import image1 from '../../assets/learningManagement.svg';
import image2 from '../../assets/eLibrary.svg';
import image3 from '../../assets/teachersGuide.svg';
import { useTranslation } from 'react-i18next';

interface LoginFooterProps {
  onCardClick: (value: string) => void;
}
const FooterContainer: React.FC<LoginFooterProps> = ({ onCardClick }) => {
  const { t } = useTranslation();
  const handleCardClick = (value: string) => {
    onCardClick(value);
  };
  const cardStyle = {
    height: '180px',
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
    { title: `${t('learningManagementSystem')}`, imageUrl: image3 },
    { title: `${t('eLibrary')}`, imageUrl: image2 },
    { title: `${t('teachersGuide')}`, imageUrl: image3 },
    { title: `${t('formativeAssessmentSystem')}`, imageUrl: image2 },
    { title: `${t('socialLearningPlatform')}`, imageUrl: image3 },
  ];

  return (
    <Grid container spacing={{ xs: 3, md: 2 }} mt="20px">
      {cardData.map((card, index) => (
        <Grid item key={index} xs={12} md={2.4} sm={6}>
          <Card sx={cardStyle} onClick={() => handleCardClick(`${card.title}`)}>
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
              <Typography variant="body2" color="text.secondary" align="center" className="title" onClick={() => handleCardClick('Card1')}>
                {card.title}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default FooterContainer;
