import { useEffect, useRef, useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import Loding from "../../tools/Loding";
import axios from "axios";
import Swal from "sweetalert2";
import { useSelector,useDispatch } from "react-redux";



function UserReviewDetail() {
const [loading, setLoading] = useState(false);
const user = useSelector((state) => state.user);
const params = useParams();
const resnum = params.resnum;


useEffect(() => {

    


    




    
    }

    return (<>
        {loading ? <Loding /> :
            <main className="cd-main dis-center">
                <section className="review-write-form">
                    <div className="review-write-title"><i className="fas fa-paw review-icon"></i>만족도 평가 및 리뷰</div>
                    <hr className="divide-line" />
                    <div className="review-name-container">
                        <div className="review-write-username"><i className="fas fa-dog review-icon"></i>보호자 닉네임 : {user.nickname}</div>
                        <div className="review-write-desname"><i className="fas fa-cut review-icon"></i>미용사 이름 : {desInfo.desNickname} </div>
                        <div className="review-write-desname"><i className="fas fa-cut review-icon"></i> 강쥐 : {resvInfo.petName} </div>
                    </div>
                    <hr className="divide-line" />

                    <div className="review-write-star">
                        {/* 별점 */}
                        {[1, 2, 3, 4, 5].map((index) => (
                            <i
                                key={index}
                                className={index <= rating ? "fas fa-star" : "far fa-star"}
                                onClick={() => setRating(index)}
                            />
                        ))}
                    </div>

                    <div className="review-filebox">
                        <img src={image ? URL.createObjectURL(image) : "/img/logo/pet_defult_img.png"} accept="image/*" alt='펫 기본이미지'
                            className="input-box-style input-img-size" placeholder='사진을 올려주세요'  ref={imgBoxRef}/>

                        <label htmlFor="petImgFile">반려동물 사진 올리기</label>
                        <input type="file" id="petImgFile" name='file' accept="image/*" onChange={handleImageChange} />
                    </div>

                    <div className="review-write-text">
                        <textarea
                            placeholder="리뷰를 작성해주세요"
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

export default UserReviewDetail;