import React from 'react';
import logo2 from '../../assets/logoOne.svg';
import logo1 from '../../assets/logoTwo.svg';
import { Box, Container, Grid, Typography, Card, CardContent, Button } from '@mui/material';
import lms from '../../assets/images/lms.png';


const Onboarding = () => {
    const cards = [
        {
            id: 1,
            title: 'লার্নিং ম্যানেজমেন্ট সিস্টেম (এল এম এস)',
            color: 'rgba(7, 109, 171, 1)',
            description: '	টিচার্স প্রফেশনাল ডেভলপমেন্ট এর উদ্দেশ্যে প্রস্তুতকৃত এল এম এস এর আওতায় সকল ট্রেনিং গুলি অনলাইন এবং অফলাইন এর সমন্বয়ে সাজানো হয়েছে। এখানে একজন ট্রেনারের তত্ত্বাবধায়নে একজন ট্রেনি সকল ট্রেনিং গুলি সম্পন্ন করতে পারবেন|'
        },
        {
            id: 2,
            title: 'টিচার্স গাইড',
            color: 'rgba(91, 96, 99, 1)',
            description: 'এই মডিউলে ক্লাস প্রিপারেশনের উদ্দেশ্যে শিক্ষকদের জন্য বিভিন্ন গাইডলাইন থাকবে, যেখানে একজন শিক্ষক শিক্ষাদানের ক্ষেত্রে এগুলোর প্রয়োগ ঘটাতে পারবেন। এখানে ৩-৫ মিনিটের ভিডিও এবং কিছু গাইডলাইন দেওয়া থাকবে|',
        },
        {
            id: 3,
            title: 'ই-লাইব্রেরি',
            color: 'rgba(0, 47, 108, 1)',
            description: 'এখানে বিভিন্ন বই, পাব্লিকেশন্স, পেপার ইত্যাদির ইবুক, পিডিএফ এবং অডিও বুক থাকবে। একজন ইউজার তার প্রয়োজনীয় বই পড়তে পারবেন, বুকমার্ক করে রাখতে পারবেন, এবং কিছু ক্ষেত্রে ডাউনলোড ও করতে পারবেন। এটি সি আই এল এম এস এ অংশ নেওয়া সকলে ট্রেনার, ট্রেনি এবং বাকি সকলের জন্য উন্মুক্ত|'
        },
        {
            id: 4,
            title: 'সোস্যাল লার্নিং প্লাটফর্ম',
            color: 'rgba(29, 136, 57, 1)',
            description: 'এটি টিচার বা ট্রেনি, প্রিন্সিপাল, ভাইস প্রিন্সিপাল, এডুকেশন লিডার এবং ট্রেনারদের সমন্বয়ে গঠিত একটি আলোচনা ভিত্তিক প্লাটফর্ম। এখানে ট্রেনি রা তাদের ট্রেনিং বা পাঠদান গাইওডলাইন সম্পর্কে আলোচনা করতে পারবেন|'
        },
        {
            id: 5,
            title: 'ফরম্যাটিভ এসেসমেন্ট সিস্টেম',
            color: 'rgba(219, 135, 37, 1)',
            description: 'এই মডিউলে একজন শিক্ষক বা ট্রেনি তার ক্লাসের সার্বিক ব্যবস্থাপনার চিত্র তুলে ধরতে পারবেন। যেমন ট্রেনিং এ কোন মেথডটি ব্যবহার করে ট্রেনি তার শিক্ষার্থিদের সার্বিক শিক্ষাদানের ক্ষেত্রে পরিবর্তন এসেছে এবং শিক্ষার্থিদের উন্নয়ন হয়েছে|'
        },
    ];
    return (
        <Container maxWidth="xl">
            <Box my={3}>
                <img src={logo1} alt="" srcSet="" />
                <img src={logo2} style={{ marginLeft: '15px' }} />
            </Box>
            <Box my={15}>
                <Grid container columns={15} sx={{ display: 'flex', justifyContent: 'center' }}>
                    {cards.map((card) => (
                        // <Grid key={card.id} item xs={12} sm={6} md={4} lg={3} sx={{ position: 'relative' }}>
                        //     <Box sx={{ position: 'absolute', left: '38%', top: '-35px', backgroundColor: 'rgba(255, 255, 255, 1)', padding: '10px', borderRadius: '50%' }}>
                        //         <img src={lms} alt="" srcSet="" />
                        //     </Box>
                        //     <Box style={{ padding: '16px', margin: '8px', backgroundColor: `${card.color}`, height: '320px', display: 'flex', flexDirection: 'column' }}>
                        //         <Typography variant="h6" gutterBottom sx={{ color: 'rgba(255, 255, 255, 1)', marginTop: '20px' }} my={2}>
                        //             {card.title}
                        //         </Typography>
                        //         <Typography variant="caption" display="block" sx={{ color: 'rgba(255, 255, 255, 1)' }} my={2} gutterBottom>
                        //             {card.description}
                        //         </Typography>
                        //         <Button variant="contained" fullWidth sx={{ backgroundColor: 'white', borderRadius: 0}}>
                        //             <Typography sx={{ color: 'black' }}>এগিয়ে যান</Typography>
                        //         </Button>
                        //     </Box>
                        // </Grid>

                        <Grid key={card.id} item xs={12} sm={6} md={4} lg={3} sx={{ position: 'relative' }}>
                            <Box sx={{ position: 'absolute', left: '38%', top: '-35px', backgroundColor: 'rgba(255, 255, 255, 1)', padding: '10px', borderRadius: '50%' }}>
                                 <img src={lms} alt="" srcSet="" />
                             </Box>
                            <Box style={{ padding: '16px', margin: '8px', backgroundColor: `${card.color}`, height: '320px', display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="h6" gutterBottom sx={{ color: 'rgba(255, 255, 255, 1)', marginTop: '20px' }} my={2}>
                                    {card.title}
                                </Typography>
                                <Typography variant="caption" display="block" sx={{ color: 'rgba(255, 255, 255, 1)' }} my={2} gutterBottom>
                                    {card.description}
                                </Typography>
                                <Box sx={{ marginTop: 'auto' }}>
                                    <Button variant="contained" fullWidth sx={{ backgroundColor: 'white', borderRadius: 0 }}>
                                        <Typography sx={{ color: 'black' }}>এগিয়ে যান</Typography>
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

export default Onboarding;