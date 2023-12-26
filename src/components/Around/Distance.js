import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import { calculateDistance } from '../tools/DistanceCalculator';

import SwalCustomAlert from '../Alerts/SwalCustomAlert';

import StarRating from '../des_main_component/Des_My/StarRating';
import { url } from "../../config";





function Distance() {
    const user = useSelector((state) => state.user);
    const coord = useSelector((state) => state.position);
    const [sortedShops, setSortedShops] = useState([]);
    const dispatch = useDispatch();
    const shops = useSelector((state) => state.shopList);


    const token = useSelector(state => state.token);
    const navigate = useNavigate();
    useEffect(() => {
        
        // console.log("로그인 후 토큰 값 : " + token);
        axios.get(`${url}/user`, {
            headers: {
                Authorization: token,
            }
        })
            .then(res => {
                console.log("Res : " + res.data);
            })
            .catch(err => {
                // console.log("Err : " + err);
                SwalCustomAlert(
                    'warning', 
                    "로그인 이후 사용 가능합니다."
                    );
                    navigate('/userlogin');
            })
            axios.get(`${url}/shoplistall`)
            .then((res) => {
                const fetchedShops = res.data;
                const sortedByDistance = fetchedShops.map(shop => {
                    const distance = calculateDistance(coord.latitude, coord.longitude, shop.lat, shop.lon,);
                    return { ...shop, distance };
                }).sort((a, b) => a.distance - b.distance);

                dispatch({ type: 'SET_SHOP_LIST', payload: sortedByDistance });
                setSortedShops(sortedByDistance);
                // console.log(sortedShops);
            })
    }, [dispatch]);



    // useEffect(() => {
    //     axios.get(`${url}/shoplistall`)
    //         .then((res) => {
    //             const fetchedShops = res.data;
    //             const sortedByDistance = fetchedShops.map(shop => {
    //                 const distance = calculateDistance(coord.latitude, coord.longitude, shop.lat, shop.lon,);
    //                 return { ...shop, distance };
    //             }).sort((a, b) => a.distance - b.distance);

    //             dispatch({ type: 'SET_SHOP_LIST', payload: sortedByDistance });
    //             setSortedShops(sortedByDistance);
    //             // console.log(sortedShops);
    //         })
    // }, [dispatch]);



    return (
        <ul className="shop-list-ul">
            {shops.map((shoplist) => (
                <li className="shpo-list-li" key={shoplist.num}>
                    <hr className="divide-line" />
                    <div className="nearby-shop-container">
                        <div className="nearby-shop-address-container">
                            <div className="nearby-shop-img-container">
                                <Link to={"/shop/" + shoplist.num}><img className="nearby-shop-img" name="image" alt='' src={`${url}/shopimg/${shoplist.profImg}`}></img></Link>
                            </div>

                            {/* // 제목을 누르면 지도에서 마커 찍어주기?? */}
                            <div className="shop-text-container">
                                <Link to={"/shop/" + shoplist.num}><h3 className="shop-name" name="shopname">{shoplist.name}</h3></Link>
                                {shoplist.distance &&
                                <h3 className="shop-dist">
                                    {shoplist.distance<1 ? `${shoplist.distance*1000} m` : `${shoplist.distance} km` } 
                                </h3>
                                }
                                <StarRating rating={shoplist.star} /> 
                                <div className="shop-adderss"  >
                                    <p className="shop-adderss-text" name="address" >
                                        {shoplist.addressRoad}
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="st-button-container">
                    {user.id === shoplist.id &&
                    <Link to={`/usermy/shopmodiform/${shoplist.num}`}> <button className="st-button tx-end">편집</button></Link>
                    }

                    <Link to={`/shop/${shoplist.num}`}> <button className="st-button tx-end">바로가기</button></Link>
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default Distance;