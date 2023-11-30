import { useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk"

export default function useKakaoLoader() {
  useKakaoLoaderOrigin({
    appkey: "06e8ab2e9c9963e00e2caa1754a5c193",
    libraries: ["clusterer", "drawing", "services"],


    


    
  })
}