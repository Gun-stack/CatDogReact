import { useEffect, useRef, useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import Loding from "../../tools/Loding";
import axios from "axios";
import Swal from "sweetalert2";
import { useSelector,useDispatch } from "react-redux";
import { url } from "../../../config";



function UserReviewModi() {
    const dispatch = useDispatch(); 
    const params = useParams();
    const oldReview = useSelector((state) => state.review) ;

    

    const date1 = new Date();
    const offset = date1.getTimezoneOffset() * 60000;       
    const koreaTime = new Date(date1.getTime() - offset + (9 * 60 * 60000)); // UTC+9
    const month = (koreaTime.getMonth() + 1).toString().padStart(2, '0');
    const day = koreaTime.getDate().toString().padStart(2, '0');
    const sqlDate = `${koreaTime.getFullYear()}-${month}-${day}`;

    const navigate = useNavigate();
    function goBack(e) {
        e.preventDefault();
        navigate(-1);
    }
    const [rating, setRating] = useState(oldReview.star);
    const [image, setImage] = useState(`${url}/reviewimg/${oldReview.afterImg}`);
    const imgBoxRef = useRef();
    const [loading, setLoading] = useState(false);

    const changeReview = (e) => {
        setReview({
            ...review,
            [e.target.name]: e.target.value,
        });
        console.log(review);
    };

    const [review, setReview] = useState({
        after_img: oldReview.afterImg,
        content: '',
        star: '',
        desId: oldReview.desId,
        desNickname: oldReview.desNickname,
        userNickname: oldReview.nickname,
        userId: oldReview.userId,
        date : sqlDate,
        resNum: oldReview.resNum
    });

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    useEffect(() => {
        setReview({
        num : oldReview.num,
        after_img: oldReview.afterImg,
        content: oldReview.content,
        star: oldReview.star,
        desId: oldReview.desId,
        userId: oldReview.userId,
        desNickname: oldReview.desNickname,
        userNickname: oldReview.nickname,
        date : sqlDate,
        resNum: oldReview.resNum
        });
    },[]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setLoading(true);
        const formData = new FormData();
        formData.append('afterImg', oldReview.afterImg); // 기존 이미지 추가(수정시에는 기존 이미지를 그대로 사용')
        formData.append('num', oldReview.num); // 리뷰번호 추가
        formData.append('file', image); // 이미지 파일을 formData에 추가
        formData.append('content',review.content); // 리뷰 내용 추가
        formData.append('star', rating); // 별점 추가
        formData.append('desId', oldReview.desId); // 미용사 아이디 추가
        formData.append('desNickname', oldReview.desNickname); // 미용사 닉네임 추가
        formData.append('userNickname', oldReview.userNickname); // 유저 닉네임 추가
        formData.append('userId', oldReview.userId); // 유저 아이디 추가
        formData.append('date', sqlDate); // 날짜 추가
        formData.append('resNum', oldReview.resNum); // 예약번호 추가
        formData.append('petName', oldReview.petName); // 반려동물 이름 추가
        try{
            const res = await axios.post(`${url}/reviewmodi`,formData)
            if (res.data === true) {
                Swal.fire({
                    icon: 'success',
                    html: "<p style='text-align:center;'>리뷰가 수정 되었습니다.<p>",
                    confirmButtonColor: '#F9950F',
                    confirmButtonText: '확인',
                });
                navigate(-1);
            }else{
                Swal.fire({
                    icon: 'error',
                    html: "<p style='text-align:center;'>리뷰 수정에 실패하였습니다.<p>",
                    confirmButtonColor: '#F9950F',
                    confirmButtonText: '확인',
                });
            }
        }catch(error){
            console.error('서버 통신에 실패하였습니다', error);
            Swal.fire({
                icon: 'error',
                html: "<p style='text-align:center;'>서버 통신에 실패하였습니다<p>",
                confirmButtonColor: '#F9950F',
                confirmButtonText: '확인',
            });
        }finally{
        setLoading(false);
        console.log(setReview());
        }
    }

    return (<>
        {loading ? <Loding /> :
            <main className="cd-main dis-center">
                <section className="review-write-form">
                    <div className="review-write-title"><i className="fas fa-paw review-icon"></i>만족도 평가 및 리뷰 수정하기 </div>
                    <hr className="divide-line" />
                    <div className="review-name-container">
                        <div className="review-write-username"><i className="fas fa-dog review-icon"></i>보호자 닉네임 : {oldReview.userNickname}</div>
                        <div className="review-write-desname"><i className="fas fa-cut review-icon"></i>미용사 이름 : {oldReview.desNickname} </div>
                        <div className="review-write-desname"><i className="fas fa-cut review-icon"></i> 강쥐 : {oldReview.petName} </div>
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
                        <img src={image ? image : "/img/logo/pet_defult_img.png"} accept="image/*" alt='펫 기본이미지'
                            className="input-box-style input-img-size" placeholder='사진을 올려주세요'  ref={imgBoxRef}/>

                        <label htmlFor="petImgFile">반려동물 사진 수정하기</label>
                        <input type="file" id="petImgFile" name='file' accept="image/*" onChange={handleImageChange} />
                    </div>

                    <div className="review-write-text">
                        <textarea
                            placeholder="리뷰를 작성해주세요"
                            className="text-area-size"
                            name="content"
                            onChange={changeReview} />
                    </div>
                    

                    <div className="review-btns">
                        <button className="main-btn btn-text review-btn btn-gray" onClick={goBack}>취소</button>
                        <button className="main-btn btn-text review-btn" onClick={handleSubmit}>리뷰수정</button>
                    </div>

                </section>
            </main>
        }

    </>);
}

export default UserReviewModi;