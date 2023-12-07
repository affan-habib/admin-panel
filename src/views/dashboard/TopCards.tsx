// import React from 'react';
// import Grid from '@mui/material/Grid';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import Icon from '@mui/material/Icon';
// import { Dashboard } from '@mui/icons-material';

// interface CardData {
//   title: string;
//   digit: string;
//   backgroundColor: string;
// }

// const cardsData: CardData[] = [
//   { title: 'চলমান ব্যাচ', digit: '৪২', backgroundColor: '#C6E2F9' },
//   { title: 'প্রশিক্ষক', digit: '২৫', backgroundColor: '#E3C3FB' },
//   { title: 'নথিভুক্ত প্রশিক্ষণার্থী', digit: '৪০০', backgroundColor: '#A0B879' },
//   { title: 'পাঠ্যক্রম', digit: '২৫', backgroundColor: '#F2BDBD' },
// ];

// const TopCards: React.FC = () => {
//   const CustomCard: React.FC<CardData> = ({
//     title,
//     digit,
//     backgroundColor,
//   }) => (
//     <Card
//       style={{
//         borderRadius: '8px',
//         border: '1px solid #73A3CA',
//         background: backgroundColor,
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//       }}
//     >
//       <CardContent>
//         <Typography variant="h6" gutterBottom>
//           {title}
//         </Typography>
//         <Typography variant="body1" color="textSecondary">
//           {digit}
//         </Typography>
//       </CardContent>
//       <CardContent>
//         <Dashboard />
//       </CardContent>
//     </Card>
//   );

//   return (
//     <Grid container spacing={2}>
//       {cardsData.map((card, index) => (
//         <Grid item key={index} xs={12} sm={6} md={3}>
//           <CustomCard {...card} />
//         </Grid>
//       ))}
//     </Grid>
//   );
// };

// export default TopCards;


import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Groups2Icon from '@mui/icons-material/Groups2';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { useTranslation } from 'react-i18next';

interface CardData {
  title: string;
  digit: string;
  backgroundColor: string;
  icon: React.ReactNode; 
}

const TopCards: React.FC = () => {
  const { t } = useTranslation();

  const cardsData: CardData[] = [
    { title: t('currentBatch'), digit: '৪২', backgroundColor: '#C6E2F9', icon: <Groups2Icon /> },
    { title: t('trainer'), digit: '২৫', backgroundColor: '#E3C3FB', icon: <PersonOutlineIcon /> },
    { title: t('enrolledTrainees'), digit: '৪০০', backgroundColor: '#A0B879', icon: <PersonOutlineIcon /> },
    { title: t('curriculum'), digit: '২৫', backgroundColor: '#F2BDBD', icon: <MenuBookIcon /> },
  ];

  const CustomCard: React.FC<CardData> = ({
    title,
    digit,
    backgroundColor,
    icon,
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
        {icon}
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
