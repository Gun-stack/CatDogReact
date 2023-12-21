import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {url} from'../../config';

const ImageSlider = ({ images }) => {

  const baseUrl = `${url}/shopimg/`;
  
  const settings = {
      dots: true,
      arrows: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,  
  };

  return (

    <Slider {...settings}>
      {images.map((image, index) => (
          <img src={baseUrl+`${image}`} key={index} alt={`Slide ${index}`} className='sd-img'/>
          ))}
    </Slider>

    
  );
};

export default ImageSlider;