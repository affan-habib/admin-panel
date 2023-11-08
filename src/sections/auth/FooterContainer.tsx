import { Stack, Card, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import image2 from '../../assets/eLibrary.svg';
import image3 from '../../assets/teachersGuide.svg';

const FooterContainer: React.FC = () => {
  const cardStyle = {
    width: '200px', // Set the card width
  };

  const cardData = [
    { title: "Card 1", content: "This is card 1 content", imageUrl: image3 },
    { title: "Card 2", content: "This is card 2 content", imageUrl: image2 },
    { title: "Card 3", content: "This is card 3 content", imageUrl: image3 },
    { title: "Card 4", content: "This is card 4 content", imageUrl: image2 },
    { title: "Card 5", content: "This is card 5 content", imageUrl: image3},
  ];

  return (
    <Stack direction={'row'} justifyContent={'space-between'} spacing={2} sx={{ mt: 5 }}>
      {cardData.map((card, index) => (
        <Card key={index} style={cardStyle}>
          <CardMedia
            component="img"
            alt={card.title}
            height="140"
            image={card.imageUrl}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {card.content}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};

export default FooterContainer;
