import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ImageSlider = ({ images }) => {

  const baseUrl = 'http://localhost:8090/shopimg/';
  
  const settings = {
    dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
  };

  return (
    <div style={{width:'200px',height:'160px',zIndex:'0' }}>
    <Slider {...settings}>
      {images.map((image, index) => (
          <img src={baseUrl+`${image}`} key={index} alt='' className='shop-title-img' style={{width:'100%',height:'160px'}} />
          ))}
    </Slider>
    </div>
    
  );
};

export default ImageSlider;
