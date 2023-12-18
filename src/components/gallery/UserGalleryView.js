import React, { useEffect } from 'react';
import Footer from '../screens/Footer';
import Header from '../screens/Header';
import { useState } from 'react';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';



function UserGalleryView() {
    const navigate = useNavigate();
    const params = useParams();
    const [gallery, setGallery] = useState({});
    const [writer, setWriter] = useState({});
    const [comment, setComment] = useState([]);
    const [commentList, setCommentList] = useState([]);
    const [like, setLike] = useState();
    const user = useSelector((state) => state.user);
    const [isPost, setIsPost] = useState(false);
    const formData = new FormData();

    function goBack(e) {
        e.preventDefault();
        navigate(-1);
    }
    
    const postComment = () => {

        formData.append("userNum", user.num);
        formData.append("galNum", gallery.num);
        formData.append("content", comment);
        console.log(formData);
        axios.post('http://localhost:8090/usergallerycomment', formData)
            .then((res) => {
                console.log(res.data);
                setIsPost(!isPost);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    const deleteComment = (e) => {
        const commentNum = e.target.value;
        console.log(commentNum);
        axios.post(`http://localhost:8090/usergallerycommentdelete?commentNum=${commentNum}`)
            .then((res) => {
                console.log(res.data);
                setIsPost(!isPost);
            })
            .catch((err) => {
                console.log(err);
            })
    }


    const likeClick = () => {
        const fomrData = new FormData();
        fomrData.append("galNum", gallery.num);
        fomrData.append("userNum", user.num);

        axios.post('http://localhost:8090/usergallerylike', fomrData)
            .then((res) => {
                console.log(res.data);  
                setLike(res.data);
            }
            )
            .catch((err) => {
                console.log(err);
            })
    }




    const onChageComment = (e) => {
        setComment(e.target.value);
        console.log(comment);
    }



    useEffect(() => { 
        console.log(params);
        axios.get(`http://localhost:8090/usergallerydetail?galNum=${params.usergalnum}&userNum=${user.num}`)
            .then((res) => {
                console.log(res.data);
                setGallery(res.data.userGallery);
                setWriter(res.data.writer);
                setLike(res.data.isLike);
                setCommentList(res.data.comments);
                console.log(commentList);
                
            })
            .catch((err) => {
                console.log(err);
            })
    }, [like,isPost]); 






    return (
<div>   

                <section className="st-gallery-section">
                    <div className="st-gallery-view">
                        <div className="st-gallery-view-img">
                            <div className="view-gallery-profile-container magin-l-1">
                                <img src={`http://localhost:8090/usergalview/${params.usergalnum}`} alt="프로필 이미지" className="view-profile-img" />
                                <div className="view-img-nickname">{writer.nickname} </div>
                            </div>

                            <div className="view-img-container">
                                <img src={`http://localhost:8090/usergalview/${params.usergalnum}`} alt="스타일리스트 사진" className="view-img" />
                            </div>
                            <div className="view-img-icons magin-l-1">
                            <span onClick={likeClick} >{ like === true ? <i className="fa-solid fa-heart"></i> :<i className="fa-regular fa-heart"></i> } {gallery.likeCnt} </span>
                                <span><i className="fa-regular fa-comment"></i> {gallery.commentCnt} </span>



                                <div>
                                    {commentList.map((comments, index) => (
                                        <div key={index} className="view-comment">
                                        <span className="view-comment-nickname"> {comments.userNickname} </span>

                                        <span className="view-comment-text"> {comments.content} </span>

                                        <span className="view-comment-text"> ({comments.date}) </span>

                                        {comments.userId===user.id && <button value={comments.num}  onClick={deleteComment} >삭제</button> }
                                        </div>
                                    ))}
                                </div>
                                
                                
                                


                                
                                <div>
                                    <input type='text' onChange={onChageComment}/>
                                    <button onClick={postComment}>댓글 달기</button>
                                </div>
                                

                                <button className="view-comment-more">덧글 더보기</button>

                            </div>
                        </div>
                    </div>
                    <hr className="divide-line" />
                    {/* 이미지 게시판 요소 끝 */}

                    <div>
                        <button onClick={goBack} className="main-btn main-sm-btn btn-text">목록으로</button>
                    </div>
                </section>

                
        </div>
    );   
}

export default UserGalleryView;