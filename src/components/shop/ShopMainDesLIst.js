import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router";
import SwalCustomAlert from "../Alerts/SwalCustomAlert";


function ShopMainDesLIst() {
    const dispatch = useDispatch();
    const shopInfo = useSelector((state) => state.shop);
    const desList = useSelector((state) => state.desList);
    const user = useSelector((state) => state.user);

    const navigate = useNavigate();

    const [editable, setEditable] = useState(false);
    const [editedPosition, setEditedPosition] = useState('');
    const [editableDesId, setEditableDesId] = useState(null);





    const handleEditClick = (desId) => {
        setEditableDesId(desId);
        // Optionally, initialize editedPosition with the current des.position or other default value
    };

    const handleDeleteClick = async (desId) => {

        const formData = new FormData();
        formData.append("num", desId);
        formData.append("sId", shopInfo.sid)
        await Swal.fire({
            html: '<img src="/img/logo/withdraw.png" alt="회원 탈퇴이미지" className="withdraw-img"/>',
            title: '<span class="sweet-modal-title">디자이너를 삭제하시겠습니까?</span>',
            showCancelButton: true,
            confirmButtonText: '삭제',
            confirmButtonColor: '#F9950F',
            cancelButtonText: '취소',
        })
            .then((result) => {
                if (result.isConfirmed) {
                    axios.post("http://localhost:8090/shopoutdes", formData)
                        .then(() => {
                            navigate(0);
                        })
                }

            })

        setEditableDesId("");

        // Optionally, initialize editedPosition with the current des.position or other default value
    };

    const handleSaveClick = (async (desId) => {
        console.log("editedPosition : " + editedPosition);
        console.log("desId : " + desId);
        if (editedPosition === "" || editedPosition === null) {
            SwalCustomAlert(
                'fail',
                '직책을 입력하세요!!',
            );
            setEditableDesId(null);
        } else {
            const formData = new FormData();
            formData.append("num", desId);
            formData.append("position", editedPosition);
            await axios.post("http://localhost:8090/updateposition", formData)
                .then(() => {
                    setEditableDesId(null);
                    setEditedPosition("");
                    navigate(0);
                });
        }


        // Implement logic to save the editedPosition for the specific stylist

    });

    const handleCancelClick = (desId) => {
        setEditableDesId(null);
        setEditedPosition("");
        // Optionally, reset editedPosition to the original value
    };

    useEffect(() => {
        console.log(shopInfo);
        axios.get(`http://localhost:8090/deslist?sId=${shopInfo.sid}`)
            .then((res) => {
                console.log(res.data);
                dispatch({ type: 'SET_DES_LIST', payload: res.data });

            })
            .catch((err) => {
                console.log(err);
            })}
        , []);




    const handleBtnClick = async (id) => {
        axios.get(`http://localhost:8090/selectdesbyid?desId=${id}`)
            .then(async (res) => {
                if(shopInfo.sid === res.data.sid && user.roles === "ROLE_SHOP"){
                    await Swal.fire({
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
                            if (result.isConfirmed) {
                                console.log("2번 모달!!");
                                const desId = result.value;
                                axios.get(`http://localhost:8090/selectdesbyid?desId=${desId}`)
                                    .then(async (res) => {
                                        await Swal.fire({
                                            title: res.data.name,
                                            text: res.data.desNickname,
                                            imageUrl: `http://localhost:8090/desimg/${res.data.num}`,
                                            imageWidth: 280,
                                            imageHeight: 200,
                                            showCancelButton: true,
                                            confirmButtonText: '등록',
                                            cancelButtonText: '취소',
                                            confirmButtonColor: '#F9950F',
                                        })
                                            .then((res2) => {
                                                if (res2.isConfirmed) {
                                                    console.log("모든 확인 후 데이터 저장");
                                                    // const formData = new FormData();
                                                    // console.log("res.data.num : " + res.data.num);
                                                    // formData.append("desnum", res.data.num);
                                                    // formData.append("sid", shopInfo.sid);
                                                    res.data.sid = shopInfo.sid;
                                                    console.log("sid" + shopInfo.sid);
                                                    axios.post('http://localhost:8090/shopdesreg', res.data)
                                                        .then(async (res) => {
                                                            await Swal.fire({
                                                                html: '<img src="/img/logo/modal_success_logo.png"/></span>',
                                                                title: '<span class="sweet-modal-title">스타일리스트 등록이 완료되었습니다</span>',
                                                                confirmButtonColor: '#F9950F',
                                                                confirmButtonText: '확인'
                                                            }).then(() => {
                                                                navigate(0);
                                                            })
                                                        })
                                                }
                                            })
            
            
            
                                    }).catch((err) => {
                                        Swal.fire({
                                            html: '<img src="/img/logo/modal_notice_logo.png"/></span>',
                                            title: '<span class="sweet-modal-title">등록되지 않은 디자이너 입니다.</span>',
                                            confirmButtonColor: '#F9950F',
                                            confirmButtonText: '확인',
                                        });
                                    })
                            }
                        }).catch((err) => {
                            Swal.fire('취소하였습니다.', '', 'info');
                        })
                } else{
                    return;
                }
            })
        
    }

    return (
        <div>
            <div action="" className="shop-form-container">
                <div className="input-img-click sm-input-img">
                    <p onClick={() => handleBtnClick(user.id)}>스타일리스트 등록하기 <i className="fas fa-plus-circle"></i></p>
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
                            <div className="st-profile-name">
                                {editableDesId === des.num ? (
                                    <input
                                        type="text"
                                        value={editedPosition}
                                        onChange={(e) => setEditedPosition(e.target.value)}
                                    />
                                ) : (
                                    `${des.position}`
                                )}
                            </div>
                            <div className="st-profile-name">{des.desNickname}</div>
                            <div className="st-profile-shop">{shopInfo.name}</div>
                            <div className="st-profile-info">{des.info}</div>
                        </div>
                    </div>
                    <div className="st-button-container">

                        {shopInfo.sid === des.sid && user.roles === "ROLE_SHOP" && (
                            <button className="st-button" onClick={() => handleDeleteClick(des.num)}>
                                삭제<i className="fas fa-pen btn-icon"></i>
                            </button>
                        )}

                        {editableDesId === des.num ? (
                            <>
                                <button className="st-button" onClick={() => handleSaveClick(des.num)}>
                                    저장<i className="fas fa-check btn-icon"></i>
                                </button>
                                <button className="st-button" onClick={handleCancelClick}>
                                    취소<i className="fas fa-times btn-icon"></i>
                                </button>

                            </>

                        ) : (

                            <button className="st-button" onClick={() => handleEditClick(des.num)}>
                                편집<i className="fas fa-pen btn-icon"></i>
                            </button>
                        )}
                        <Link to={`/shop/${shopInfo.num}/reservation/${des.num}`} ><button className="st-button">예약하기<i className="far fa-calendar-alt btn-icon"></i></button></Link>
                    </div>
                </div>
            ))}

            <hr className="divide-line" />


        </div>
    );

}
export default ShopMainDesLIst;