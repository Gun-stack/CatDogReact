import { useEffect, useRef, useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import Loding from "../../tools/Loding";
import axios from "axios";
import Swal from "sweetalert2";
import { useSelector,useDispatch } from "react-redux";
import { url } from "../../../config";



function UserReviewForm() {
    const params = useParams();
    const user = useSelector((state) => state.user);

    const date1 = new Date();
    const offset = date1.getTimezoneOffset() * 60000;       
    const koreaTime = new Date(date1.getTime() - offset + (9 * 60 * 60000)); // UTC+9
    const month = (koreaTime.getMonth() + 1).toString().padStart(2, '0');
    const day = koreaTime.getDate().toString().padStart(2, '0');
    const sqlDate = `${koreaTime.getFullYear()}-${month}-${day}`;
    

    const [desInfo ,setDes] = useState({ });
    const [shopInfo ,setShop] = useState({ });
    const [resvInfo ,setResv] = useState({ });
    const [petInfo ,setPet] = useState({ });





    const navigate = useNavigate();
    function goBack(e) {
        e.preventDefault();
        navigate(-1);
    }

    const [rating, setRating] = useState(0);
    const [image, setImage] = useState(null);
    const imgBoxRef = useRef();
    const [loading, setLoading] = useState(false);

    const [content,setContent] = useState('');  

    const onChangeCont = (e) => {
        setContent(e.target.value);
    }


    

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    useEffect(() => {
        axios.get(`${url}/reservedetail?num=${params.resnum}`)
            .then((res) => {
                setDes(res.data.des);
                setShop(res.data.shop);
                setResv(res.data.resv);
                setPet(res.data.pet)
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    },[]);
    



    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setLoading(true);
        const formData = new FormData();
        formData.append('file', image); // 이미지 파일을 formData에 추가
        formData.append('content', content); // 리뷰 내용 추가
        formData.append('star', rating); // 별점 추가
        formData.append('desId', desInfo.id); // 미용사 아이디 추가
        formData.append('userId', user.id); // 유저 아이디 추가
        formData.append('date', sqlDate); // 날짜 추가
        formData.append('resNum', resvInfo.num); // 예약번호 추가
        formData.append('desNickname', desInfo.desNickname); // 미용사 닉네임 추가
        formData.append('userNickname', user.nickname); // 유저 닉네임 추가
        formData.append('petName', petInfo.name); // 반려동물 이름 추가
        try{
            const res = await axios.post(`${url}/reviewreg`,formData)
            if (res.data == true) {
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
        }
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
                            onChange={onChangeCont} />
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