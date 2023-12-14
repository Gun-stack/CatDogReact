import React from 'react';
import { useState, useRef } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';



function PetRegForm() {
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
        console.log(value);
    }


    const fileChange = (e) => {
        if (e.target.files.length > 0) {
            setFiles([e.target.files[0]]);
            console.log(files);
        }

        const imageSrc = URL.createObjectURL(e.target.files[0]);
        imgBoxRef.current.src = imageSrc;
    }


    const onSubmit = e => {
        e.preventDefault();

        if (!pet.name) {
            Swal.fire({ icon: 'error', title: 'Oops...', text: '이름을 입력해주세요!', })
            return;
        } if (!pet.dogOrCat) {
            Swal.fire({ icon: 'error', title: 'Oops...', text: '반려동물 종류를 선택해주세요!', })
            return;
        } if (!pet.age) {
            Swal.fire({ icon: 'error', title: 'Oops...', text: '나이를 입력해주세요!', })
            return;
        } if (!pet.weight) {
            Swal.fire({ icon: 'error', title: 'Oops...', text: '몸무게를 입력해주세요!', })
            return;
        } if (!pet.breed) {
            Swal.fire({ icon: 'error', title: 'Oops...', text: '품종을 입력해주세요!', })
            return;
        }


        //반려동물을 등록하시겠습니까?
        Swal.fire({ icon: 'question', title: '반려동물을 등록하시겠습니까?', showCancelButton: true, confirmButtonText: '등록', cancelButtonText: '취소', }).then((result) => {
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
            axios.post('http://localhost:8090/petreg', formData)
                .then((res) => {
                    console.log(res);
                    console.log(res.data);
                })
            if (result.isConfirmed) {
                Swal.fire('등록완료!', '', 'success')
                navigate('/usermy');
            } else if (result.isDenied) {
                Swal.fire('취소하였습니다.', '', 'info')
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

                        <hr className="gray-line" />

                        {/* 반려동물 이름  */}
                        <input type="text" id="name" name="name" placeholder="반려동물 이름"
                            className="input-text boader-none" onChange={change} />

                        <hr className="gray-line" />

                        {/* 개인지 고양이인지  */}
                        <div className="radio-container">
                            <label htmlFor="dogOrCat" className="radio-text">반려동물 종류</label>
                            <div className="radio-box">
                                <span> <input type="radio" id="dogOrCat" name="dogOrCat" value={true}
                                    onChange={change} />댕댕이</span>
                                <span> <input type="radio" id="dogOrCat" name="dogOrCat" value={false} onChange={change} />냥냥이</span>
                            </div>
                        </div>

                        <hr className="gray-line" />

                        {/* 반려동물 나이 Age */}
                        <input type="number" id="age" name="age" placeholder="나이"
                            className="input-text boader-none" onChange={change} />
                        <hr className="gray-line" />

                        {/* 반려동물 나이  weight*/}
                        <input type="number" id="weight" name="weight" placeholder="몸무게 (kg)"
                            className="input-text boader-none" onChange={change} />
                        <hr className="gray-line" />

                        {/* 반려동물 종류 Breed */}
                        <input type="text" id="breed" name="breed" placeholder="반려동물 품종"
                            className="input-text boader-none" onChange={change} />
                        <hr className="gray-line" />

                        {/* 반려동물 종류 gender */}
                        <div className="radio-container">
                            <label htmlFor="gender" className="radio-text">성별</label>
                            <div className="radio-box">
                                <span> <input type="radio" id="gender" name="gender" value={true}
                                    onChange={change} />남아</span>
                                <span> <input type="radio" id="gender" name="gender"
                                    value={false} onChange={change} />여아</span>
                            </div>
                        </div>
                        <hr className="gray-line" />

                        {/* 반려동물 중성화 여부 neuter */}
                        <div className="radio-container">
                            <label htmlFor="neuter" className="radio-text">중성화 여부</label>
                            <div className="radio-box">
                                <span> <input type="radio" id="neuter" name="neuter" value={true} onChange={change} />예</span>
                                <span> <input type="radio" id="neuter" name="neuter" value={false} onChange={change} />아니요</span>
                            </div>
                        </div>
                        <hr className="gray-line" />
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


