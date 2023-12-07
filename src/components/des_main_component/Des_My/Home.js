function Home() {
    return (<>

        <div class="web-container">
            <div class="cd-container bg-white">
                <section class="section-header">
                    <div class="section-header-container">
                        <span class="section-header-text">스타일리스트 정보</span>
                    </div>
                </section>

                <main class="cd-main">


                    <hr class="divide-line" />

                    {/* <!-- 스타일리스트 프로필 --> */}
                    <div class="stylelist-content">

                        <div class="st-profile-container">
                            <div class="des-star-location">
                                <div class="st-profile-img">
                                    <img src="./img/gallrey-img/textimg.png" alt="프로필 이미지" class="st-profile-img" />
                                </div>

                                <div class="st-profile-context">

                                    <div class="st-profile-name">
                                        디자이너 이름
                                    </div>

                                    <div class="st-profile-shop">
                                        디자이너 근무 샵
                                    </div>

                                    <div class="st-profile-info">
                                        rlfrpTmausdjzpehlasadasfsd
                                    </div>

                                    <span class="review-stars"><span class="review-stars-point">별점</span>
                                        <i class="fa-solid fa-star review-star"></i>
                                        <i class="fa-solid fa-star review-star"></i>
                                        <i class="fa-solid fa-star review-star"></i>
                                        <i class="fa-solid fa-star review-star"></i>
                                        <i class="fa-solid fa-star review-star"></i>
                                    </span>

                                </div>
                            </div>

                            <div class="st-button-container">
                                <a href="#"><button class="st-button">편집<i class="fas fa-pen btn-icon"></i></button></a>
                                <a href="reservation.html"><button class="st-button">예약하기<i class="far fa-calendar-alt btn-icon"></i></button></a>
                            </div>

                        </div>
                    </div>
                    {/* <!-- 스타일 리스트 정보 메뉴 --> */}
                    <nav class="main-nav">
                        <ul class="main-nav-list">
                            <li class="main-nav-list-text"><a href="st-infopage.html">홈</a></li>
                            <li class="main-nav-list-text"><a href="st-infostyle.html">스타일</a></li>
                            <li class="main-nav-list-text"><a href="st-inforeview.html">리뷰</a></li>

                        </ul>
                    </nav>

                    <hr class="divide-line" />
                    <div class="shop-title-text sm-text ma-top2rem">스타일</div>
                    <section class="st-gallery-section">
                        <div class="st-gallery-grid">
                            {/* <!-- 이미지 게시판 요소  --> */}
                            <div class="st-gallery-img">
                                <a href="st-infopage.html"><img src="img/gallrey-img/textimg.png" alt=""
                                    class="hover-img" /></a>
                                <div class="img-comment-hover">
                                    <span class="img-hover-icon"><i class="fas fa-heart"></i>00</span>
                                    <span class="img-hover-icon"><i class="fas fa-comment"></i>00</span>
                                </div>
                            </div>
                            {/* <!-- 이미지 게시판 요소 끝 --> */}
                            <div class="st-gallery-img">
                                <a href="#"><img src="img/gallrey-img/textimg.png" alt="" class="hover-img" /></a>
                                <div class="img-comment-hover">
                                    <span class="img-hover-icon"><i class="fas fa-heart"></i>00</span>
                                    <span class="img-hover-icon"><i class="fas fa-comment"></i>00</span>
                                </div>
                            </div>
                            <div class="st-gallery-img">
                                <a href="#"><img src="img/gallrey-img/textimg.png" alt="" class="hover-img" /></a>
                                <div class="img-comment-hover">
                                    <span class="img-hover-icon"><i class="fas fa-heart"></i>00</span>
                                    <span class="img-hover-icon"><i class="fas fa-comment"></i>00</span>
                                </div>
                            </div>
                            <div class="st-gallery-img">
                                <a href="#"><img src="img/gallrey-img/textimg.png" alt="" class="hover-img" /></a>
                                <div class="img-comment-hover">
                                    <span class="img-hover-icon"><i class="fas fa-heart"></i>00</span>
                                    <span class="img-hover-icon"><i class="fas fa-comment"></i>00</span>
                                </div>
                            </div>
                            <div class="st-gallery-img">
                                <a href="#"><img src="img/gallrey-img/textimg.png" alt="" class="hover-img" /></a>
                                <div class="img-comment-hover">
                                    <span class="img-hover-icon"><i class="fas fa-heart"></i>00</span>
                                    <span class="img-hover-icon"><i class="fas fa-comment"></i>00</span>
                                </div>
                            </div>
                            <div class="st-gallery-img">
                                <a href="#"><img src="img/gallrey-img/textimg.png" alt="" class="hover-img" /></a>
                                <div class="img-comment-hover">
                                    <span class="img-hover-icon"><i class="fas fa-heart"></i></span>
                                    <span class="img-hover-icon"><i class="fas fa-comment"></i></span>
                                </div>
                            </div>
                        </div >
                    </section >

                    <hr class="divide-line" />
                    <div class="shop-title-text sm-text ma-top2rem">리뷰</div>
                    <section class="review-section magin-t-1">

                        {/* <!-- 리뷰 컨테이너 --> */}
                        <div class="review-container">
                            <div class="review-text-container">
                                <h3 class="guest-nickname">보호자 닉네임</h3>
                                <h3 class="stylelist-nam">디자이너:미용사 이름</h3>
                                <div class="review-text">
                                    <p>
                                        리뷰 글 들어가는곳
                                    </p>
                                    <span class="review-stars"><span class="review-stars-point">별점</span> <i
                                        class="fa-solid fa-star review-star"></i><i
                                            class="fa-solid fa-star review-star"></i><i
                                                class="fa-solid fa-star review-star"></i><i
                                                    class="fa-solid fa-star review-star"></i><i
                                                        class="fa-solid fa-star review-star"></i></span>
                                </div>
                            </div>
                            <div class="review-img-container">
                                <div class="review-img"></div>
                            </div>
                        </div>


                        {/* <!-- 리뷰 컨테이너 --> */}
                        <div class="review-container">
                            <div class="review-text-container">
                                <h3 class="guest-nickname">보호자 닉네임</h3>
                                <h3 class="stylelist-nam">디자이너:미용사 이름</h3>
                                <div class="review-text">
                                    <p>
                                        리뷰 글 들어가는곳
                                    </p>
                                    <span class="review-stars"><span class="review-stars-point">별점</span> <i
                                        class="fa-solid fa-star review-star"></i><i
                                            class="fa-solid fa-star review-star"></i><i
                                                class="fa-solid fa-star review-star"></i><i
                                                    class="fa-solid fa-star review-star"></i><i
                                                        class="fa-solid fa-star review-star"></i></span>
                                </div>
                            </div>
                            <div class="review-img-container">
                                <div class="review-img"></div>
                            </div>
                        </div>


                        {/* <!-- 리뷰 컨테이너 --> */}
                        <div class="review-container">
                            <div class="review-text-container">
                                <h3 class="guest-nickname">보호자 닉네임</h3>
                                <h3 class="stylelist-nam">디자이너:미용사 이름</h3>
                                <div class="review-text">
                                    <p>
                                        리뷰 글 들어가는곳
                                    </p>
                                    <span class="review-stars"><span class="review-stars-point">별점</span> <i
                                        class="fa-solid fa-star review-star"></i><i
                                            class="fa-solid fa-star review-star"></i><i
                                                class="fa-solid fa-star review-star"></i><i
                                                    class="fa-solid fa-star review-star"></i><i
                                                        class="fa-solid fa-star review-star"></i></span>
                                </div>
                            </div>
                            <div class="review-img-container">
                                <div class="review-img"></div>
                            </div>
                        </div>


                        <hr class="divide-line" />

                    </section>


                </main>


            </div >
        </div >

    </>
    );
}

export default Home;