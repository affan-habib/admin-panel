import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box } from '@mui/material';
import slider1 from '../../assets/sherebangla.svg';
import slider2 from '../../assets/sherebangla.svg';

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

  // Array of images
  const imageSlides = [slider1, slider2];

  return (
    <Slider {...settings}>
      {imageSlides.map((image, index) => (
        <div key={index}>
          <Box mt={10} display="flex" justifyContent="center">
            <img src={image} alt={`slide-${index + 1}`} style={{ width: '100%', height: '100%' }} />
          </Box>
        </div>
      ))}
    </Slider>
  );
};

export default CarouselComponent;
