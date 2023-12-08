import { Link } from "react-router-dom";

function DesMyList() {
    return (<>
        <main className="cd-main dis-center">
            <section className="mypage-title-section">
                <div className="mypage-title-container filter-test">
                    <div className="mypage-title-text">안녕하세요! <span className="color-nomal">미용사</span>님!</div>
                </div>
            </section>
            <section className="shop-main-section bg-white">
                <ul className="nav-ul">
                    <li className="nav-li">
                        <div>
                            <i className="fas fa-caret-square-right mypage-arrow"></i>
                            <Link to="shopreg">샵 정보 등록 / 수정하기</Link>
                        </div>
                        <i className="fas fa-store"></i>
                    </li>
                    <li className="nav-li">
                        <div>
                            <i className="fas fa-caret-square-right mypage-arrow"></i>
                            <Link to="desinfo">스타일리스트 정보 등록 / 수정하기</Link>
                        </div>
                        <i className="fas fa-cut"></i>
                    </li>
                    <li className="nav-li">
                        <div>
                            <i className="fas fa-caret-square-right mypage-arrow"></i>
                            <Link to="desresvlist">예약 확인하기</Link>
                        </div>
                        <i className="fas fa-clipboard-list"></i>
                    </li>
                </ul>
            </section>
        </main>
    </>);
}

export default DesMyList;