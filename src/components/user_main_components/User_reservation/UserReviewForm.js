import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loding from "../../tools/Loding";
import axios from "axios";
import Swal from "sweetalert2";

function UserReviewForm() {
    let navigate = useNavigate();
    function goBack(e) {
        e.preventDefault();
        navigate(-1);
    }

    const [rating, setRating] = useState(0);

    const [image, setImage] = useState(null);
    const imgBoxRef = useRef();
    const [loading, setLoading] = useState(false);

    const [review, setReview] = useState({
        after_img: '',
        content: '',
        star: '',
    });

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setLoading(true);
        const formData = new FormData();
        formData.append('image', image); // 이미지 파일을 formData에 추가
        Object.keys(review).forEach(key => {
            formData.append(key, review[key]); // 텍스트 데이터를 formData에 추가
        });
        formData.append('star', rating); // 별점 추가
        try{
            const res = await axios.post('http://localhost:8080/user/reviewreg', { review })
            if (res.data === true) {
                Swal.fire({
                    icon: 'success',
                    html: "<p style='text-align:center;'>리뷰가 등록 되었습니다.<p>",
                    confirmButtonColor: '#F9950F',
                    confirmButtonText: '확인',
                });
                navigate(-1);
            }else{
                Swal.fire({
                    icon: 'error',
                    html: "<p style='text-align:center;'>리뷰 등록에 실패하였습니다.<p>",
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
                    <div className="review-write-title"><i className="fas fa-paw review-icon"></i>만족도 평가 및 리뷰</div>
                    <hr className="divide-line" />
                    <div className="review-name-container">
                        <div className="review-write-username"><i className="fas fa-dog review-icon"></i>보호자 닉네임</div>
                        <div className="review-write-desname"><i className="fas fa-cut review-icon"></i>미용사 이름 </div>
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