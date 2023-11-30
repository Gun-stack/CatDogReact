import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Popular() {

    //아마 정보 더 필요할거임 위도경도 추천수  등등 
    const shoplist = [
        {
            shopname : 'KOSTA 살롱',
            address : '서울 금천구 가산 디지털 1로 70 호서대 벤쳐 타워',
            image : '/img/gallrey-img/4.jpg',
            num : '1',
            dist : '10km'
        },
        {
            shopname : 'KOSTA 살롱123123',
            address : '서울 금천구 가산 디지털 1로 70 호서대 벤쳐 타워',
            image : '/img/gallrey-img/7.jpg',
            num : '2',
            dist : '15550km'
        },
        {
            shopname : '쉽지않군',
            address : '서울 금천구 가산 디지털 1로 70 호서대 벤쳐 타워',
            image : '/img/gallrey-img/3.jpg',
            num : '3',
            dist : '150km'
        },
    
    ]

        // useEffect(() => {
        //     axios.get('http://localhost:8090/shoplist')
        //     .then((res)=>{
        //         console.log(res);
        //         console.log(res.data);
        //        setShopList(res.data);
        //     })
        // }
        // ,[])


    return (

        <ul className="shop-list-ul">
        {shoplist.map((shoplist) => (
        <li className="shpo-list-li" key={shoplist.num}>
            <hr className="divide-line" />
            <div className="nearby-shop-container">
                <div className="nearby-shop-address-container">
                    <div className="nearby-shop-img-container">
                        <img className="nearby-shop-img" name="image" src={shoplist.image} ></img>
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
                <Link to={"/shop/"+shoplist.num}>샵 바로가기</Link>
            </div>
        </li>
        ))}
    </ul>
    );
}

export default Popular;