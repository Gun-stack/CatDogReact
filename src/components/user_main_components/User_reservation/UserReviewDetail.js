import { useEffect, useRef, useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import Loding from "../../tools/Loding";
import axios from "axios";
import Swal from "sweetalert2";
import { useSelector,useDispatch } from "react-redux";
import { Link } from "react-router-dom";






function UserReviewDetail() {
const navigate = useNavigate();
function goBack(e) {
    e.preventDefault();
    navigate(-1);
}


const dispatch = useDispatch();
const [loading, setLoading] = useState(false);
//예약번호
const params = useParams();
const resnum = params.resnum;
//예약내역
const resvList = useSelector((state) => state.resv);
const resv = resvList.find((resv) => resv.num == resnum);
//리뷰정보
const reviewInfo = useSelector((state) => state.review);

//유저정보
const user = useSelector((state) => state.user);





useEffect(() => {

    console.log(resnum);
    console.log(resv);

    axios.get(`http://localhost:8090/reviewdetail?resNum=${resnum}`)
    .then((res) => {
        console.log(res.data);
        dispatch({ type: 'SET_REVIEW', payload: res.data });
    })
    .catch((err) => {
        console.log(err);
    });
},[]);

    



    




    

    return (
    <>
        {loading ? <Loding /> :
            <main className="cd-main dis-center">
                <section className="review-write-form">
                    <div className="review-write-title"><i className="fas fa-paw review-icon"></i>만족도 평가 및 리뷰</div>
                    <hr className="divide-line" />
                    <div className="review-name-container">
                        <div className="review-write-desname"><i className="fas fa-cut review-icon"></i>    시술 일자 : {resv.date}    </div>
                        <div className="review-write-desname"><i className="fas fa-cut review-icon"></i>    시술 일자 : {resv.time}시  </div>
                        <div className="review-write-username"><i className="fas fa-dog review-icon"></i>   보호자 닉네임 :{reviewInfo.userId} </div>
                        <div className="review-write-desname"><i className="fas fa-cut review-icon"></i>    미용사 이름 : {reviewInfo.desId} </div>
                        <div className="review-write-desname"><i className="fas fa-cut review-icon"></i>    반려동물 이름 :{resv.petName} </div>
                    </div>
                    <hr className="divide-line" />
                    <div className="review-write-star">
                    {/* 별점 */}
                    {[1, 2, 3, 4, 5].map((index) => (
                        <i
                            key={index}
                            className={index <= reviewInfo.star ? "fas fa-star" : "far fa-star"}
                        />
                    ))}
                    </div>

                    <div className="review-filebox">
                    <img src={ reviewInfo.afterImg !=='' ? `http://localhost:8090/reviewimg/${reviewInfo.num}` : "/img/logo/pet_defult_img.png" } accept="image/*" alt='펫 기본이미지'
                        className="input-box-style input-img-size" placeholder='사진을 올려주세요' />

                    {/* <label htmlFor="petImgFile">반려동물 사진 올리기</label>
                    <input type="file" id="petImgFile" name='file' accept="image/*" onChange={handleImageChange} /> */}
                    </div>

                    <div className="review-write-text">
                    <textarea
                        placeholder="리뷰를 작성해주세요"
                        className="text-area-size"
                        value={reviewInfo.content}
                        readOnly={true}
                        >
                        </textarea>
                    </div>


                    <div className="review-btns">
                    <button className="main-btn btn-text review-btn btn-gray" onClick={goBack}>취소</button>
                    <Link className="main-btn btn-text review-btn" to ={`/usermy/reviewmodi/${reviewInfo.num}`}>
                    리뷰 수정하기 
                    </Link> 
                   
                    </div>
                   

                </section>
            </main>
        }
    </>
    );
}

export default UserReviewDetail;