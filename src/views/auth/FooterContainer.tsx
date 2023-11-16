import { Stack, Card, CardContent, CardMedia, Typography } from '@mui/material';
import image1 from '../../assets/learningManagement.svg';
import image2 from '../../assets/eLibrary.svg';
import image3 from '../../assets/teachersGuide.svg';
import { useTranslation } from 'react-i18next';

const FooterContainer: React.FC = () => {
  const { t } = useTranslation();
  const cardStyle = {
    width: '213px',
    height: '180px',
    boxShadow: '-4px 4px 20px 0px rgba(7, 109, 171, 0.15)', // Add this box-shadow style
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
      spacing={6}
      mt="20px"
    >
      {cardData.map((card, index) => (
        <Card key={index} style={cardStyle}>
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
