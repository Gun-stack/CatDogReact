import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';


function Distance() {
    //샵 이름, 주소,사진,샵번호 , 거리 변수로 받아서 넣기
//폼 샵이름,주소,사진,샵번호,거리
    const shoplist = [
        {
            shopname : '코스타 살롱살롱',
            address : '서울 금천구 가산 디지털 1로 70 호서대 벤쳐 타워',
            image : '/img/gallrey-img/3.jpg',
            num : '1',
            dist : '5m'
        },
        {
            shopname : '코스타2 살롱살롱',
            address : '서울 금천구 가산 디지털 1로 70 호서대 벤쳐 타워',
            image : '/img/gallrey-img/5.jpg',
            num : '2',
            dist : '6m'
        },
    
    ]

    useEffect(() => {
        // axios.get('http://localhost:8090/shoplist')
        // .then((res)=>{
        //     console.log(res);
        //     console.log(res.data);
        //    setShopList(res.data);
        // })
    }
    ,[])



    return (
        <ul className="shop-list-ul">
            {shoplist.map((shoplist) => (
            <li className="shpo-list-li">
                <hr className="divide-line" />
                <div className="nearby-shop-container">
                    <div className="nearby-shop-address-container">
                        <div className="nearby-shop-img-container">
                            <img className="nearby-shop-img" name="image" src={shoplist.image}></img>
                        </div>
                        <div className="shop-text-container">
                        <Link to={`/shop/${shoplist.num}`}><h3 className="shop-name" name="shopname">{shoplist.shopname}</h3></Link>
                            <h3 claaName="shop-dist">{shoplist.dist}</h3>
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

export default Distance;