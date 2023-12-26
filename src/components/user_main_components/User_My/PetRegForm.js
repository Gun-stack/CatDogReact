import React from 'react';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import SwalCustomAlert from '../../Alerts/SwalCustomAlert';
import DatalistInput from 'react-datalist-input';
import { url } from '../../../config';
// import 'react-datalist-input/dist/styles.css';



function PetRegForm() {


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

    const navigate = useNavigate();
    const imgBoxRef = useRef();
    const user = useSelector((state) => state.user);
    const [files, setFiles] = useState([]);
    const [pet, setPet] = useState({
        name: '',
        dogOrCat: '',
        age: '',
        weight: '',
        breed: '',
        gender: '',
        neuter: '',
    });

    const change = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setPet({ ...pet, [name]: value });
        // console.log(value);
    }


    const fileChange = (e) => {
        if (e.target.files.length > 0) {
            setFiles([e.target.files[0]]);
            // console.log(files);
        }

        const imageSrc = URL.createObjectURL(e.target.files[0]);
        imgBoxRef.current.src = imageSrc;
    }

    const onSubmit = e => {
        e.preventDefault();

        if (!pet.name) {
            SwalCustomAlert(
                'notice',
                '반려동물 이름을 입력해주세요!',
            );
            return;
        } if (!pet.dogOrCat) {
            SwalCustomAlert(
                'notice',
                '반려동물 종류를 선택 해주세요!',
            )
            return;
        } if (!pet.age) {
            SwalCustomAlert(
                'notice',
                '나이를 입력해주세요!',
            )
            return;
        } if (!pet.weight) {
            SwalCustomAlert(
                'notice',
                '몸무게를 입력해주세요!',
            )
            return;
        } if (!pet.breed) {
            SwalCustomAlert(
                'notice',
                '품종을 입력해주세요!',
            )
            return;
        }


        //반려동물을 등록하시겠습니까?
        SwalCustomAlert(
            'agree',
            '반려동물을 등록하시겠습니까?',
        ).then((result) => {
            const formData = new FormData();
            for (let file of files) {
                formData.append("file", file);
                console.log(file);
            }
            console.log("user.num: " + user.num);
            formData.append("name", pet.name);
            formData.append("dogOrCat", pet.dogOrCat);
            formData.append("age", pet.age);
            formData.append("weight", pet.weight);
            formData.append("breed", pet.breed);
            formData.append("gender", pet.gender);
            formData.append("neuter", pet.neuter);
            formData.append("userNum", user.num);
            console.log(formData);
            axios.post(`${url}/petreg`, formData)
                .then((res) => {
                    console.log(res);
                    console.log(res.data);
                })
            if (result.isConfirmed) {
                SwalCustomAlert(
                    'success',
                    '반려동물을 등록 완료!',
                )
                {<Link to="/usermy/petreg" />}

            } else if (result.isDenied) {
                SwalCustomAlert(
                    'fail',
                    '취소 하셨습니다',
                )
            }
        })
    }

    return (
        <main className="cd-main">

            <section className="main-logo">
                <img src="/img/logo/logo_color.png" alt="댕냥꽁냥 로고" />
                <span className="main-logo-text">반려동물 등록하기</span>
            </section>

            <section className="form-section">
                <div className="form-container">
                    <div className="input-container">

                        <div className="filebox">
                            <img src="/img/logo/pet_defult_img.png" accept="image/*" alt='반려동물 기본이미지'
                                className="input-box-style input-d-img" placeholder='사진을 올려주세요' ref={imgBoxRef} />
                            <label htmlFor="petImgFile">사진 올리기</label>
                            <input type="file" id="petImgFile" name='file' accept="image/*" onChange={fileChange} />
                        </div>



                        {/* 반려동물 이름  */}
                        <div className='input-for-label'>
                            <label htmlFor="name" className="label-text">반려동물 이름</label>
                            <input type="text" id="name" name="name" placeholder="반려동물 이름을 입력해주세요"
                                className="input-text" onChange={change} />
                        </div>


                        {/* 개인지 고양이인지  */}
                        <div className="radio-container">
                            <label htmlFor="dogOrCat" className="radio-text">반려동물 종류</label>
                            <div className="radio-box">
                                <span className='radio-center'> <input type="radio" id="dogOrCat" name="dogOrCat" value={true}
                                    onChange={change} />댕댕이</span>
                                <span className='radio-center'> <input type="radio" id="dogOrCat" name="dogOrCat" value={false} onChange={change} />냥냥이</span>
                            </div>
                        </div>


                        {/* 반려동물 나이 Age */}
                        <div className='input-for-label'>
                            <label htmlFor="age" className="label-text magin-t-05">반려동물 나이</label>
                            <input type="number" id="age" name="age" placeholder="나이를 입력하세요(숫자 만 입력)"
                                className="input-text" min="0" onChange={change} />
                        </div>


                        {/* 반려동물 나이  weight*/}
                        <div className='input-for-label'>
                            <label htmlFor="weight" className="label-text magin-t-05">반려동물 몸무게</label>
                            <input type="number" id="weight" name="weight" placeholder="몸무게 (kg) 를 입력해주세요(숫자만 입력가능)"
                                className="input-text" min="0" onChange={change} />
                        </div>


                        {/* 반려동물 종류 Breed */}
                        <div className='input-for-label'>
                            <label htmlFor="breed" className="label-text magin-t-05">반려동물 품종</label>
                            <input type="text" id="breed" name="breed" placeholder="반려동물 품종 을 입력해주세요!"
                                className="input-text" onChange={change} />
                        </div>

                        {/* <div className='input-for-label'>
                            <label htmlFor="breed" className="label-text magin-t-05">반려동물 품종</label>

                            <DatalistInput
                                className='input-text'

                                placeholder="반려동물 품종"
                                onSelect={(item) => console.log(item.value)}
                                name="breed" id="breed" onChange={change}
                                items={[
                                    { id: '꼬똥 드 툴레아', value: '꼬똥 드 툴레아' },
                                    { id: '골든리트리버', value: '골든리트리버' },
                                    { id: '닥스훈트', value: '닥스훈트' },
                                    { id: '도베르만', value: '도베르만' },
                                    { id: '리트리버', value: '리트리버' },
                                    { id: '말티즈', value: '말티즈' },
                                    { id: '말티푸', value: '말티푸' },
                                    { id: '불독', value: '불독' },
                                    { id: '비숑 프리제', value: '비숑 프리제' },
                                    { id: '비글', value: '비글' },
                                    { id: '보스턴 테리어', value: '보스턴 테리어' },
                                    { id: '사모예드', value: '사모예드' },
                                    { id: '셰퍼드', value: '셰퍼드' },
                                    { id: '스코티시 테리어', value: '스코티시 테리어' },
                                    { id: '시베리안 허스키', value: '시베리안 허스키' },
                                    { id: '시츄', value: '시츄' },
                                    { id: '아키타', value: '아키타' },
                                    { id: '잭러셀테리어', value: '잭러셀테리어' },
                                    { id: '키스혼드', value: '키스혼드' },
                                    { id: '푸들', value: '푸들' },
                                    { id: '프렌치 불도그', value: '프렌치 불도그' },
                                    { id: '헤르더', value: '헤르더' },
                                    { id: '요크셔테리어', value: '요크셔테리어' },
                                ]} />
                        </div> */}

                        {/* 반려동물 종류 gender */}
                        <div className="radio-container">
                            <label htmlFor="gender" className="radio-text">성별</label>
                            <div className="radio-box">
                                <span className='radio-center'> <input type="radio" id="gender" name="gender" value={true}
                                    onChange={change} />남아</span>
                                <span className='radio-center'> <input type="radio" id="gender" name="gender"
                                    value={false} onChange={change} />여아</span>
                            </div>
                        </div>

                        {/* 반려동물 중성화 여부 neuter */}
                        <div className="radio-container">
                            <label htmlFor="neuter" className="radio-text">중성화 여부</label>
                            <div className="radio-box">
                                <span className='radio-center'> <input type="radio" id="neuter" name="neuter" value={true} onChange={change} />예</span>
                                <span className='radio-center'> <input type="radio" id="neuter" name="neuter" value={false} onChange={change} />아니요</span>
                            </div>
                        </div>

                    </div>


                    {/* 버튼 컨테이너  */}
                    <div className="button-container">
                        <button id="submit-btn" type="submit" className="main-btn btn-text magin-t-1" onClick={onSubmit}>
                            동물 등록하기
                        </button>
                        <div className="main-btn  magin-t-1 btn-gray"><Link to="/usermy"
                            className="btn-text">취소</Link>
                        </div>
                    </div>

                </div>
            </section>


        </main>
    );
}

export default PetRegForm;


