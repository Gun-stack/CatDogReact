import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import SwalCustomAlert from '../../Alerts/SwalCustomAlert';
import Server500Err_Alert from '../../Alerts/Server500Err_Alert';
import { url } from '../../../config';


function PetModi() {
    const navigate = useNavigate();
    //가져온 펫넘버
    const params = useParams();
    // 펫정보 추가
    const petList = useSelector((state) => state.petList);
    const pet = petList.find((pet) => pet.num == params.num);

    const imgBoxRef = useRef();
    const user = useSelector((state) => state.user);

    const [files, setFiles] = useState([]);
    const [newPet, setNewPet] = useState({
        num: '',
        name: '',
        dogOrCat: pet.dogOrCat,
        age: '',
        weight: '',
        breed: '',
        gender: pet.gender,
        neuter: pet.neuter,
    });

    const change = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        console.log(`name: ${name}, value: ${value}`);
        setNewPet({ ...newPet, [name]: value });
    }

    const goBack = () => {
        navigate('/usermy/petreg');
    };

    const fileChange = (e) => {
        if (e.target.files.length > 0) {
            setFiles([e.target.files[0]]);
            console.log(files);
        }
        const imageSrc = URL.createObjectURL(e.target.files[0]);
        imgBoxRef.current.src = imageSrc;

    };
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


        // console.log(params.num);
        setNewPet({
            num: pet.num,
            name: pet.name,
            dogOrCat: pet.dogOrCat,
            age: pet.age,
            weight: pet.weight,
            breed: pet.breed,
            neuter: pet.neuter,
            gender: pet.gender,
        });

    }, []);


    const onSubmit = e => {
        e.preventDefault();

        if (newPet.num === '') {
            newPet.num = pet.num;
        }
        if (newPet.name === '') {
            newPet.name = pet.name;
        }
        if (newPet.dogOrCat === '') {
            newPet.dogOrCat = pet.dogOrCat;
        }
        if (newPet.age === '') {
            newPet.age = pet.age;
        }
        if (newPet.weight === '') {
            newPet.weight = pet.weight;
        }
        if (newPet.breed === '') {
            newPet.breed = pet.breed;
        }
        if (files.length === 0) {
            newPet.img = pet.img;
        }
        if (newPet.neuter === '') {
            newPet.neuter = pet.neuter;
        }
        if (newPet.gender === '') {
            newPet.gender = pet.gender;
        }

        SwalCustomAlert(
            'agree',
            '반려동물 정보 수정하시겠습니까?',
            '#F9950F',
            '수정하기',
            true,
            '취소',
        ).then((result) => {
            if (result.isConfirmed) {
                const formData = new FormData();
                //files[0]이 없으면 기존 이미지로 대체
                if (files.length === 0) {
                    formData.append('file', null);
                } else {
                    formData.append('file', files[0]);
                }
                formData.append("num", pet.num);
                formData.append("name", newPet.name);
                formData.append("dogOrCat", newPet.dogOrCat);
                formData.append("age", newPet.age);
                formData.append("weight", newPet.weight);
                formData.append("breed", newPet.breed);
                formData.append("gender", newPet.gender);
                formData.append("neuter", newPet.neuter);
                formData.append("userNum", user.num);
                console.log(formData);
                axios.post(`${url}/petmodi`, formData)
                    .then((res) => {
                        console.log(res);
                        SwalCustomAlert(
                            'success',
                            '수정 되었습니다',
                        ).then((result) => {
                            if (result.isConfirmed) {
                                window.location.href = '/catdog/usermy/petreg';
                            }
                        })
                    })
                    .catch((err) => {
                        console.log(err);
                        <Server500Err_Alert />
                    })
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

                            <img src={`${url}/petimg/${pet.num}`} accept="image/*" alt=''
                                className="input-box-style" placeholder='사진을 올려주세요' ref={imgBoxRef} />

                            <label htmlFor="petImgFile">반려동물 사진 수정하기</label>
                            <input type="file" id="petImgFile" accept="image/*" onChange={fileChange} />

                        </div>
                        <div className='input-for-label'>
                            <label htmlFor="name" className="label-text">반려동물 이름</label>
                            <input type="text" id="name" name="name" placeholder="반려동물 이름"
                                className="input-text" value={newPet.name} onChange={change} />
                        </div>


                        <div className="radio-container">
                            <label htmlFor="dogOrCat" className="radio-text">반려동물 종류</label>
                            <div className="radio-box">
                                <span> <input type="radio" id="dogOrCat" name="dogOrCat" value={true} onChange={change} defaultChecked={newPet.dogOrCat === true} />댕댕이</span>
                                <span> <input type="radio" id="dogOrCat" name="dogOrCat" value={false} onChange={change} defaultChecked={newPet.dogOrCat === false} />냥냥이</span>
                            </div>
                        </div>

                        <div className='input-for-label'>
                            <label htmlFor="age" className="label-text magin-t-05">반려동물 나이</label>
                            <input type="number" min="0" id="age" name="age" placeholder="나이"
                                className="input-text" value={newPet.age} onChange={change} />
                        </div>

                        <div className='input-for-label'>
                            <label htmlFor="weight" className="label-text magin-t-05">반려동물 몸무게</label>
                            <input type="number" min="0" id="weight" name="weight" placeholder="몸무게"
                                className="input-text" value={newPet.weight} onChange={change} />
                        </div>

                        <div className='input-for-label'>
                            <label htmlFor="breed" className="label-text magin-t-05">반려동물 품종</label>
                            <input type="text" id="breed" name="breed" placeholder="반려동물 품종"
                                className="input-text" value={newPet.breed} onChange={change} />
                        </div>

                        <div className="radio-container">
                            <label htmlFor="gender" className="radio-text">성별</label>
                            <div className="radio-box">
                                <span> <input type="radio" id="gender" name="gender" value={true} onChange={change} defaultChecked={newPet.gender === true} />남아</span>
                                <span> <input type="radio" id="gender" name="gender" value={false} onChange={change} defaultChecked={newPet.gender === false} />여아</span>
                            </div>

                        </div>


                        {/* 중성화여부 */}
                        <div className="radio-container">
                            <label htmlFor="neuter" className="radio-text">중성화 여부</label>
                            <div className="radio-box">
                                <span> <input type="radio" id="neuter" name="neuter" value={true} onChange={change} defaultChecked={newPet.neuter === true} />예</span>
                                <span> <input type="radio" id="neuter" name="neuter" value={false} onChange={change} defaultChecked={newPet.neuter === false} />아니요</span>
                            </div>
                        </div>

                    </div>

                    <div className="button-container">
                        <button id="submit-btn" type="submit" className="main-btn btn-text magin-t-1" onClick={onSubmit}>
                            동물 수정하기
                        </button>

                        <div className="main-btn  magin-t-1 btn-gray">
                            <div onClick={goBack} className="btn-text">취소</div>
                        </div>

                    </div>

                </div>
            </section>
        </main>
    );
}
export default PetModi;
