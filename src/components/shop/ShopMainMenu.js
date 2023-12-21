import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import SwalCustomAlert from '../Alerts/SwalCustomAlert';
import {url} from '../../config';

function ShopMainMenu() {


    const token = useSelector(state => state.token);
    const navigate = useNavigate();
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

    

    return (
        <div>
            <div className="table-container">
            <div className="table-title magin-t-1">소형견<span className='table-span'>말티즈, 요키, 시츄, 푸들(토이)</span></div>
                    <table className="shop-table">
                        <tr className="shop-tr">
                            <th className="shop-th">무게</th>
                            <th className="shop-th">전체 미용</th>
                            <th className="shop-th">스포팅</th>
                            <th className="shop-th">가위컷</th>
                            <th className="shop-th">부분 목욕</th>
                        </tr>
                        <tr className="shop-tr">
                            <td className="shop-td">4Kg 미만</td>
                            <td className="shop-td">35,000</td>
                            <td className="shop-td">60,000</td>
                            <td className="shop-td">70,000</td>
                            <td className="shop-td">25,000</td>
                        </tr>
                        <tr className="shop-tr">
                            <td className="shop-td">6Kg 미만</td>
                            <td className="shop-td">40,000</td>
                            <td className="shop-td">65,000</td>
                            <td className="shop-td">80,000</td>
                            <td className="shop-td">30,000</td>
                        </tr>
                        <tr className="shop-tr">
                            <td className="shop-td">8Kg 미만</td>
                            <td className="shop-td">45,000</td>
                            <td className="shop-td">70,000</td>
                            <td className="shop-td">90,000</td>
                            <td className="shop-td">35,000</td>
                        </tr>
                        <tr className="shop-tr">
                            <td className="shop-td">10Kg 미만</td>
                            <td className="shop-td">50,000</td>
                            <td className="shop-td">75,000</td>
                            <td className="shop-td">100,000</td>
                            <td className="shop-td">40,000</td>
                        </tr>
                    </table>

                    <div className="table-title">중형견<span className='table-span'>슈나, 스피츠, 닥스, 테리어</span></div>
                    <table className="shop-table">
                        <tr className="shop-tr">
                            <th className="shop-th">무게</th>
                            <th className="shop-th">전체 미용</th>
                            <th className="shop-th">스포팅</th>
                            <th className="shop-th">가위컷</th>
                            <th className="shop-th">부분 목욕</th>
                        </tr>
                        <tr className="shop-tr">
                            <td className="shop-td">4Kg 미만</td>
                            <td className="shop-td">35,000</td>
                            <td className="shop-td">60,000</td>
                            <td className="shop-td">70,000</td>
                            <td className="shop-td">25,000</td>
                        </tr>
                        <tr className="shop-tr">
                            <td className="shop-td">6Kg 미만</td>
                            <td className="shop-td">40,000</td>
                            <td className="shop-td">65,000</td>
                            <td className="shop-td">80,000</td>
                            <td className="shop-td">30,000</td>
                        </tr>
                        <tr className="shop-tr">
                            <td className="shop-td">8Kg 미만</td>
                            <td className="shop-td">45,000</td>
                            <td className="shop-td">70,000</td>
                            <td className="shop-td">90,000</td>
                            <td className="shop-td">35,000</td>
                        </tr>
                        <tr className="shop-tr">
                            <td className="shop-td">10Kg 미만</td>
                            <td className="shop-td">50,000</td>
                            <td className="shop-td">75,000</td>
                            <td className="shop-td">100,000</td>
                            <td className="shop-td">40,000</td>
                        </tr>
                    </table>

                    <div className="table-title">특수견<span className='table-span'>비숑, 꼬똥, 웰시코기</span></div>
                    <table className="shop-table">
                        <tr className="shop-tr">
                            <th className="shop-th">무게</th>
                            <th className="shop-th">전체 미용</th>
                            <th className="shop-th">스포팅</th>
                            <th className="shop-th">가위컷</th>
                            <th className="shop-th">부분 목욕</th>
                        </tr>
                        <tr className="shop-tr">
                            <td className="shop-td">4Kg 미만</td>
                            <td className="shop-td">35,000</td>
                            <td className="shop-td">60,000</td>
                            <td className="shop-td">70,000</td>
                            <td className="shop-td">25,000</td>
                        </tr>
                        <tr className="shop-tr">
                            <td className="shop-td">6Kg 미만</td>
                            <td className="shop-td">40,000</td>
                            <td className="shop-td">65,000</td>
                            <td className="shop-td">80,000</td>
                            <td className="shop-td">30,000</td>
                        </tr>
                        <tr className="shop-tr">
                            <td className="shop-td">8Kg 미만</td>
                            <td className="shop-td">45,000</td>
                            <td className="shop-td">70,000</td>
                            <td className="shop-td">90,000</td>
                            <td className="shop-td">35,000</td>
                        </tr>
                        <tr className="shop-tr">
                            <td className="shop-td">10Kg 미만</td>
                            <td className="shop-td">50,000</td>
                            <td className="shop-td">75,000</td>
                            <td className="shop-td">100,000</td>
                            <td className="shop-td">40,000</td>
                        </tr>
                    </table>




            </div>
        </div>
    );
}

export default ShopMainMenu;