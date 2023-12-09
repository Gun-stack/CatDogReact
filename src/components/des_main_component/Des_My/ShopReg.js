import { Link } from "react-router-dom";

function ShopReg() {
    return (<>
        <div className="web-container ">
            <div className="cd-container bg-white bg-dogs">
                <main className="cd-main dis-center ">

                    <section className="shop-main-section bg-white">

                        <ul className="nav-ul">
                            <li className="nav-li">
                                <div>
                                    <i className="fas fa-caret-square-right mypage-arrow"></i><a href="#">샵 정보 등록 / 수정하기</a>
                                </div>
                                <i className="fas fa-store"></i>
                            </li>
                        </ul>

                        {/* 등록한 샵이 없다면 */}
                        <form action="" className="shop-form-container">
                            <div className="input-img-click sm-input-img">
                                <p>
                                    <Link to="/desmy/shopregform">샵 등록하기<i className="fas fa-plus-circle"></i></Link>
                                </p>
                            </div>
                        </form>

                        {/* 등록한 샵이 있다면 */}
                        <div className="stylelist-content">
                            <div className="shpo-list-li">
                                {/* 구분선 */}
                                <hr className="divide-line"/>
                                    {/* 샵 정보 컨테이너 */}
                                    <div className="nearby-shop-container">
                                        <div className="nearby-shop-address-container">
                                            {/* 샵 이미지 */}
                                            <div className="nearby-shop-img-container">
                                                <div className="nearby-shop-img"></div>
                                            </div>
                                            {/* 주소 컨테이너 */}
                                            <div className="shop-text-container">
                                                <h3 className="shop-name">KOSTA 살롱 10km</h3>
                                                <div className="shop-adderss">
                                                    <p className="shop-adderss-text">
                                                        서울 금천구 가산 디지털 1로 70
                                                        호서대 벤쳐 타워
                                                    </p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                            </div>

                            <div className="st-button-container">
                                <button className="st-button"><a href="shoppagemain.html">바로가기</a><i className="fas fa-pen btn-icon"></i></button>
                                <button className="st-button">편집<i className="fas fa-pen btn-icon"></i></button>
                            </div>
                        </div>

                    </section>

                </main>
            </div>
        </div>


    </>);
}

export default ShopReg;