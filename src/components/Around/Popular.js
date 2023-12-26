import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import DistanceCalculator from '../tools/DistanceCalculator';
import StarRating from '../des_main_component/Des_My/StarRating';
import { url } from "../../config";




function Popular() {
    const user = useSelector((state) => state.user);
    const coord = useSelector((state) => state.position);
    const dispatch = useDispatch();
    const shops = useSelector((state) => state.shopList);

    useEffect(() => {
        // console.log(shops);
        axios.get(`${url}/shoplistall`)
            .then((res) => {
                // console.log(res);
                
                const sortedByStar = res.data.sort((a, b) => b.star - a.star);
                dispatch({ type: 'SET_SHOP_LIST', payload: sortedByStar });
            })
    }, []);


    return (
        <ul className="shop-list-ul">
            {shops.map((shop) => (
                <li className="shpo-list-li" key={shop.num}>
                    <hr className="divide-line" />
                    <div className="nearby-shop-container">
                        <div className="nearby-shop-address-container">
                            <div className="nearby-shop-img-container">
                                <Link to={"/shop/" + shop.num}><img className="nearby-shop-img" name="image" alt='' src={`${url}/shopimg/${shop.profImg}`}></img></Link>
                            </div>

                            {/* // 제목을 누르면 지도에서 마커 찍어주기?? */}
                            <div className="shop-text-container">
                                <Link to={"/shop/" + shop.num}><h3 className="shop-name" name="shopname">{shop.name}</h3></Link>
                                <h3 className="shop-dist">
                                    <DistanceCalculator lat1={shop.lat} lon1={shop.lon} lat2={coord.latitude} lon2={coord.longitude} />
                                </h3>
                                <StarRating rating={shop.star} /> 
                                <div className="shop-adderss"  >
                                    <p className="shop-adderss-text" name="address" >
                                        {shop.addressRoad}
                                    </p>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div className="st-button-container">
                    {user.id === shop.id &&
                    <Link to={`/usermy/shopmodiform/${shop.num}`}> <button className="st-button tx-end">편집</button></Link>
                    }
                    <Link to={`/shop/${shop.num}`}> <button className="tx-end st-button ">바로가기</button></Link>
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default Popular;