import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loding from "../../tools/Loding";

function UserReviewForm() {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    let navigate = useNavigate();
    function goBack(e) {
        e.preventDefault();
        navigate(-1);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // setLoading(true);
    }

    return (<>
        {loading ? <Loding /> :
            <main className="cd-main dis-center">
                <section className="review-write-form">
                    <div className="review-write-title"><i class="fas fa-paw review-icon"></i>만족도 평가 및 리뷰</div>
                    <hr className="divide-line" />
                    <div className="review-name-container">
                        <div className="review-write-username"><i class="fas fa-dog review-icon"></i>보호자 닉네임</div>
                        <div className="review-write-desname"><i class="fas fa-cut review-icon"></i>미용사 이름 </div>
                    </div>
                    <hr className="divide-line" />

                    <div className="review-write-star">
                        {[1, 2, 3, 4, 5].map((index) => (
                            <i
                                key={index}
                                className={index <= rating ? "fas fa-star" : "far fa-star"}
                                onClick={() => setRating(index)}
                            />
                        ))}
                    </div>
                    <div className="review-filebox">
                        <img src="/img/logo/pet_defult_img.png" width="100px" height="100px" accept="image/*" alt='펫 기본이미지'
                            className="input-box-style" placeholder='사진을 올려주세요'/>

                        <label htmlFor="petImgFile">반려동물 사진 올리기</label>
                        <input type="file" id="petImgFile" name='file' accept="image/*" />
                    </div>

                    <div className="review-write-text">
                        <textarea
                            placeholder="리뷰를 작성해주세요"
                            value={review}
                            className="text-area-size"
                            onChange={(e) => setReview(e.target.value)} />
                    </div>
                    

                    <div className="review-btns">
                        <button className="main-btn btn-text review-btn btn-gray" onClick={goBack}>취소</button>
                        <button className="main-btn btn-text review-btn" onClick={handleSubmit}>리뷰올리기</button>
                    </div>

                </section>
            </main>
        }

    </>);
}

export default UserReviewForm;