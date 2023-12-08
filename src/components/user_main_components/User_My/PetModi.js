import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector ,useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from 'react';


function PetModi() {
    const params = useParams();
    const petList = useSelector((state) => state.pet);
    const pet = petList.find((pet) => pet.num == params.num);
    const imgBoxRef = useRef();
    const [files, setFiles] = useState([]);


    const fileChange = (e) => {
        if(e.target.files.length>0) {
            setFiles([e.target.files[0]]);
            console.log(files);
        }
    }




    return (
        <div>
            <div id="modalAlert" className="modal-alert hidden">
                <div className="modal-body">
                    <div className="modal-text">
                        <h2>반려동물</h2>
                        <p>수정 하시겠습니까?</p>
                    </div>
                    <div className="modal-btns">
                        <button id="cancleBtn" className="small-btn btn-gray btn-text">취소</button>
                        <button className="small-btn"><a href="cl-petreg.html" className="btn-text">등록하기</a></button>
                    </div>
                </div>
            </div>

            <main className="cd-main">
                <section className="main-logo">
                    <img src="/img/logo/logo_color.png" alt="댕냥꽁냥 로고" />
                    <span className="main-logo-text">반려동물 등록하기</span>
                </section>

                <section className="form-section">
                        <div className="form-container">
                            <div className="input-container">

                                <div className="filebox">

                                <img src="/img/gallrey-img/1.jpg" width="100px" height="100px"  accept="image/*" alt=''
                        className="input-box-style" placeholder='사진을 올려주세요' ref={imgBoxRef}/>

                                    <label htmlFor="petImgFile">반려동물 사진 올리기</label>
                                    <input type="file" id="petImgFile" accept="image/*" onChange={fileChange}/>

                                </div>


                                <hr className="gray-line" />

                                <input type="text" id="petName" name="petName" placeholder="반려동물 이름"
                                    className="input-text boader-none" value="{등록했던 동물이름}" />
                                <hr className="gray-line" />

                                <div className="radio-container">
                                    <label htmlFor="dogOrCat" className="radio-text">반려동물 종류</label>
                                    <div className="radio-box">
                                        <span> <input type="radio" id="dogOrCat" name="dogOrCat" value="dog"
                                                checked />댕댕이</span>
                                        <span> <input type="radio" id="dogOrCat" name="dogOrCat" value="cat" />냥냥이</span>
                                    </div>
                                </div>
                                <hr className="gray-line" />

                                <input type="text" id="petAge" name="petName" placeholder="나이"
                                    className="input-text boader-none" value="{등록했던 동물나이}" />
                                <hr className="gray-line" />

                                <input type="text" id="petWeight" name="petWeight" placeholder="몸무게"
                                    className="input-text boader-none" value="{등록했던 동물 몸무게}" />
                                <hr className="gray-line" />

                                <input type="text" id="petSpecies" name="petSpecies" placeholder="반려동물 품종"
                                    className="input-text boader-none" value="{등록했던 동물 품종}" />
                                <hr className="gray-line" />

                                <div className="radio-container">
                                    <label htmlFor="petGender" className="radio-text">성별</label>
                                    <div className="radio-box">
                                        <span> <input type="radio" id="petGender" name="petGender" value="male"
                                                checked />남아</span>
                                        <span> <input type="radio" id="petGender" name="petGender"
                                                value="female" />여아</span>
                                    </div>
                                </div>
                                <hr className="gray-line" />

                                {/* 중성화여부 */}
                                <div className="radio-container">
                                    <label htmlFor="doIntake" className="radio-text">중성화 여부</label>
                                    <div className="radio-box">
                                        <span> <input type="radio" id="doIntake" name="doIntake" value="do"
                                                checked />예</span>
                                        <span> <input type="radio" id="doIntake" name="doIntake" value="not" />아니요</span>
                                    </div>
                                </div>
                                <hr className="gray-line" />

                            </div>

                            <div className="button-container">

                                <button id="submit-btn" type="submit" className="main-btn btn-text magin-t-1">
                                    동물 수정하기
                                </button>

                                <div className="main-btn  magin-t-1 btn-gray">
                                    <a href="cl-petreg.html" className="btn-text">취소</a> 
                                </div>

                            </div>

                        </div>
                </section>
            </main>
        </div>
    );
}
export default PetModi;
