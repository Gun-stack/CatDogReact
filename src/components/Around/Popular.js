import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector,useDispatch } from 'react-redux';


function Popular() {
    const dispatch = useDispatch();


    //아마 정보 더 필요할거임 위도경도 추천수  등등 
    const [shoplist1, setShoplist] = useState([
        {
                shopname: '코스타2 살롱살롱',
                address: '서울 금천구 가산 디지털 1로 70 호서대 벤쳐 타워',
                image: '/img/gallrey-img/7.jpg',
                num: '2',
                dist: '6m',
                worktime: '11:00 - 14:00',
                info: '매장정보 입니다 엘베 내려서 여자화장실 방향으로 나와서 우회전',
                notice: '월요일은 자체 휴강입니다',
                tel: '01022222232',
            },
            {
                shopname: '코스타 살롱살롱',
                address: '서울 금천구 가산 디지털 1로 70 호서대 벤쳐 타워',
                image: '/img/gallrey-img/8.jpg',
                num: '1',   
                dist: '5m',
                worktime: '11:00 - 14:00',
                info: '매장정보 입니다 엘베 내려서 여자화장실 방향으로 나와서 우회전',
                notice: '월요일은 자체 휴강입니다',
                tel: '01022222232',
            },
    ]);

    const shops = useSelector((state) => state.shop);
    useEffect(() => {
        dispatch({ type: 'SET_SHOP', payload: shoplist1 });
        console.log(shops);
    }, [shops]);
    
        

    return (

        <ul className="shop-list-ul">
        {shops.map((shoplist) => (
        <li className="shpo-list-li" key={shoplist.num}>
            <hr className="divide-line" />
            <div className="nearby-shop-container">
                <div className="nearby-shop-address-container">
                    <div className="nearby-shop-img-container">
                        <img className="nearby-shop-img" name="image" alt='' src={shoplist.image}></img>
                    </div>

                        {/* // 제목을 누르면 지도에서 마커 찍어주기?? */}
                    <div className="shop-text-container">
                    <Link to={"/shop/"+shoplist.num}><h3 className="shop-name" name = "shopname">{shoplist.shopname}</h3></Link>
                        <h3 className="shop-dist">{shoplist.dist}</h3>
                            <div className="shop-adderss"  >
                            <p className="shop-adderss-text" name="address" >
                            {shoplist.address}
                            </p>
                        </div>
                    </div>

                </div>
                <Link to={`/shop/${shoplist.num}`}>샵 바로가기</Link>
            </div>
        </li>
        ))}
    </ul>
    );
}

export default Popular;