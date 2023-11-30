import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box, Typography } from '@mui/material';

const CarouselComponent: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  // Array of slide content objects
  const slideContent = [
    {
      heading: 'HSEP সম্পর্কে',
      paragraph:
        'এইচএসই শুধুমাত্র বাংলাদেশী শিক্ষার্থীদের জন্য শিক্ষার পরবর্তী স্তরের একটি অপরিহার্য লিঙ্ক নয়, এটি অবশ্যই হতে হবে শক্তিশালী করতে হবে যদি জাতি তার ভিশন 2041 এবং জাতীয় মিশ্রিত শিক্ষা মহাপরিকল্পনায় সরকারের প্রতিশ্রুতি পূরণ করতে চায়| শিক্ষায় রাজনৈতিক গতির জন্য HSEA-এর মধ্যে সবচেয়ে গুরুত্বপূর্ণ অসুবিধাগুলি নেভিগেট করা যেতে পারে',
    },
    {
      heading: 'Slide 2 Heading',
      paragraph: 'Slide 2 Paragraph',
    },
    // Add more slides as needed
  ];

  return (
    <Slider {...settings}>
      {slideContent.map((content, index) => (
        <div key={index}>
          <Box mt={10}>
            <Typography variant="h4" color="primary.main" gutterBottom>
              {content.heading}
            </Typography>
            <Typography variant="body1">{content.paragraph}</Typography>
          </Box>
        </div>
      ))}
    </Slider>
  );
};

export default CarouselComponent;
