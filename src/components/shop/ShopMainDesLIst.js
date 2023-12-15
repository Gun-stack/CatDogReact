import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router";



function ShopMainDesLIst() {
    const dispatch = useDispatch();
    const shopInfo = useSelector((state) => state.shop);
    const desList = useSelector((state) => state.desList);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(shopInfo);
        axios.get(`http://localhost:8090/deslist?sId=${shopInfo.sid}`)
            .then((res) => {
                console.log(res.data);
                dispatch({ type: 'SET_DES_LIST', payload: res.data });

            }
            )
            .catch((err) => {
                console.log(err);
            })
    }
        , []);


        

    const handleBtnClick = async (e) => {
        e.preventDefault();
        let result;
        result = await Swal.fire({
            title: '디자이너 등록',
            html: '<div class="swal2-input-container">' +
                '  <input id="swal-input1" class="swal2-input" placeholder="ID를 입력하세요.">' +
                '</div>',
            showCancelButton: true,
            confirmButtonText: '조회',
            cancelButtonText: '취소',
            confirmButtonColor: '#F9950F',
            focusConfirm: false,
            preConfirm: () => {
                const desId = document.getElementById('swal-input1').value;
                return desId;
            }
            
        })
            .then((result) => {
                const desId = result.value;

                if (result.isConfirmed === true) {
                    console.log("result.isConfirmed : " + result.isConfirmed);
                    axios.get(`http://localhost:8090/desinfobyid?desId=${desId}`)
                        .then((res) => {
                            Swal.fire({
                                title: res.data.name,
                                text: res.data.desNickname,
                                imageUrl: `http://localhost:8090/desimg/${res.data.num}`,
                                imageWidth: 280,
                                imageHeight: 200,
                                showCancelButton: true,
                                confirmButtonText: '등록',
                                cancelButtonText: '취소',
                                confirmButtonColor: '#F9950F',
                            });
                            if (result.isConfirmed) {
                                // const formData = new FormData();
                                // console.log("res.data.num : " + res.data.num);
                                // formData.append("desnum", res.data.num);
                                // formData.append("sid", shopInfo.sid);
                                res.data.sid = shopInfo.sid;
                                console.log("sid" + shopInfo.sid);
                                axios.post('http://localhost:8090/shopdesreg', res.data)
                                    .then((res) => {
                                        Swal.fire({
                                            html: '<img src="/img/logo/modal_success_logo.png"/></span>',
                                            title: '<span class="sweet-modal-title">스타일리스트 등록이 완료되었습니다</span>',
                                            confirmButtonColor: '#F9950F',
                                            confirmButtonText: '확인'
                                        });
                                        navigate(0);
                                    })
                            } else {
                                console.log("false 고정?");
                            }

                        })
                }
            }).catch((err) => {
                Swal.fire('취소하였습니다.', '', 'info');
            })
    }

    return (
        <div>
            <div action="" className="shop-form-container">
                <div className="input-img-click sm-input-img">
                    <p onClick={handleBtnClick}>스타일리스트 등록하기 <i className="fas fa-plus-circle"></i></p>

                </div>
            </div>

            <hr className="divide-line" />

            {desList.map((des) => (

                <div className="stylelist-content" key={des.num} >
                    <div className="st-profile-container">
                        <div className="st-profile-img">
                            <img src={`http://localhost:8090/desimg/${des.num}`} alt="프로필 이미지" className="st-profile-img" />
                        </div>

                        <div className="st-profile-context">
                            <div className="st-profile-name">{des.position}  {des.desNickname}</div>
                            <div className="st-profile-shop">{shopInfo.name}</div>
                            <div className="st-profile-info">{des.info}</div>
                        </div>
                    </div>

                    <div className="st-button-container">
                        <a href="#"><button className="st-button">편집<i className="fas fa-pen btn-icon"></i></button></a>
                        <Link to={`/shop/${shopInfo.num}/reservation/${des.num}`} ><button className="st-button">예약하기<i className="far fa-calendar-alt btn-icon"></i></button></Link>
                    </div>
                </div>
            ))}

            <hr className="divide-line" />


        </div>
    );

}
export default ShopMainDesLIst;
