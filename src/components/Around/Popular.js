import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import DistanceCalculator from '../tools/DistanceCalculator';




function Popular() {
    const coord = useSelector((state) => state.position);

    const dispatch = useDispatch();
    const shops = useSelector((state) => state.shopList);

    useEffect(() => {
        // console.log(shops);
        axios.get(`http://localhost:8090/shoplistall`)
            .then((res) => {
                // console.log(res);
                dispatch({ type: 'SET_SHOP_LIST', payload: res.data });
            })
    }, []);


    return (
        <ul className="shop-list-ul">
            {shops.map((shoplist) => (
                <li className="shpo-list-li" key={shoplist.num}>
                    <hr className="divide-line" />
                    <div className="nearby-shop-container">
                        <div className="nearby-shop-address-container">
                            <div className="nearby-shop-img-container">
                                <Link to={"/shop/" + shoplist.num}><img className="nearby-shop-img" name="image" alt='' src={`http://localhost:8090/shopimg/${shoplist.profImg}`}></img></Link>
                            </div>

                            {/* // 제목을 누르면 지도에서 마커 찍어주기?? */}
                            <div className="shop-text-container">
                                <Link to={"/shop/" + shoplist.num}><h3 className="shop-name" name="shopname">{shoplist.name}</h3></Link>
                                <h3 className="shop-dist">
                                    <DistanceCalculator lat1={shoplist.lat} lon1={shoplist.lon} lat2={coord.latitude} lon2={coord.longitude} />
                                </h3>
                                <div className="shop-adderss"  >
                                    <p className="shop-adderss-text" name="address" >
                                        {shoplist.addressRoad}
                                    </p>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div className="st-button-container">
                    <Link to={`/shop/${shoplist.num}`}> <button className="tx-end st-button ">바로가기</button></Link>
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default Popular;