// DistanceCalculator.js

import React from 'react';

const DistanceCalculator = ({ lat1, lon1, lat2, lon2 }) => {
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const earthRadius = 6371; // 지구의 반지름 (단위: km)

    // 각도를 라디안으로 변환
    const toRadians = (angle) => (angle * Math.PI) / 180;

    // 위도와 경도의 차이 계산
    const deltaLat = toRadians(lat2 - lat1);
    const deltaLon = toRadians(lon2 - lon1);

    // 위도의 중간값 계산
    const lat1Rad = toRadians(lat1);
    const lat2Rad = toRadians(lat2);

    // Haversine 공식을 이용한 거리 계산
    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2) * Math.cos(lat1Rad) * Math.cos(lat2Rad);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // 거리 계산 (단위: km)
    const distance = earthRadius * c;
    
    return distance;
  };

  // 두 지점 간의 거리 계산
  const distance = calculateDistance(lat1, lon1, lat2, lon2);

  return (
    <div>

      <p> {distance.toFixed(2)<1?`${distance.toFixed(2)*1000} m`:`${distance.toFixed(2)} km`} </p>
    </div>
  );
};

export default DistanceCalculator;

export const calculateDistance = (lat1, lon1, lat2, lon2) => {
const earthRadius = 6371; // 지구의 반지름 (단위: km)

// 각도를 라디안으로 변환
const toRadians = (angle) => (angle * Math.PI) / 180;

// 위도와 경도의 차이 계산
const deltaLat = toRadians(lat2 - lat1);
const deltaLon = toRadians(lon2 - lon1);

// 위도의 중간값 계산
const lat1Rad = toRadians(lat1);
const lat2Rad = toRadians(lat2);

// Haversine 공식을 이용한 거리 계산
const a =
  Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
  Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2) * Math.cos(lat1Rad) * Math.cos(lat2Rad);
const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

// 거리 계산 (단위: km)
const distance = earthRadius * c;

return distance.toFixed(2);
};
