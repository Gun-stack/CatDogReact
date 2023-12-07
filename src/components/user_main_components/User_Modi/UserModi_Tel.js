import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


function UserModi_Tel() {

    const [userTel, setUserTel] = useState('010-0000-0000'); // [1
    
    let navigate = useNavigate();
    function goBack(){
        navigate(-1);
    }

    onchange = (e) => {
        setUserTel(e.target.value);
    }

    return (
        <div>
            <section className="form-section">
                    <form className='react-modal-css magin-t-5'>
                        {/* 인풋 모여있는 컨테이너 */}

                        <div className="magin-t-1">
                            <input type="text" id="tel" name="tel" placeholder="전화 번호 입력" className="input-text" onChange={onchange} />
                        </div>

                        {/* submit 버튼 */}
                        <div className="button-container">
                            <button className="main-btn btn-text magin-t-1 btn-gray" onClick={goBack} >취소</button>
                            <button id="submit-btn" type="submit" className="main-btn btn-text magin-t-1">전화번호 수정 하기</button>
                        </div>
                    </form>
            </section>
        </div>
    );
}

export default UserModi_Tel;