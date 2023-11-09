import { Stack, Card, CardContent, CardMedia, Typography } from '@mui/material';
import image1 from '../../assets/learningManagement.svg';
import image2 from '../../assets/eLibrary.svg';
import image3 from '../../assets/teachersGuide.svg';
import { useTranslation } from 'react-i18next';

const FooterContainer: React.FC = () => {
  const { t } = useTranslation();
  const cardStyle = {
    width: '200px', // Set the card width
  };

  const cardData = [
    { title: `${t('learningManagementSystem')}`, imageUrl: image3 },
    { title: `${t('eLibrary')}`, imageUrl: image2 },
    { title: `${t('teachersGuide')}`, imageUrl: image3 },
    { title: `${t('formativeAssesmentSystem')}`, imageUrl: image2 },
    { title: `${t('socialLearningPlatform')}`, imageUrl: image3 },
  ];

  return (
    <Stack
      direction={'row'}
      justifyContent={'space-between'}
      spacing={2}
      sx={{ mt: 5 }}
    >
      {cardData.map((card, index) => (
        <Card key={index} style={cardStyle}>
          <CardMedia
            component="img"
            alt={card.title}
            image={card.imageUrl}
            sx={{ p: 2, height: 180 }}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary" align="center">
              {card.title}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};

export default FooterContainer;
