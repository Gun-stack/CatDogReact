import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Swal from "sweetalert2";
import axios from "axios";
import { useDispatch } from "react-redux";
import SwalCustomAlert from '../../Alerts/SwalCustomAlert';
import Loding from "../../tools/Loding";
import { url } from "../../../config";




function DesReg() {


    const token = useSelector(state => state.token);
    useEffect(() => {

        // console.log("로그인 후 토큰 값 : " + token);
        axios.get(`${url}/user`, {
            headers: {
                Authorization: token,
            }
        })
            .then(res => {
                console.log("Res : " + res.data);
            })
            .catch(err => {
                // console.log("Err : " + err);
                SwalCustomAlert(
                    'warning',
                    "로그인 이후 사용 가능합니다."
                );
                navigate('/userlogin');
            })
    }, [])

    const dispatch = useDispatch();
    const imgBoxRef = useRef();
    const [files, setFiles] = useState([]);
    const user = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    function goBack(e) {
        e.preventDefault();
        navigate(-1);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log("File info : " + files);

        try {
            if (!des.shopName) {
                await Swal.fire({
                    html: '<img src="/img/logo/modal_notice_logo.png"/>',
                    title: '<span class="sweet-modal-title">디자이너 이름을 입력해주세요!</span>',
                    confirmButtonColor: '#F9950F',
                    confirmButtonText: '확인',
                });
                return;
            }

            // 디자이너 등록을 하시겠습니까?
            const result = await Swal.fire({
                html: '<img src="/img/logo/modal_agree_logo.png"/>',
                title: '<span class="sweet-modal-title">디자이너 등록을 하시겠습니까?</span>',
                showCancelButton: true,
                confirmButtonText: '등록',
                confirmButtonColor: '#F9950F',
                cancelButtonText: '취소',
            });

            if (result.isConfirmed) {
                const formData = new FormData();
                setLoading(true);

                for (let file of files) {
                    formData.append("file", file);
                    console.log(file);
                }

                formData.append("desNickname", des.shopName);
                formData.append("position", des.shopNumber);
                formData.append("id", user.id);
                console.log("디자이너 이름 : " + des.shopName);
                console.log("직책 : " + des.shopNumber);

                const res = await axios.post(`${url}/desreg`, formData);
                console.log(res);
                console.log(res.data);
                dispatch({ type: 'SET_USER', payload: res.data.user });



                Swal.fire({
                    html: '<img src="/img/logo/modal_success_logo.png"/></span>',
                    title: '<span class="sweet-modal-title">등록이 완료되었습니다</span>',
                    confirmButtonColor: '#F9950F',
                    confirmButtonText: '확인',
                });
                navigate('/main');
            } else {
                Swal.fire({
                    //실패 했다면
                    html: '<img src="/img/logo/modal_fail_logo.png"/></span>',
                    title: '<span class="sweet-modal-title">등록에 실패했습니다</span>',
                    confirmButtonColor: '#F9950F',
                    confirmButtonText: '확인',
                });
            }
        } catch (error) {
            console.error("An error occurred:", error);
            Swal.fire({
                html: '<img src="/img/logo/modal_fail_logo.png"/></span>',
                title: '<span class="sweet-modal-title">서버통신에 실패했습니다</span>',
                confirmButtonColor: '#F9950F',
                confirmButtonText: '확인',
            });
        } finally {
            setLoading(false);
        }
    }






    const [des, setDes] = useState({
        shopName: '',
        shopNumber: ''
    });

    const change = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setDes({ ...des, [name]: value });
    }

    const fileChange = (e) => {
        if (e.target.files.length > 0) {
            setFiles([e.target.files[0]]);
            console.log(files);
        }

        const imageSrc = URL.createObjectURL(e.target.files[0]);
        imgBoxRef.current.src = imageSrc;
    }


    return (<>
        {loading ? <Loding /> :
            <div className="web-container">

                <div className="cd-container bg-white bg-dogs">

                    <main className="cd-main">

                        <section className="main-logo">
                            <img src="/img/logo/logo_color.png" alt="댕냥꽁냥 로고" />
                            <span className="main-logo-text">디자이너 등록하기</span>
                        </section>

                        {/* <!-- 폼 --> */}
                        <section className="form-section">
                            <form action="#" method="post" className="form-css">
                                <div className="form-container">
                                    <div className="input-container">

                                        {/* <!-- 프로필 사진 사진 올리기 --> */}
                                        <div className="filebox">
                                            <img src="/img/logo/shop_defult_img.png" accept="image/*" alt='프로필 사진'
                                                className="input-img" value="사진을 올려주세요" ref={imgBoxRef} />
                                            <label htmlFor="shopImgFile">프로필 사진 올리기</label>
                                            <input type="file" id="shopImgFile" accept="image/*" onChange={fileChange} />
                                        </div>

                                        {/* <!-- 디자이너 닉네임 : des_nickname --> */}
                                        <div className='input-for-label'>
                                            <label htmlFor="shopName" className="label-text">디자이너 이름</label>
                                            <input type="text" id="shopName" name="shopName" placeholder="디자이너 이름" className="input-text"
                                                onChange={change} />
                                        </div>

                                        {/* <!-- 디자이너 직책 : position --> */}
                                        <div className='input-for-label'>
                                            <label htmlFor="shopNumber" className="label-text">디자이너 직책</label>
                                            <input type="text" id="shopNumber" name="shopNumber" placeholder="디자이너 직책" className="input-text"
                                                onChange={change} />
                                        </div>



                                    </div>

                                    {/* <!-- submit 버튼 --> */}
                                    <div className="button-container">
                                        <button id="submit-btn" type="submit" className="main-btn btn-text magin-t-1" onClick={onSubmit}>등록하기</button>
                                        <div className="main-btn magin-t-1 btn-gray btn-text" onClick={goBack}>취소</div>
                                    </div>

                                </div>
                            </form>
                        </section>

                    </main>

                </div>
            </div>
        }
    </>);
}

export default DesReg;