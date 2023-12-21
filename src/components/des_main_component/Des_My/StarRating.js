import React from 'react';

const StarRating = ({ rating }) => {
  const renderStars = () => {
    const starArray = [];

    // 별점 갯수에 따라 별을 생성
    for (let i = 1; i <= 5; i++) {
      starArray.push(
        <i
          key={i}
          className={` ${i <= rating ? 'fa-solid fa-star review-star' : 'fa-regular fa-star review-star '}`}></i>
      );
    }
    return starArray;
  };

  return (
    <div className="review-stars">
      {renderStars()}
      <span className="review-stars-point"> {rating} </span>  
    </div>
  );
};

export default StarRating;
