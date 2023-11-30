import React from 'react';
import Footer from '../../screens/Footer';
import Header from '../../screens/Header';
import { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Link } from 'react-router-dom';



function PetRegForm() {
    const[petregform, setPetregform] = useState({

        petImgFileLink: '',
        petName:'',
        dogOrCat: '',
        petAge: '',
        petWeight: '',
        petSpecies: '',
        petGender: '',
        doIntake: '',
    
    });
    onchange = e => {
        const {value, name} = e.target;
        setPetregform({
            ...petregform,
            [name]: value
        });
        console.log(petregform);
    };

    const onSubmit = e => {
       e.preventDefault();
        if(!petregform.petImgFileLink){
            Swal.fire({icon: 'error',title: 'Oops...',text: '사진을 등록해주세요!',})
            return;
        }
        if(!petregform.petName){
            Swal.fire({icon: 'error',title: 'Oops...',text: '이름을 입력해주세요!',})
            return;
        }
        if(!petregform.dogOrCat){
            Swal.fire({icon: 'error',title: 'Oops...',text: '종류를 선택해주세요!',})
            return;
        }
        if(!petregform.petAge){
            Swal.fire({icon: 'error',title: 'Oops...',text: '나이를 입력해주세요!',})
            return;
        }
        if(!petregform.petWeight){
            Swal.fire({icon: 'error',title: 'Oops...',text: '몸무게를 입력해주세요!',})
            return;
        }
        if(!petregform.petSpecies){
            Swal.fire({icon: 'error',title: 'Oops...',text: '품종을 입력해주세요!',})
            return;
        }
        if(!petregform.petGender){
            Swal.fire({icon: 'error',title: 'Oops...',text: '성별을 선택해주세요!',})
            return;
        }
        if(!petregform.doIntake){
            Swal.fire({icon: 'error',title: 'Oops...',text: '중성화 여부를 선택해주세요!',})
            return;
        }
        //반려동물을 등록하시겠습니까?
        Swal.fire({icon: 'question',title: '반려동물을 등록하시겠습니까?',showCancelButton: true,confirmButtonText: '등록',cancelButtonText: '취소',}).then((result) => {
            axios.post('http://localhost:8090/petregform',petregform)
            .then((res)=>{
                console.log(res);
                console.log(res.data);
            })
            if (result.isConfirmed) {
                Swal.fire('등록완료!', '', 'success')
                window.location.href = '/usermy';
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

                        <input type="petImgFile" id="petImgFileLink" accept="image/*"
                            className="input-box-style" placeholder='사진을 올려주세요'>
                        </input>
                        <label htmlFor="petImgFile">반려동물 사진 올리기</label>

                        <input type="file" id="petImgFile" accept="image/*" />
                    </div>
                    <hr className="gray-line" />

                    <input type="text" id="petName" name="petName" placeholder="반려동물 이름"
                        className="input-text boader-none"  />


                    <hr className="gray-line" />

                    <div className="radio-container">
                        <label htmlFor="dogOrCat" className="radio-text">반려동물 종류</label>
                        <div className="radio-box">
                            <span> <input type="radio" id="dogOrCat" name="dogOrCat" value='dog' 
                                    />댕댕이</span>
                            <span> <input type="radio" id="dogOrCat" name="dogOrCat" value='cat'/>냥냥이</span>
                        </div>
                    </div>

                    <hr className="gray-line" />

                    <input type="text" id="petAge" name="petName" placeholder="나이"
                        className="input-text boader-none" />
                    <hr className="gray-line" />

                    <input type="text" id="petWeight" name="petWeight" placeholder="몸무게 (kg)"
                        className="input-text boader-none" />
                    <hr className="gray-line" />


                    <input type="text" id="petSpecies" name="petSpecies" placeholder="반려동물 품종"
                        className="input-text boader-none" />
                    <hr className="gray-line" />

                    <div className="radio-container">
                        <label htmlFor="petGender" className="radio-text">성별</label>
                        <div className="radio-box">
                            <span> <input type="radio" id="petGender" name="petGender" value="male"
                                  />남아</span>
                            <span> <input type="radio" id="petGender" name="petGender"
                                value="female" />여아</span>
                        </div>
                    </div>
                    <hr className="gray-line" />

                    <div className="radio-container">
                        <label htmlFor="doIntake" className="radio-text">중성화 여부</label>
                        <div className="radio-box">
                            <span> <input type="radio" id="doIntake" name="doIntake" value="do"
                                 />예</span>
                            <span> <input type="radio" id="doIntake" name="doIntake" value="not" />아니요</span>
                        </div>
                    </div>
                    <hr className="gray-line" />
                </div>

                <div className="button-container">

                    <button id="submit-btn" type="submit" className="main-btn btn-text magin-t-1" onClick={onSubmit}>
                        동물 등록하기 
                    </button>
                    <div className="main-btn  magin-t-1 btn-gray"><Link to="/usermy"
                        className="btn-text">취소</Link> </div>
                </div>
            </div>
        </section>


    </main>
    );
}

export default PetRegForm;


