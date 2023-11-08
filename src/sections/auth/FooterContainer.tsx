import { Stack, Card, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import image2 from '../../assets/eLibrary.svg';
import image3 from '../../assets/teachersGuide.svg';

const FooterContainer: React.FC = () => {
  const cardStyle = {
    width: '200px', // Set the card width
  };

  const cardData = [
    { title: "লার্নিং ম্যানেজমেন্ট সিস্টেম এল এম এস",  imageUrl: image3 },
    { title: "ই-লাইব্রেরি",  imageUrl: image2 },
    { title: "টিচার্স গাইড",  imageUrl: image3 },
    { title: "ফরম্যাটিভ এসেসমেন্ট সিস্টেম",  imageUrl: image2 },
    { title: "সোস্যাল লার্নিং প্লাটফর্ম",  imageUrl: image3},
  ];

  return (
    <Stack direction={'row'} justifyContent={'space-between'} spacing={2} sx={{ mt: 5 }}>
      {cardData.map((card, index) => (
        <Card key={index} style={cardStyle}>
          <CardMedia
            component="img"
            alt={card.title}
            image={card.imageUrl}
            sx={{p:2, height: 180}}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary" align='center'>
              {card.title}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};

export default FooterContainer;
